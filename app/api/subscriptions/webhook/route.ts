import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing webhook config" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string | null;
      const customerId = session.customer as string | null;

      if (userId && subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);

        const price = sub.items.data[0]?.price;
        const interval = price?.recurring?.interval;
        const planName = interval === "year" ? "Yearly Plan" : "Monthly Plan";

        const { data: plan } = await db
          .from("subscription_plans")
          .select("id")
          .eq("name", planName)
          .maybeSingle();

        const currentPeriodEnd = (sub as any).current_period_end;

        if (plan?.id) {
          await db.from("subscriptions").insert({
            user_id: userId,
            plan_id: plan.id,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: sub.status,
            started_at: new Date(sub.start_date * 1000).toISOString(),
            renewal_date: currentPeriodEnd
              ? new Date(currentPeriodEnd * 1000).toISOString()
              : null,
          });
        }
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;

      const currentPeriodEnd = (sub as any).current_period_end;
      const cancelAt = (sub as any).cancel_at || (sub as any).canceled_at;

      await db
        .from("subscriptions")
        .update({
          status: sub.status,
          renewal_date: currentPeriodEnd
            ? new Date(currentPeriodEnd * 1000).toISOString()
            : null,
          cancelled_at: cancelAt
            ? new Date(cancelAt * 1000).toISOString()
            : null,
        })
        .eq("stripe_subscription_id", sub.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handling failed:", error);
    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}