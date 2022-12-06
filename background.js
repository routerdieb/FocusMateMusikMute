console.log('background worker started')
var focus_mate_tabs = []


try{
    chrome.runtime.onMessage.addListener(async function(request, sender) {
		console.log("sender.tab.id")
		console.log(sender.tab.id)
        if (request.type == "muteType"){
            console.log("recieved muteType")
            console.log(request.status)
			focus_mate_tabs.push(sender.tab.id)
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
  alert("Background script is sending a message to contentscript:'" + joinedMessage +"'");
  chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
 });
}

function turn_Off_Sound() {
  chrome.tabs.query({url: []}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var mutedInfo = tabs[i].mutedInfo;
	  if (tabs[i].id in focus_mate_tabs){}
	  else{
		if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": true});
	  }
    }
})}

function turn_On_Sound() {
  chrome.tabs.query({url: []}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var mutedInfo = tabs[i].mutedInfo;
      if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": false});
    }
})}