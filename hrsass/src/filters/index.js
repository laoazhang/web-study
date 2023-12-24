import dayjs from 'dayjs'

export function getFormateTime(val) {
  return dayjs(val).format('YYYY-MM-DD')
}
