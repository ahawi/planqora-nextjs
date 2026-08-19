export interface Conversation {
  avatar: string
  id: string
  name: string
  online: boolean
  preview: string
  time: string
  unread: boolean
}

export interface ChatMessage {
  attachment?: {
    caption: string
    image: string
  }
  direction: 'incoming' | 'outgoing'
  id: string
  text?: string
  time: string
}
