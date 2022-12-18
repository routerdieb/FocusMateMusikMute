console.log('background worker started');
chrome.tabs.onRemoved.addListener(close_check_tab);

// Background script
var tabToUrl = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Note: this event is fired twice:
    // Once with `changeInfo.status` = "loading" and another time with "complete"
    tabToUrl[tabId] = tab.url;
});


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
			}//else{
				//if musik playing disable sound of partner
			//	chrome.tabs.update(tabs[i].id, {"muted": false});
			//}
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
		}else{
			//if musik playing muted, than unmute sound of partner
			chrome.tabs.update(tabs[i].id, {"muted": true});
		}
	  }
    }
})}

function close_check_tab(tabId, removed) {
	url = tabToUrl[tabId]
	console.log(url)
	console.log('above tab was closed')
	if (url.includes("focusmate.com") && check_only_focusmate(tabId)){
		turn_On_Sound();
	}
	delete tabToUrl[tabId]
}

function check_only_focusmate(searched_Id){
	console.log('checking if only focusmate')
	for (var tab_Id in tabToUrl) {
		// check if the property/key is defined in the object itself, not in parent
		if (tabToUrl.hasOwnProperty(tab_Id)) {           
			if (tab_Id == searched_Id){
				continue
			}else if (tabToUrl[tab_Id].includes('focusmate.com')){
				console.log('not the only one')
				return false
			}
		}
	}
	console.log('the only one')
	return true
}