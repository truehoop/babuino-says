 var phrases=[["vamos por unas burras", "¿o nomas puros amigos?"],
              ["tres","cuatro"],
              ["cinco","seis"]];
 var arrayPosition=0; 

function onLoad(){
      document.addEventListener("deviceready", onDeviceReady, true);      
      $( "#b-left" ).bind( "click", function(event, ui) {
    	  setDirections("left");
    	  generateText();
    	});      
      $( "#b-right" ).bind( "click", function(event, ui) {
    	  setDirections("right");
    	  generateText();
    	});
      generateText();
 }
 function onDeviceReady(){
      //navigator.notification.alert("PhoneGap is working");
 }
 function generateText(){	  
	  document.getElementById("text-top").innerHTML=phrases[arrayPosition][0];
	  document.getElementById("text-bottom").innerHTML=phrases[arrayPosition][1];
	  setTextBottomPosition();
 }
 function setDirections(direction){
	 if (direction=="left"){
		 arrayPosition--;
		 arrayPosition = 
		 		arrayPosition < 0 ?  (phrases.length -1 ) : arrayPosition--;
		 }
	 if (direction=="right"){
		 arrayPosition++;
		 arrayPosition = 
	 		arrayPosition > (phrases.length -1)  ?  0 : arrayPosition++;
	 }
 }
 function setTextBottomPosition(){
	 document.getElementById("text-bottom").style.top= 300 -10
	  - document.getElementById("text-bottom").offsetHeight
	  - document.getElementById("text-top").offsetHeight + "px";
 }
