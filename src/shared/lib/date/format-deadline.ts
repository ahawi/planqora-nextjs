const deadlineFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

export const formatDeadline = (deadline: string): string => {
  const date = new Date(`${deadline}T00:00:00Z`)

  return deadlineFormatter.format(date)
}
