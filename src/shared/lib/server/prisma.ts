import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from '@/src/generated/prisma/client'

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  const pool = new Pool({ connectionString })

  const adapter = new PrismaPg(pool)

  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as typeof globalThis & {
  planqoraPrisma?: PrismaClient
}

export const prisma = globalForPrisma.planqoraPrisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.planqoraPrisma = prisma
}
