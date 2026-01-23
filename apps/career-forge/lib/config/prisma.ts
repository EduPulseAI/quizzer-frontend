import { PrismaClient } from "../../prisma/generated/prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { withAccelerate } from "@prisma/extension-accelerate"
import { DATABASE_URL } from './index';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaPg({ connectionString: DATABASE_URL })
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter }).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma