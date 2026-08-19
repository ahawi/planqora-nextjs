const pluralRules = new Intl.PluralRules('ru-RU')

export const formatTaskCount = (count: number): string => {
  const form = pluralRules.select(count)

  if (form === 'one') {
    return `${count} задача`
  }

  if (form === 'few') {
    return `${count} задачи`
  }

  return `${count} задач`
}
