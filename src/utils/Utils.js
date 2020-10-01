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
  },
  randomColors(count) {
    const colors = [
      "#EF5350",
      "#EC407A",
      "#AB47BC",
      "#42A5F5",
      "#7E57C2",
      "#5C6BC0",
      "teal",
      "light-blue",
      "cyan",
      "green",
      "light-green",
      "lime",
      "#FFA726",
      "#546E7A",
      "#FFCA28",
      "brown",
      "deep-orange",
      "grey"
    ];
    return colors.slice(0, count);
  }
};
