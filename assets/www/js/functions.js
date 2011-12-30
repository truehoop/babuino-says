 var arrayPosition=1; 

function onLoad(){
	loadPhrasesDiv();
      document.addEventListener("deviceready", onDeviceReady, true);      
      $( "#b-left" ).bind( "click", function(event, ui) {
    	  setDirections("left");
    	  generateText();    	  	
    	});      
      $( "#b-right" ).bind( "click", function(event, ui) {
    	  setDirections("right");
    	  generateText();
    	});
    	$( "#b-generate" ).bind( "click", function(event, ui) {
			navigator.notification.alert("No implemented yet...");
    	});
      generateText();
 }
 function onDeviceReady(){
      
 }
 function generateText(){	  
	  document.getElementById("text-top").innerHTML=
		  document.getElementById("ph-" + arrayPosition + "_0").textContent;
	  document.getElementById("text-bottom").innerHTML=
		  document.getElementById("ph-" + arrayPosition + "_1").textContent;
	  setTextBottomPosition();
 }
 function setDirections(direction){
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
