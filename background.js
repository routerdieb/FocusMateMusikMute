// Background script

//dict for mapping
var tabToUrl = {};
chrome.tabs.onRemoved.addListener(close_check_tab);

/*************************************************
		    Listeners and responses
**************************************************/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Note: this event is fired twice:
    // Once with `changeInfo.status` = "loading" and another time with "complete"
	if (tabId in tabToUrl && tabToUrl[tabId].includes('focusmate.com')){
		if (!tab.url.includes('focusmate.com')){
			// check_only_focusmate(tabId)
			// todo: remove these
			console.log('hohey');
		}
	}
    tabToUrl[tabId] = tab.url;
	if (check_only_focusmate(-1)){
		turn_On_Sound();
	}
});


try
{
    chrome.runtime.onMessage.addListener(
		async function(request, sender) {
			if (request.type == "muteType"){
				if (request.status == "false"){
					turn_Off_Sound();
				}else{
					turn_On_Sound();
				}
			}
		}
	);
}catch(err){}

function returnMessage(messageToReturn)
{
	chrome.tabs.getSelected(null, 
		function(tab) 
		{
			var joinedMessage = messageToReturn + backgroundScriptMessage;  
			chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
		}
	);
}

function close_check_tab(tabId, removed) {
	url = tabToUrl[tabId];
	url = ''+url;
	if (url.includes("focusmate.com/session") && check_only_focusmate(tabId))
	{
		turn_On_Sound();
	}
	delete tabToUrl[tabId];
}

function check_only_focusmate(searched_Id){
	for (var tab_Id in tabToUrl) {
		// check if the property/key is defined in the object itself, not in parent
		if (tabToUrl.hasOwnProperty(tab_Id)) {           
			if (tab_Id == searched_Id){
				continue;
			}else if (tabToUrl[tab_Id].includes('focusmate.com/session')){
				return false;
			}
		}
	}
	return true;
}

/*
 Control sound
*/

function turn_Off_Sound() 
{
	chrome.tabs.query({url: []}, 
		function (tabs) {
			for (var i = 0; i < tabs.length; i++) {
				var mutedInfo = tabs[i].mutedInfo;
				if (mutedInfo){
					//console.log('turn_off',tabs[i].url)
					if (!tabs[i].url.includes("focusmate.com")){
						chrome.tabs.update(tabs[i].id, {"muted": true});
					}else{
						//if musik playing disable sound of partner
						chrome.tabs.update(tabs[i].id, {"muted": false});
					}
				}
			}
		}
	)
}

function turn_On_Sound() {
	chrome.tabs.query({url: []}, function (tabs)
	{
		for (var i = 0; i < tabs.length; i++) {
			var mutedInfo = tabs[i].mutedInfo;
			if (mutedInfo){
				//console.log('turn_on',tabs[i].url)
				if (!tabs[i].url.includes("focusmate.com")){
					chrome.tabs.update(tabs[i].id, {"muted": false});
				}
			}
		}
	})
}



