import {
  parseISO,
  lightFormat,
  compareAsc,
  formatISO,
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
  },
}
