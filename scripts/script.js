let data;

const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    series:[
        
    ],
    noData: {
        "text": "Loading..."
    } 
}
 
async function updateChart(data, chart, searchTerms) {
    let series = await transformData(searchTerms.year, searchTerms.country);
    chart.updateSeries([
        {
        name: "Sales",
        data: series
        }
    ]);
}
  

window.addEventListener('DOMContentLoaded', async ()=>{
    // create the chart
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    data = await transformData(2020, "");

     // can only update after we render
    updateChart(data, chart, {
        year: 2020,
        country: ""
    });
});

document.querySelector("#search-btn").addEventListener("click", function() {
    let country = document.querySelector("#search-terms").value;
    updateChart(data, chart, {
        year: 2020,
        country: country
    });
});
