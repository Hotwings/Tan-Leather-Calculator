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

function getTime(unixTimestamp) {
	var date = new Date(unixTimestamp * 1000);
	return date.toLocaleTimeString();
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



	var greenProfit = Math.min(greenLeatherData.low,greenLeatherData.high) - Math.max(greenHideData.high,greenHideData.low);
	var blueProfit = Math.min(blueLeatherData.low,blueLeatherData.high) - Math.max(blueHideData.high,blueHideData.low);
	var redProfit = Math.min(redLeatherData.low,redLeatherData.high) - Math.max(redHideData.high,redHideData.low);
	var blackProfit = Math.min(blackLeatherData.low,blackLeatherData.high) - Math.max(blackHideData.high,blackHideData.low);

	document.getElementById('greenProfit').innerHTML = greenProfit;
	document.getElementById('greenProfitPerHour').innerHTML = USDollar.format(greenProfit*7500);
	
	document.getElementById('blueProfit').innerHTML = blueProfit;
	document.getElementById('blueProfitPerHour').innerHTML = USDollar.format(blueProfit*7500);
	
	document.getElementById('redProfit').innerHTML = redProfit;
	document.getElementById('redProfitPerHour').innerHTML = USDollar.format(redProfit*7500);
	
	document.getElementById('blackProfit').innerHTML = blackProfit;
	document.getElementById('blackProfitPerHour').innerHTML = USDollar.format(blackProfit*7500);

	document.getElementById('ghhp').innerHTML = greenHideData.high;
	document.getElementById('ghht').innerHTML = getTime(greenHideData.highTime);
	document.getElementById('ghlp').innerHTML = greenHideData.low;
	document.getElementById('ghlt').innerHTML = getTime(greenHideData.lowTime);

	document.getElementById('bluehhp').innerHTML = blueHideData.high;
	document.getElementById('bluehht').innerHTML = getTime(blueHideData.highTime);
	document.getElementById('bluehlp').innerHTML = blueHideData.low;
	document.getElementById('bluehlt').innerHTML = getTime(blueHideData.lowTime);

	document.getElementById('rhhp').innerHTML = redHideData.high;
	document.getElementById('rhht').innerHTML = getTime(redHideData.highTime);
	document.getElementById('rhlp').innerHTML = redHideData.low;
	document.getElementById('rhlt').innerHTML = getTime(redHideData.lowTime);

	document.getElementById('blackhhp').innerHTML = blackHideData.high;
	document.getElementById('blackhht').innerHTML = getTime(blackHideData.highTime);
	document.getElementById('blackhlp').innerHTML = blackHideData.low;
	document.getElementById('blackhlt').innerHTML = getTime(blackHideData.lowTime);



	document.getElementById('glhp').innerHTML = greenLeatherData.high;
	document.getElementById('glht').innerHTML = getTime(greenLeatherData.highTime);
	document.getElementById('gllp').innerHTML = greenLeatherData.low;
	document.getElementById('gllt').innerHTML = getTime(greenLeatherData.lowTime);

	document.getElementById('bluelhp').innerHTML = blueLeatherData.high;
	document.getElementById('bluelht').innerHTML = getTime(blueLeatherData.highTime);
	document.getElementById('bluellp').innerHTML = blueLeatherData.low;
	document.getElementById('bluellt').innerHTML = getTime(blueLeatherData.lowTime);

	document.getElementById('rlhp').innerHTML = redLeatherData.high;
	document.getElementById('rlht').innerHTML = getTime(redLeatherData.highTime);
	document.getElementById('rllp').innerHTML = redLeatherData.low;
	document.getElementById('rllt').innerHTML = getTime(redLeatherData.lowTime);

	document.getElementById('blacklhp').innerHTML = blackLeatherData.high;
	document.getElementById('blacklht').innerHTML = getTime(blackLeatherData.highTime);
	document.getElementById('blackllp').innerHTML = blackLeatherData.low;
	document.getElementById('blackllt').innerHTML = getTime(blackLeatherData.lowTime);

})();
