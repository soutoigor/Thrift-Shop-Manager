import {
  parseISO,
  lightFormat,
  compareAsc,
  formatISO,
  startOfMonth,
} from 'date-fns'

export default {
  methods: {
    formatISOToPTBR(date) {
      return lightFormat(parseISO(date), 'dd/MM/yyyy')
    },
    sortDates(dates) {
      return dates
        .map((date) => parseISO(date))
        .sort(compareAsc)
    },
    dateNowISO() {
      return formatISO(new Date())
    },
    dateRange(dates) {
      return dates
        .map((date) => this.formatISOToPTBR(date))
        .join(' ~ ')
    },
    startOfMonth() {
      return formatISO(startOfMonth(new Date()))
    },
  },
}
