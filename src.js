var greenDragonhideId = 1753;
var blueDragonhideId = 1751;
var redDragonhideId = 1749;
var blackDragonhideId = 1747;

var greenDragonLeatherId = 1745;
var blueDragonLeatherId = 2505;
var redDragonLeatherId = 2507;
var blackDragonLeatherId = 2509;

var prayerPotion1Id = 143;
var prayerPotion2Id = 141;
var prayerPotion3Id = 139;
var prayerPotion4Id = 2434;

var saradominBrew1Id = 6691;
var saradominBrew2Id = 6689;
var saradominBrew3Id = 6687;
var saradominBrew4Id = 6685;

var staminaPotion1Id = 12631
var staminaPotion2Id = 12629
var staminaPotion3Id = 12627
var staminaPotion4Id = 12625

var superRestore1Id = 3030;
var superRestore2Id = 3028;
var superRestore3Id = 3026;
var superRestore4Id = 3024;

var baseRealTimeURL = "https://prices.runescape.wiki/api/v1/osrs/latest";
//var baseGeURL = "https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json"

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

async function addPotionToDecantTable(potion1Id, potion2Id, potion3Id, potion4Id, potionName) {
	var potion1Data = await getDataFromRealTimeAPI(potion1Id);
	var potion2Data = await getDataFromRealTimeAPI(potion2Id);
	var potion3Data = await getDataFromRealTimeAPI(potion3Id);
	var potion4Data = await getDataFromRealTimeAPI(potion4Id);

	var tr = document.createElement("tr");

	var nameElem = document.createElement("td");
	nameElem.innerText = potionName;
	tr.appendChild(nameElem);

	var oneDoseCostElem = document.createElement("td");
	oneDoseCostElem.innerText = potion1Data.high;
	tr.appendChild(oneDoseCostElem);
	var oneDoseProfitElem = document.createElement("td");
	oneDoseProfitElem.innerText = Math.round(potion4Data.low - (potion1Data.high * 4));
	tr.appendChild(oneDoseProfitElem);

	var twoDoseCostElem = document.createElement("td");
	twoDoseCostElem.innerText = potion2Data.high;
	tr.appendChild(twoDoseCostElem);
	var twoDoseProfitElem = document.createElement("td");
	twoDoseProfitElem.innerText = Math.round(potion4Data.low - ((potion2Data.high / 2) * 4));
	tr.appendChild(twoDoseProfitElem);

	var threeDoseCostElem = document.createElement("td");
	threeDoseCostElem.innerText = potion3Data.high;
	tr.appendChild(threeDoseCostElem);
	var threeDoseProfitElem = document.createElement("td");
	threeDoseProfitElem.innerText = Math.round(potion4Data.low - ((potion3Data.high / 3) * 4));
	tr.appendChild(threeDoseProfitElem);

	var fourDoseSellPriceElem = document.createElement("td");
	fourDoseSellPriceElem.innerText = potion4Data.low;
	tr.appendChild(fourDoseSellPriceElem);

	document.getElementById("decantTable").appendChild(tr);

}

async function addAirBattlestaffTable() {
	var airOrbData = await getDataFromRealTimeAPI(573);
	var battlestaffData = await getDataFromRealTimeAPI(1391);
	var airBattlestaffData = await getDataFromRealTimeAPI(1397);

	var tr = document.createElement("tr");

	var airOrbCost = Math.max(airOrbData.high, airOrbData.low);
	var battlestaffCost = Math.max(battlestaffData.high, battlestaffData.low);
	var totalSpent = airOrbCost+battlestaffCost;
	var airBattlestaffRevenue = Math.min(airBattlestaffData.high, airBattlestaffData.low);
	var tax = Math.floor(airBattlestaffRevenue * .01);
	var profit = airBattlestaffRevenue-tax-totalSpent;
	var gpPerXp = profit/137.5;

	var airOrbCell = document.createElement("td");
	airOrbCell.innerText = airOrbCost;
	tr.appendChild(airOrbCell);

	var battlestaffCell = document.createElement("td");
	battlestaffCell.innerText = battlestaffCost;
	tr.appendChild(battlestaffCell);

	var airBattlestaffCell = document.createElement("td");
	airBattlestaffCell.innerText = airBattlestaffRevenue;
	tr.appendChild(airBattlestaffCell);

	var gpPerXpCell = document.createElement("td");
	gpPerXpCell.innerText = gpPerXp;
	tr.appendChild(gpPerXpCell);


	document.getElementById("airBattleStaffTable").appendChild(tr);

}

async function addHideColorToUI(hideId, leatherId,/* hideGE, leatherGE,*/ color, astralRunePrice, natureRunePrice) {

	var hideData = await getDataFromRealTimeAPI(hideId);
	var leatherData = await getDataFromRealTimeAPI(leatherId);

	var cost = Math.max(hideData.high, hideData.low);
	var revenue = Math.min(leatherData.low, leatherData.high)
	var tax = Math.floor(revenue * .01);

	var astralRuneCostPerHide = ((astralRunePrice*2)/5);
	var natureRuneCostPerHide = natureRunePrice/5;

	var profit = revenue - tax - cost - (astralRuneCostPerHide+natureRuneCostPerHide);

	document.getElementById(color + 'Profit').innerHTML = profit;
	document.getElementById(color + 'ProfitPerHour').innerHTML = USDollar.format(profit * 7500);


	//document.getElementById(color+'hgep').innerHTML = hideGE;
	document.getElementById(color + 'hhp').innerHTML = hideData.high;
	document.getElementById(color + 'hht').innerHTML = getTimeString(hideData.highTime);
	document.getElementById(color + 'hlp').innerHTML = hideData.low;
	document.getElementById(color + 'hlt').innerHTML = getTimeString(hideData.lowTime);

	//document.getElementById(color+'lgep').innerHTML = leatherGE;
	document.getElementById(color + 'lhp').innerHTML = leatherData.high;
	document.getElementById(color + 'lht').innerHTML = getTimeString(leatherData.highTime);
	document.getElementById(color + 'llp').innerHTML = leatherData.low;
	document.getElementById(color + 'llt').innerHTML = getTimeString(leatherData.lowTime);

}


//Main method
(async () => {

	/*
	var greenHideGEPrice = await getGEPrice(greenDragonhideId);
	var blueHideGEPrice = await getGEPrice(blueDragonhideId);
	var redHideGEPrice = await getGEPrice(redDragonhideId);
	var blackHideGEPrice = await getGEPrice(blackDragonhideId);

	var greenLeatherGEPrice = await getGEPrice(greenDragonhideId);
	var blueLeatherGEPrice = await getGEPrice(blueDragonhideId);
	var redLeatherGEPrice = await getGEPrice(redDragonhideId);
	var blackLeatherGEPrice = await getGEPrice(blackDragonhideId);
	*/

	var astralRuneData = await getDataFromRealTimeAPI(9075);
	var natureRuneData = await getDataFromRealTimeAPI(561);

	var astralRunePrice = Math.max(astralRuneData.high, astralRuneData.low);
	var natureRunePrice = Math.max(natureRuneData.high, natureRuneData.low);

	
	document.getElementById('astralRuneCost').innerHTML = astralRunePrice;
	document.getElementById('natureRuneCost').innerHTML = natureRunePrice;

	addHideColorToUI(greenDragonhideId, greenDragonLeatherId, /*greenHideGEPrice, greenLeatherGEPrice,*/"green", astralRunePrice, natureRunePrice);
	addHideColorToUI(blueDragonhideId, blueDragonLeatherId, /*blueHideGEPrice, blueLeatherGEPrice,*/"blue", astralRunePrice, natureRunePrice);
	addHideColorToUI(redDragonhideId, redDragonLeatherId, /*redHideGEPrice, redLeatherGEPrice,*/"red", astralRunePrice, natureRunePrice);
	addHideColorToUI(blackDragonhideId, blackDragonLeatherId, /*blackHideGEPrice, blackLeatherGEPrice,*/"black", astralRunePrice, natureRunePrice);

	addPotionToDecantTable(prayerPotion1Id, prayerPotion2Id, prayerPotion3Id, prayerPotion4Id, "Prayer Potion");
	addPotionToDecantTable(saradominBrew1Id, saradominBrew2Id, saradominBrew3Id, saradominBrew4Id, "Saradomin brew");
	addPotionToDecantTable(staminaPotion1Id, staminaPotion2Id, staminaPotion3Id, staminaPotion4Id, "Stamina potion");
	addPotionToDecantTable(superRestore1Id, superRestore2Id, superRestore3Id, superRestore4Id, "Super restore");

	addAirBattlestaffTable();
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
