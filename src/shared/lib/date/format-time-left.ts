const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24

const getDayWord = (days: number): string => {
  const lastTwoDigits = days % 100
  const lastDigit = days % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'дней'
  }

  if (lastDigit === 1) {
    return 'день'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня'
  }

  return 'дней'
}

export const formatTimeLeft = (
  deadline: string,
  currentDate = new Date(),
): string => {
  const deadlineDate = new Date(`${deadline}T00:00:00Z`)

  const currentDayTimestamp = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
  )

  const differenceInMilliseconds = deadlineDate.getTime() - currentDayTimestamp

  const differenceInDays = Math.round(
    differenceInMilliseconds / MILLISECONDS_IN_DAY,
  )

  if (differenceInDays < 0) {
    return 'Просрочено'
  }

  if (differenceInDays === 0) {
    return 'Сегодня'
  }

  const dayWord = getDayWord(differenceInDays)
  const verb = dayWord === 'день' ? 'Остался' : 'Осталось'

  return `${verb} ${differenceInDays} ${dayWord}`
}
