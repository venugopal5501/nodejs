
function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear().toString();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = { formatDate };