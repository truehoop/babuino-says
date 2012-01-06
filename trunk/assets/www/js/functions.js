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
    		onMenuKeyDown();
    	});
      generateText();
 }
 function onDeviceReady(){
	 document.addEventListener("menubutton", onMenuKeyDown, false);
 }
 function onMenuKeyDown() {
	 navigator.notification.vibrate(200);
	 navigator.notification.alert("Pr&oacute;ximamente...");
 }

 function generateText(){	  
	 $("#text-top").html($("#ph-" + arrayPosition + "_0").text());
	 $("#text-bottom").html($("#ph-" + arrayPosition + "_1").text());
	  setTextPosition();
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
 function setTextPosition(){
	 /*Se coloca la posicion del texto inferior*/
	 $("#text-bottom").css("top", $("#imagen").height() 
			 - $("#text-bottom").height() + 20 + "px");
	 /*Se calcula la posicion de los textos para colocarlos en medio*/
	 $("#text-top").css("left", 
		 ((document.documentElement.clientWidth / 2) 
			-($("#imagen").width() / 2)) + "px");
	 $("#text-bottom").css("left", 
		 ((document.documentElement.clientWidth / 2) 
			-($("#imagen").width() / 2)) + "px");
 }
 function loadPhrasesDiv(){
	 var req = new XMLHttpRequest();
	 req.open("GET", "html/phrases.html", false);
	 req.send(null);
	 $("#phrases").html(req.responseText);
 }
