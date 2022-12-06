
//Init
$(document).ready(function() {
    if (location.hostname == "focusmate.daily.co"){
        //console.log("focusmate")
        console.log('starting')
        setInterval(checkClicked,200)
    }else{
        console.log("Something went wrong")
		console.log(location.hostname)
    }
});

function detect_muteBtn() {
    return $('.robots-btn-mic-mute').length==1
}

function detect_unmuteBtn() {
    return $('.robots-btn-mic-unmute').length==1
}

//things are named, from an focusmate perspective.
function checkClicked(){
    if (detect_muteBtn()) {
        chrome.runtime.sendMessage({type: "muteType",status:"false"});
    }
    
    if(detect_unmuteBtn()){
        chrome.runtime.sendMessage({type: "muteType",status:"true"});
    }
}