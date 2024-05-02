const apiKey = 'e891ca8234msh441344a32a374e6p1b5060jsn2eed4acf6b50';
let symbol = " ";  
let currentYieldAAA = 0;
let peNoGrowthCompanies = 8.5;
let avgYieldAAA = 4.4;

let stockTicker = document.getElementById("stockTicker");
stockTicker.addEventListener("change", setStockTicker);
let currentYield = document.getElementById("currentYieldAAA");
currentYield.addEventListener("change", setCurrentYieldAAA);

function setStockTicker() {
  symbol = document.getElementById("stockTicker").value;
};

function setCurrentYieldAAA() {
  currentYieldAAA = document.getElementById("currentYieldAAA").value;
};

let buttonSubmit = document.getElementById("btn-submit");
buttonSubmit.addEventListener("click", intrinsicValue)

let currentPrice = document.getElementById("currentPrice");

async function intrinsicValue() {
  const requests = [
    {
      url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${symbol}&module=earnings`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
        'Content-Type': 'application/json'
      }
    },
    {
      url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${symbol}&type=STOCKS`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
        'Content-Type': 'application/json'
      }
    },
    {
      url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbol}%2CMSFT%2C%5ESPX%2C%5ENYA%2CGAZP.ME%2CSIBN.ME%2CGEECEE.NS`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
        'Content-Type': 'application/json'
      }
    },
    {
      url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbol}%2CMSFT%2C%5ESPX%2C%5ENYA%2CGAZP.ME%2CSIBN.ME%2CGEECEE.NS`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
        'Content-Type': 'application/json'
      }
    },
    {
      url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbol}%2CMSFT%2C%5ESPX%2C%5ENYA%2CGAZP.ME%2CSIBN.ME%2CGEECEE.NS`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
        'Content-Type': 'application/json'
      }
    }
  ];

try {
  const responses = await Promise.all(requests.map(request => fetch(request.url, {
    method: request.method,
    headers: new Headers(request.headers)
  })));

  const dataPromises = responses.map(response => response.json());
  const dataArray = await Promise.all(dataPromises);
  let epsGrowth = parseFloat(dataArray[0].body.earningsTrend.trend[4].growth.fmt);
  let pricePerShare = dataArray[1].body.primaryData.lastSalePrice;
  let dividendYield = dataArray[2].body[0].dividendYield;
  let trailingPE = dataArray[3].body[0].trailingPE;
  let epsTTM = dataArray[4].body[0].epsTrailingTwelveMonths;
  let peterLynchValuation = (epsGrowth + dividendYield) / trailingPE;
  let benjaminGrahamValuation = (epsTTM * (peNoGrowthCompanies + (2 * epsGrowth)) * avgYieldAAA)/currentYieldAAA;
  
  currentPrice.innerHTML = pricePerShare;

  console.log('bgValuation = ' + benjaminGrahamValuation);
  console.log('price = ' + pricePerShare);
  console.log('currentYieldAAA = ' + currentYieldAAA);
  console.log('epsGrowth = ' + epsGrowth)
  console.log('epsTTM: ' + epsTTM);
  console.log('peterLynchValuation: ' + peterLynchValuation);
  console.log(dataArray);

} catch (error) {
  console.error('Error fetching data:', error);
}
};
