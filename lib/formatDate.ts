export default function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Adjust the date to the local time zone
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = localDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
