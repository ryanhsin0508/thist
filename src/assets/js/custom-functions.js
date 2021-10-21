export function checkType(data) {
  let type = typeof data;
  if (type === "object") {
    type = Array.isArray(data) ? "array" : "object";
    type = data.getMonth === "function" ? "date" : type;
  }
  if (
    type === "array" &&
    data.length === 2 &&
    checkType(data[0]) === "date"
  ) {
    type = "ranged-date";
  }
  if (type === "string") {
    return type;
    type =
      data.length > 6 && new Date(data) != "Invalid Date"
        ? "date"
        : "string";
  }
  return type;
}
export function createFormData(){
  return "AAA"
}