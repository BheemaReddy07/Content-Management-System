export default function FormatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  
    return date.toLocaleDateString("en-IN", options);
  
  
 
}