import React from "react";

function CapsLock() {

    // var input = document.getElementById("myInput");
    // var text = document.getElementById("text");
    // input.addEventListener("keyup", function(event) {
    // if (event.getModifierState("CapsLock")) {
    //     text.style.display = "block";
    //   } else {
    //     text.style.display = "none" } });

return(
<div>
<h3>Detect Caps Lock</h3>
<p>Press the "Caps Lock" key inside the input field to trigger the function.</p>
<input id="myInput" value="Some text..">
<p id="text">WARNING! Caps lock is ON.</p>
</input>
</div>
)
}

export default CapsLock;