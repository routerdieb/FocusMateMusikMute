console.log('background worker started')
chrome.tabs.onRemoved.addListener(close_check)


try{
    chrome.runtime.onMessage.addListener(async function(request, sender) {
		//console.log("sender.tab.id")
		//console.log(sender.tab.id)
        if (request.type == "muteType"){
            //console.log("recieved muteType")
            //console.log(request.status)
			if (request.status == "false"){
				turn_Off_Sound()
			}else{
				turn_On_Sound()
			}
            //react(request.status);
        }
    });
}catch(err){}

function returnMessage(messageToReturn)
{
 chrome.tabs.getSelected(null, function(tab) {
  var joinedMessage = messageToReturn + backgroundScriptMessage;  
  chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
 });
}

function turn_Off_Sound() {
  chrome.tabs.query({url: []}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var mutedInfo = tabs[i].mutedInfo;
		if (mutedInfo){
			//console.log('turn_off',tabs[i].url)
			if (!tabs[i].url.includes("focusmate.com")){
				chrome.tabs.update(tabs[i].id, {"muted": true});
			}
		}
    }
})}

function turn_On_Sound() {
  chrome.tabs.query({url: []}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var mutedInfo = tabs[i].mutedInfo;
      if (mutedInfo){
		//console.log('turn_on',tabs[i].url)
		if (!tabs[i].url.includes("focusmate.com")){
				chrome.tabs.update(tabs[i].id, {"muted": false});
		}
	  }
    }
})}

function close_check(tabid, removed) {
	console.log(tabid)
	console.log('above tab was closed')
	
	chrome.tabs.query({url: []}, function (tabs) {
		
	}
}