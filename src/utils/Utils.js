import { format, formatDistanceToNow, parseISO } from "date-fns";

export default {
  /**
   * Format an ISO format string date
   * - converts a string date ('2014-02-11T11:30:30') to Date ('Tue Feb 11 2014 11:30:30')
   * - formats to "PPpp" format ('May 29, 1453, 12:00:00 AM')
   *
   * @param { string } date
   * @param { string } format
   * @return { Date }
   */
  formatISODate (date, specifiedFormat = "do MMM yyyy") {
    if (!date) {
      return;
    }
    let isoDate = parseISO(date);
    return format(isoDate, specifiedFormat);
  },

  /**
   * Return the distance between the given date and now in words.
   * - converts a string date ('2014-02-11T11:30:30') to Date ('Tue Feb 11 2014 11:30:30')
   * - returns the distance between ISODate and new Date.now()
   *
   * @param { string } date
   * @return { Date }
   */
  formatDistance (date) {
    if (!date) {
      return;
    }

    let isoDate = parseISO(date);
    return formatDistanceToNow(isoDate, { addSuffix: true, includeSeconds: true });
  },

  /**
   * Random Colors for an Array
   * - takes a number, say array.length
   * - returns an array with color names in order to map an array and attach the color
   *
   * @param { number } count
   * @return { Array<string> }
   */
  randomColors (count) {
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
