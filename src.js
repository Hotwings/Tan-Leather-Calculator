var greenDragonhideId = 1753;
var blueDragonhideId = 1751;
var redDragonhideId = 1749;
var blackDragonhideId = 1747;

var greenDragonLeatherId = 1745;
var blueDragonLeatherId = 2505;
var redDragonLeatherId = 2507;
var blackDragonLeatherId = 2509;

var baseURL = "https://prices.runescape.wiki/api/v1/osrs/latest";

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

async function getDataFromAPI(id) {
	const response = await fetch(baseURL + "?id=" + id);
	const myJson = await response.json(); //extract JSON from the http response

	return myJson.data[id];

}

function getTimeString(unixTimestamp) {
	var date = new Date(unixTimestamp * 1000);
	return date.toLocaleTimeString();
}

function addHideColorToUI(hideData, leatherData, color){

	var cost = Math.max(hideData.high,hideData.low);
	var revenue = Math.min(leatherData.low,leatherData.high)
	var tax = Math.floor(revenue*.01);

	var profit = revenue-tax-cost;

	document.getElementById(color+'Profit').innerHTML = profit;
	document.getElementById(color+'ProfitPerHour').innerHTML = USDollar.format(profit*7500);

	document.getElementById(color+'hhp').innerHTML = hideData.high;
	document.getElementById(color+'hht').innerHTML = getTimeString(hideData.highTime);
	document.getElementById(color+'hlp').innerHTML = hideData.low;
	document.getElementById(color+'hlt').innerHTML = getTimeString(hideData.lowTime);

	document.getElementById(color+'lhp').innerHTML = leatherData.high;
	document.getElementById(color+'lht').innerHTML = getTimeString(leatherData.highTime);
	document.getElementById(color+'llp').innerHTML = leatherData.low;
	document.getElementById(color+'llt').innerHTML = getTimeString(leatherData.lowTime);

}

(async () => {

	var greenHideData = await getDataFromAPI(greenDragonhideId);
	var blueHideData = await getDataFromAPI(blueDragonhideId);
	var redHideData = await getDataFromAPI(redDragonhideId);
	var blackHideData = await getDataFromAPI(blackDragonhideId);

	var greenLeatherData = await getDataFromAPI(greenDragonLeatherId);
	var blueLeatherData = await getDataFromAPI(blueDragonLeatherId);
	var redLeatherData = await getDataFromAPI(redDragonLeatherId);
	var blackLeatherData = await getDataFromAPI(blackDragonLeatherId);

	addHideColorToUI(greenHideData,greenLeatherData,"green");
	addHideColorToUI(blueHideData,blueLeatherData,"blue");
	addHideColorToUI(redHideData,redLeatherData,"red");
	addHideColorToUI(blackHideData,blackLeatherData,"black");


	/*

	var greenProfit = Math.min(greenLeatherData.low,greenLeatherData.high)*.99 - Math.max(greenHideData.high,greenHideData.low);
	var blueProfit = Math.min(blueLeatherData.low,blueLeatherData.high)*.99 - Math.max(blueHideData.high,blueHideData.low);
	var redProfit = Math.min(redLeatherData.low,redLeatherData.high)*.99 - Math.max(redHideData.high,redHideData.low);
	var blackProfit = Math.min(blackLeatherData.low,blackLeatherData.high)*.99 - Math.max(blackHideData.high,blackHideData.low);

	document.getElementById('greenProfit').innerHTML = greenProfit;
	document.getElementById('greenProfitPerHour').innerHTML = USDollar.format(greenProfit*7500);
	
	document.getElementById('blueProfit').innerHTML = blueProfit;
	document.getElementById('blueProfitPerHour').innerHTML = USDollar.format(blueProfit*7500);
	
	document.getElementById('redProfit').innerHTML = redProfit;
	document.getElementById('redProfitPerHour').innerHTML = USDollar.format(redProfit*7500);
	
	document.getElementById('blackProfit').innerHTML = blackProfit;
	document.getElementById('blackProfitPerHour').innerHTML = USDollar.format(blackProfit*7500);

	document.getElementById('ghhp').innerHTML = greenHideData.high;
	document.getElementById('ghht').innerHTML = getTimeString(greenHideData.highTime);
	document.getElementById('ghlp').innerHTML = greenHideData.low;
	document.getElementById('ghlt').innerHTML = getTimeString(greenHideData.lowTime);

	document.getElementById('bluehhp').innerHTML = blueHideData.high;
	document.getElementById('bluehht').innerHTML = getTimeString(blueHideData.highTime);
	document.getElementById('bluehlp').innerHTML = blueHideData.low;
	document.getElementById('bluehlt').innerHTML = getTimeString(blueHideData.lowTime);

	document.getElementById('rhhp').innerHTML = redHideData.high;
	document.getElementById('rhht').innerHTML = getTimeString(redHideData.highTime);
	document.getElementById('rhlp').innerHTML = redHideData.low;
	document.getElementById('rhlt').innerHTML = getTimeString(redHideData.lowTime);

	document.getElementById('blackhhp').innerHTML = blackHideData.high;
	document.getElementById('blackhht').innerHTML = getTimeString(blackHideData.highTime);
	document.getElementById('blackhlp').innerHTML = blackHideData.low;
	document.getElementById('blackhlt').innerHTML = getTimeString(blackHideData.lowTime);



	document.getElementById('glhp').innerHTML = greenLeatherData.high;
	document.getElementById('glht').innerHTML = getTimeString(greenLeatherData.highTime);
	document.getElementById('gllp').innerHTML = greenLeatherData.low;
	document.getElementById('gllt').innerHTML = getTimeString(greenLeatherData.lowTime);

	document.getElementById('bluelhp').innerHTML = blueLeatherData.high;
	document.getElementById('bluelht').innerHTML = getTimeString(blueLeatherData.highTime);
	document.getElementById('bluellp').innerHTML = blueLeatherData.low;
	document.getElementById('bluellt').innerHTML = getTimeString(blueLeatherData.lowTime);

	document.getElementById('rlhp').innerHTML = redLeatherData.high;
	document.getElementById('rlht').innerHTML = getTimeString(redLeatherData.highTime);
	document.getElementById('rllp').innerHTML = redLeatherData.low;
	document.getElementById('rllt').innerHTML = getTimeString(redLeatherData.lowTime);

	document.getElementById('blacklhp').innerHTML = blackLeatherData.high;
	document.getElementById('blacklht').innerHTML = getTimeString(blackLeatherData.highTime);
	document.getElementById('blackllp').innerHTML = blackLeatherData.low;
	document.getElementById('blackllt').innerHTML = getTimeString(blackLeatherData.lowTime);
	*/
})();
