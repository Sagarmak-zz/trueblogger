import { format, formatDistanceToNow, parseISO } from "date-fns";

export default {
  formatISODate (date, specifiedFormat = "do MMM yyyy") {
    if (!date) {
      return;
    }
    let isoDate = parseISO(date);
    return format(isoDate, specifiedFormat);
  },
  formatDistance(date) {
    if (!date) {
      return;
    }

    let isoDate = parseISO(date);
    return formatDistanceToNow(isoDate, { addSuffix: true, includeSeconds: true });
  }
};
