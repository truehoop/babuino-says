 var arrayPosition=1; 

function onLoad(){
	loadPhrasesDiv();
      document.addEventListener("deviceready", onDeviceReady, true);      
      $( "#b-left" ).bind( "click", function(event, ui) {    	  
    	  setDirections("left");
    	});      
      $( "#b-right" ).bind( "click", function(event, ui) {
    	  setDirections("right");
    	});
    	$( "#b-generate" ).bind( "click", function(event, ui) {
    		navigator.notification.vibrate(200);
			navigator.notification.alert("No implemented yet...");
    	});
      generateText();
 }
 function onDeviceReady(){
	 document.addEventListener("menubutton", onMenuKeyDown, false);

 }
 function onMenuKeyDown() {
	 navigator.notification.vibrate(200);
	 navigator.notification.alert("No implemented yet...");
 }

 function generateText(){	  
	  document.getElementById("text-top").innerHTML=
		  document.getElementById("ph-" + arrayPosition + "_0").textContent;
	  document.getElementById("text-bottom").innerHTML=
		  document.getElementById("ph-" + arrayPosition + "_1").textContent;
	  setTextBottomPosition();
 }
 function setDirections(direction){
	 navigator.notification.vibrate(200);
	 switch (direction){
	 case "left":
 		arrayPosition--;
		arrayPosition = 
			arrayPosition < 1 ?  ($("#phrases > div").size() / 2 ) : arrayPosition--;
		 break;
	 case "right":
	 	arrayPosition++;
 		arrayPosition = 
 			arrayPosition > ($("#phrases > div").size() / 2)  ?  1 : arrayPosition++;
		break;
	 }
	 generateText();
 }
 function setTextBottomPosition(){
	 document.getElementById("text-bottom").style.top= 300 -10
	  - document.getElementById("text-bottom").offsetHeight
	  - document.getElementById("text-top").offsetHeight + "px";
 }
 function loadPhrasesDiv(){
	 var req = new XMLHttpRequest();
	 req.open("GET", "html/phrases.html", false);
	 req.send(null);
	 var page = req.responseText;
	 document.getElementById("phrases").innerHTML = page;
 }
