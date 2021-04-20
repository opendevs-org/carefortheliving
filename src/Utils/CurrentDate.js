export default function CurrentDate(separator=' ') {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    return `${date}${separator}${monthNames[month]}${separator}${year}`
}
