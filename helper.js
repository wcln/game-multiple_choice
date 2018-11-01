// HELPER FUNCTIONS

/*
* Toggles mute variable. Called from HTML button.
*/
function toggleMute() {

  let muteImage = document.getElementById("mute-btn");

 if (mute == true) {
   mute = false;
 } else {
   mute = true;
 }

 if (mute == true) {
   muteImage.src = "images/mute.png";
 } else {
   muteImage.src = "images/unmute.png";
 }
}

/**
* Shuffles array in place.
* @param {Array} a items The array containing the items.
*/
function shuffle(a) {
   var j, x, i;
   for (i = a.length; i; i--) {
       j = Math.floor(Math.random() * i);
       x = a[i - 1];
       a[i - 1] = a[j];
       a[j] = x;
   }
}

/*
* Plays a sound if the game is not muted.
*/
function playSound(sound) {
 if (mute == false) {
   sound.play();
 }
}
