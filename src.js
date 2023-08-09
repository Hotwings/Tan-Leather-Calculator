var greenDragonhideId = 1753;
var blueDragonhideId = 1751;
var redDragonhideId = 1749;
var blackDragonhideId = 1747;

var greenDragonLeatherId = 1745;
var blueDragonLeatherId = 2505;
var redDragonLeatherId = 2507;
var blackDragonLeatherId = 2509;

var baseRealTimeURL = "https://prices.runescape.wiki/api/v1/osrs/latest";
var baseGeURL = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json"

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

async function getDataFromRealTimeAPI(id) {
	const response = await fetch(baseRealTimeURL + "?id=" + id);
	const myJson = await response.json(); //extract JSON from the http response

	return myJson.data[id];
}
async function getGEPrice(id) {
	const response = await fetch(baseGeURL + "?item=" + id);
	const myJson = await response.json(); //extract JSON from the http response

	return myJson.item.current.price;
}

function getTimeString(unixTimestamp) {
	var date = new Date(unixTimestamp * 1000);
	return date.toLocaleTimeString();
}

function addHideColorToUI(hideData, leatherData, hideGE, leatherGE, color){

	var cost = Math.max(hideData.high,hideData.low);
	var revenue = Math.min(leatherData.low,leatherData.high)
	var tax = Math.floor(revenue*.01);

	var profit = revenue-tax-cost;

	document.getElementById(color+'Profit').innerHTML = profit;
	document.getElementById(color+'ProfitPerHour').innerHTML = USDollar.format(profit*7500);

	
	document.getElementById(color+'hgep').innerHTML = hideGE;
	document.getElementById(color+'hhp').innerHTML = hideData.high;
	document.getElementById(color+'hht').innerHTML = getTimeString(hideData.highTime);
	document.getElementById(color+'hlp').innerHTML = hideData.low;
	document.getElementById(color+'hlt').innerHTML = getTimeString(hideData.lowTime);

	document.getElementById(color+'lgep').innerHTML = leatherGE;
	document.getElementById(color+'lhp').innerHTML = leatherData.high;
	document.getElementById(color+'lht').innerHTML = getTimeString(leatherData.highTime);
	document.getElementById(color+'llp').innerHTML = leatherData.low;
	document.getElementById(color+'llt').innerHTML = getTimeString(leatherData.lowTime);

}

(async () => {

	var greenHideData = await getDataFromRealTimeAPI(greenDragonhideId);
	var blueHideData = await getDataFromRealTimeAPI(blueDragonhideId);
	var redHideData = await getDataFromRealTimeAPI(redDragonhideId);
	var blackHideData = await getDataFromRealTimeAPI(blackDragonhideId);

	var greenHideGEPrice = await getGEPrice(greenDragonhideId);
	var blueHideGEPrice = await getGEPrice(blueDragonhideId);
	var redHideGEPrice = await getGEPrice(redDragonhideId);
	var blackHideGEPrice = await getGEPrice(blackDragonhideId);


	var greenLeatherData = await getDataFromRealTimeAPI(greenDragonLeatherId);
	var blueLeatherData = await getDataFromRealTimeAPI(blueDragonLeatherId);
	var redLeatherData = await getDataFromRealTimeAPI(redDragonLeatherId);
	var blackLeatherData = await getDataFromRealTimeAPI(blackDragonLeatherId);
	
	var greenLeatherGEPrice = await getGEPrice(greenDragonhideId);
	var blueLeatherGEPrice = await getGEPrice(blueDragonhideId);
	var redLeatherGEPrice = await getGEPrice(redDragonhideId);
	var blackLeatherGEPrice = await getGEPrice(blackDragonhideId);

	addHideColorToUI(greenHideData,greenLeatherData, greenHideGEPrice, greenLeatherGEPrice,"green");
	addHideColorToUI(blueHideData,blueLeatherData, blueHideGEPrice, blueLeatherGEPrice,"blue");
	addHideColorToUI(redHideData,redLeatherData, redHideGEPrice, redLeatherGEPrice,"red");
	addHideColorToUI(blackHideData,blackLeatherData, blackHideGEPrice, blackLeatherGEPrice,"black");


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
