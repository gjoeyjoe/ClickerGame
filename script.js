let gameData = {
  gold: 0,
  GPS: 1,
  GPC: 1
}

class Item {
  constructor(name,cost,nextGPS,nextGPC){
    this._name = name,
    this._level = 0,
    this._cost = cost,
    this._nextGPS = nextGPS,
    this._nextGPC = nextGPC
  }
  
  get name() {
    return this._name
  }

  get level() {
    return this._level
  }

  get cost() {
    return this._cost
  }

  get nextGPS() {
    return this._nextGPS
  }

  get nextGPC() {
    return this._nextGPC
  }

  set level(newLevel) {
    this._level = newLevel
  }

  set cost(newCost) {
    this._cost = newCost
  }

  set nextGPS(newNextGPS) {
    this._nextGPS = newNextGPS
  }

  set nextGPC(newNextGPC) {
    this._nextGPC = newNextGPC
  }
}

let PickAxe = new Item('Pick Axe',5,1,1);
let MineShaft = new Item('Mine Shaft',100,2,2);

function mineGold() {
  gameData.gold += gameData.GPC;
  document.getElementById("gold-mined").innerHTML = Math.round(gameData.gold) + " Gold Mined";
}

function refreshInfo(){
  document.getElementById("gold-mined").innerHTML = Math.round(gameData.gold) + " Gold Mined"
  document.getElementById("gpc").innerHTML = Math.round(gameData.GPC) + " Gold per click"
  document.getElementById("gps").innerHTML = Math.round(gameData.GPS) + " Gold per second"
}

function refreshData(item) { //Refresh the UI info such as Gold Mined, Gold per click, Cost of items, etc.
  if(item.name == 'Pick Axe'){
	  document.getElementById("pick-axe").innerHTML = "↑ PickAxe (LVL " + item.level + ") Cost: " + Math.round(item.cost) + " [+" + Math.round(item.nextGPS) + " gps, +" + Math.round(item.nextGPC) + " gpc]"
  } 
}

function buyItem(item) {
  if (gameData.gold >= item.cost) {
    gameData.gold -= item.cost    
	  gameData.GPC += item.nextGPC
	  gameData.GPS += item.nextGPS  
	  item.level += 1
	
	//Incrase cost and stats
	  item.cost += 30+1.3^(item.level)
	  item.nextGPS += 5+1.10^(item.level)
	  item.nextGPC += 2+1.10^(item.level)
	
	  refreshData(item)
  }
}

function buyMineShaft() {
  if (gameData.gold >= gameData.MineShaftCost) {
    gameData.gold -= gameData.MineShaftCost    
	gameData.goldPerClick += gameData.MineShaftNextLevelGPC
	gameData.goldPerSecond += gameData.MineShaftNextLevelGPS  
	gameData.MineShaftLevel += 1
	
	//Incrase cost and stats
	gameData.MineShaftCost += 30+1.3^(gameData.MineShaftLevel)
	gameData.MineShaftNextLevelGPS += 5+1.10^(gameData.MineShaftLevel)
	gameData.MineShaftNextLevelGPC += 2+1.10^(gameData.MineShaftLevel)
	
	refreshData()
  }
}

//What the game does every second
var mainGameLoop = window.setInterval(function() {
  gameData.gold += gameData.GPS
  refreshInfo()
},1000)


  
//load game as "goldMinerSave.JSON"
//var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
//if (savegame !== null) {
//  gameData = savegame
//  refreshData()
//}
