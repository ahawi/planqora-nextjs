export interface WeekDay {
  date: Date
  dateKey: string
  label: string
  dayNumber: number
}

const WEEK_DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const getLocalDateKey = (date: Date): string => {
  const currentDay = new Date(date)

  const year = currentDay.getFullYear()
  const month = String(currentDay.getMonth() + 1).padStart(2, '0')
  const day = String(currentDay.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getWeekDays = (currentDate: Date): WeekDay[] => {
  const monday = new Date(currentDate)

  monday.setHours(0, 0, 0, 0)

  const dayOfWeek = monday.getDay()

  const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  monday.setDate(monday.getDate() + offsetToMonday)

  const dates = Array.from({ length: 7 }, (_, index) => {
    const currentDay = new Date(monday)

    currentDay.setDate(monday.getDate() + index)

    return {
      date: currentDay,
      dateKey: getLocalDateKey(currentDay),
      label: WEEK_DAY_LABELS[index],
      dayNumber: currentDay.getDate(),
    }
  })

  return dates
}
