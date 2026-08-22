import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/src/shared/lib/server/auth'

export const { GET, POST } = toNextJsHandler(auth)
