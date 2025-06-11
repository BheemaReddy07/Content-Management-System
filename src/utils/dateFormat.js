export default function FormatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  if(dateString instanceof Date) {
    return date.toLocaleDateString("en-IN", options);
  }
  else{
    return "Date not Found"
  }
 
}