import dayjs from 'dayjs';

export function toDateString(timestamp) {
  return dayjs(timestamp).format('M/D/YYYY');
}

export function toTimeString(timestamp) {
  return dayjs(timestamp).format('h:mm A');
}

/**
 * Takes an array of meeting objects and groups them by month/year after
 * converting their timestamps.
 *
 * Each meeting object is structured as:
 * {
 *    id,
 *    meeting_start_timestamp: Unix time (milliseconds),
 *    status
 * }
 *
 * @param {Array} meetings List of meeting objects from getAllMeetings query
 * @returns {Array} List of objects organized by year/month and their meetings
 * Example: [
 *    {
 *      year: 2021,
 *      month: "January",
 *      meetings: [...]
 *    },
 *    {
 *      year: 2021,
 *      month: "February",
 *      meetings: [...]
 *    }
 * ]
 */

export function groupMeetingsByDate(meetings) {
  const months = dayjs.months();
  const groups = {};

  // Fill hash table with meetings organized by year and month
  meetings.forEach((meeting) => {
    const unixTime = parseInt(meeting.meeting_start_timestamp, 10) / 1000;
    const date = dayjs(unixTime);
    const month = date.month();
    const year = date.year();

    if (groups[year] === undefined) groups[year] = [];
    if (groups[year][month] === undefined) groups[year][month] = [];
    groups[year][month].push(meeting);
  });

  // Iterate through all years and push an object for each month
  // that has meetings
  const result = [];
  const sortedYears = Object.keys(groups).sort();

  sortedYears.forEach((year) => {
    const yearMeetings = groups[year];

    for (let i = 0; i < 12; i += 1) {
      if (yearMeetings[i] !== undefined) {
        const monthObj = {
          year,
          month: months[i],
          meetings: yearMeetings[i],
        };
        result.push(monthObj);
      }
    }
  });

  return result;
}
