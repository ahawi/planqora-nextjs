import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planqora — рабочее пространство',
  description: 'Planqora — управление проектами, пространствами и задачами',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
