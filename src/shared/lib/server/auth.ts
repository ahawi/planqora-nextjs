import { prismaAdapter } from '@better-auth/prisma-adapter'
import { betterAuth } from 'better-auth/minimal'

import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
})
