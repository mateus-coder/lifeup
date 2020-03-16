const listeners = {
    jumpTrue : false,
    keyPressed : "Any",
    createEventListener : () => {
        document.addEventListener("keydown", listeners["callBackDown"], false);
        document.addEventListener("keyup", listeners["callBackUp"], false);
    },
    callBackDown  : (e) => {
        let keyPress = e.key;
        listeners["keyPressed"] = keyPress;
        if(keyPress === " " && !listeners["jumpTrue"]){
            listeners["jumpTrue"] = true;
        }
    },
    callBackUp : (e) => {
        listeners["keyPressed"] = "Null";
    }
}