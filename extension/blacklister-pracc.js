var myInterval = setInterval(autoChecker, 500);

var lobbyCSS = "AtDRT"

var lastURL;
var upToDate = false;

function autoChecker() {
  console.log("Checking");

  lobbyButtons = document.getElementsByClassName(lobbyCSS);

  var actualPage = document.URL

  if(actualPage != lastURL){
    upToDate = false; console.log("Content not up to date")
  } 
  if(upToDate) return

  console.log(actualPage.slice(0,25))
  
  if (actualPage.slice(0,26) == "https://pracc.com/search") {
    colorTeams();
    //clearInterval(myInterval);
    lastURL = document.URL
    upToDate = true;

  } else if (actualPage.slice(0,26) == "https://pracc.com/matches/") {
    lobby();
    //clearInterval(myInterval);
    lastURL = document.URL
    upToDate = true;
  }
}

function lobby(){
  console.log("on lobby")

  var myButton = lobbyButtons[0].children[1].cloneNode(true);
  myButton.setAttribute("id", "deathnote-button");

  myButton.textContent = "Add to Blacklist"
  document.getElementsByClassName("AtDRT")[0].appendChild(myButton);

  var targetTeam = document.getElementsByTagName("h4")[0] // get target team

  value = localStorage.getItem("pracc.com-blacklist-" + targetTeam.children[1].href);     // read
  console.log(targetTeam.children[1].href)
  console.log("Actual team blacklist reason: " + value);
  if(value){
    document.getElementById("deathnote-button").textContent = "Blacklisted";
    
    var blacklistInfo = document.createElement("p")
    blacklistInfo.textContent = "Reason: " + value
    blacklistInfo.style.fontSize = "1rem"
    blacklistInfo.style.scale = "0.75"
    blacklistInfo.style.textAlign = "center"

    document.getElementById("deathnote-button").parentNode.append(blacklistInfo)
  }else{

  }

  document.getElementById("deathnote-button").onclick = function () {
    var blockReason = prompt("Type the reason or a label");
    console.log(blockReason)
    if (blockReason === null) blockReason = "N/A"

    // Blacklist
    console.log("set" + "pracc.com-blacklist-" + targetTeam.children[1].href + " to " + blockReason)
    localStorage.setItem("pracc.com-blacklist-" + targetTeam.children[1].href, blockReason);   // write

    document.getElementById("deathnote-button").textContent = "Blacklisted"
  };
}

function getTeams() {
  //Find team list div
  var paperDiv;
  for (let i = 0; i < document.getElementsByClassName("MuiPaper-root").length; i++) {
    if ( document.getElementsByClassName("MuiPaper-root")[i].getAttributeNames().length > 1){
     // console.log(document.getElementsByClassName("MuiPaper-root")[i + 1])
      paperDiv = document.getElementsByClassName("MuiPaper-root")[i + 1]
    }
  }

  var teams;
  console.log(document.URL.slice(0,32))
  if(document.URL.slice(0,32) == "https://pracc.com/search/instant"){
    teams = document.getElementsByClassName(paperDiv.children[0].children[2].children[1].children[2].className);
  }else{
    teams = document.getElementsByClassName(paperDiv.children[0].children[1].children[1].children[2].className);
  }
   
  console.log();
  console.groupCollapsed("Found " + teams.length + " teams:")
  for (let i = 0; i < teams.length; i++) {
    let targetTeam = teams[i].children[1].children[0];
    console.groupCollapsed(targetTeam.outerText)
    console.log(targetTeam.children[0].href)

    label = localStorage.getItem("pracc.com-blacklist-" + targetTeam.children[0].href)
    if (label) {
      console.log("blocked:" + label)
      targetTeam.children[0].style.color = "red"
    } else {
      console.log("blocked:" + false)
    }
    console.groupEnd()

  }
  console.groupEnd()
}

function colorTeams() {
  var test = document.getElementById("nav-btn-team").style.backgroundColor = "red";
  getTeams()

  //Cookies
  //localStorage.setItem("itemid", "hello" );   // write
  value = localStorage.getItem("pracc.com-blacklist-https://pracc.com/team/40478");     // read
  console.log(value)
}
