import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { Messenger } from '@/src/widgets/messenger'

export const dynamic = 'force-dynamic'

const MessagesPage = async () => {
  await delay(ROUTE_SKELETON_DELAY)

  return <Messenger />
}

export default MessagesPage
