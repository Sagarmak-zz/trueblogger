import { format, formatDistanceToNow, parseISO } from "date-fns";

export default {
  convertToDate (date, specifiedFormat = "do MMM yyyy") {
    if (!date) {
      return;
    }

    return format(date, specifiedFormat);
  },
  formatDistance(date) {
    if (!date) {
      return;
    }

    let isoDate = parseISO(date);
    return formatDistanceToNow(isoDate, { addSuffix: true, includeSeconds: true });
  }
};
