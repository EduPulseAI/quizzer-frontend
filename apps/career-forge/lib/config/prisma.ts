import { PrismaPg } from '@prisma/adapter-pg';
import { withAccelerate } from "@prisma/extension-accelerate";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { DATABASE_URL } from './env';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaPg({ connectionString: DATABASE_URL })
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter }).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma