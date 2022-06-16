//get date/time in UTC
const currentDateAndTime = function createDateAsUTC() {
    const date = new Date()
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};

module.exports = { currentDateAndTime }