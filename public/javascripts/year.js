function parseFormattedDate(formattedDate) {
    const parts = formattedDate.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}


function experience() {
    var a = document.getElementById("4").value;
    const date = new Date(a);
    const year = date.getFullYear();
    const month = date.getMonth();
    const date1 = new Date();
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const diff = year1 - year;
    const diff1 = month1 - month;
    document.getElementById("10").textContent = `${diff} years and ${Math.abs(diff1)} months`;
}


module.exports.parseFormattedDate = parseFormattedDate;
