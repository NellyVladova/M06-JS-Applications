export function validateMonth(event){
    return event.path.some(month => month.className == "monthCalendar" && month.tagName == "SECTION");
}

export function validateYear(event){
    return event.path.some(year => year.id === "years" && year.tagName == "SECTION") &&
    (event.target.className == "date" || event.target.className == "day");
}
