// months data
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

async function loadData(url) {
    return await axios.get(url);
}

async function transformData(year, country){
    let response = await loadData("https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/master/bigger-sales.json");
    // step 1: convert the completed_at property from string to Date data type
    let transformed = response.data.map(function(datnum) {
        return {
            amount: datnum.payment.amount,
            date: new Date(datnum.completed_at),
            country: datnum.customer.country,
        };
    });
    // step 2: filter and keep those records that matches the year and country
    let filtered = transformed.filter(function(datnum) {
        return (
            datnum.date.getFullYear() == year &&
            (datnum.country.toLowerCase().includes(country.toLowerCase()) ||
            country === "")
        );
    });
    // step 3: extract out only the amount and the month
    let earnings = filtered.map(function(datnum) {
        return {
            amount: parseInt(datnum.amount),
            month: datnum.date.getMonth()
        };
    });
    
    // step 4: group by months
    let groups = groupBy(earnings, "month");
    
    // step 5: convert into series
    let series = [];
    for (let month in groups) {
        let group = groups[month];
        series.push({
            x: monthNames[month],
            y: group.reduce((acc, datanum) => acc + datanum.amount, 0)
        });
    }
    return series;
}
