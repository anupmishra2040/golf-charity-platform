import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  charityId: z.string().uuid().optional(),
  charityPercentage: z.number().min(10).max(100).default(10),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const scoreSchema = z.object({
  userId: z.string().uuid(),
  score: z.number().int().min(1).max(45),
  playedOn: z.string(),
});

export const uploadProofSchema = z.object({
  winnerId: z.string().uuid(),
  proofUrl: z.string().url(),
});
