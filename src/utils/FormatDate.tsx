import moment from "moment";

export const formatDate = (date: string): string => {
  return moment(date).format("DD MMM YYYY"); // e.g., "23 Mar 2025"
};
