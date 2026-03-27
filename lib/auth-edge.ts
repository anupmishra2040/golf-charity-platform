import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyEdgeToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as {
    userId: string;
    role: string;
    email: string;
  };
}