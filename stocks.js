document.getElementById('lookupBtn').addEventListener('click', fetchStock);

async function fetchStock() {
  const ticker = document.getElementById('stockTicker').value;
  const range = document.getElementById('dateRange').value;
  const key = 'YOUR_POLYGON_API_KEY';
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - parseInt(range));

  const format = (date) => date.toISOString().split('T')[0];
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${format(startDate)}/${format(endDate)}?adjusted=true&sort=asc&apiKey=${key}`;

  const res = await fetch(url);
  const data = await res.json();

  const labels = data.results.map(entry => new Date(entry.t * 1000).toLocaleDateString());
  const values = data.results.map(entry => entry.c);

  const ctx = document.getElementById('stockChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: values,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });
}


fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
  .then(res => res.json())
  .then(data => {
    const top5 = data.slice(0, 5);
    const tbody = document.querySelector('#redditStocks tbody');
    top5.forEach(stock => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
        <td>${stock.no_of_comments}</td>
        <td>${stock.sentiment === 'Bullish' ? '🐂' : '🐻'}</td>
      `;
      tbody.appendChild(row);
    });
  });

if (annyang) {
  annyang.addCommands({
    'lookup *stock': function(stock) {
      document.getElementById('stockTicker').value = stock.toUpperCase();
      document.getElementById('dateRange').value = '30';
      fetchStock();
    }
  });
  annyang.start();
}
