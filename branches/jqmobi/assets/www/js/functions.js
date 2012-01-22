/**
 * La posición inicial para obtener los textos
 */
var arrayPosition=1;
/**
 * Verifica que la funcion notification exista (para debugueo en navegador)
 */
var notificationDefined = navigator.notification != null;

var oImgJPEG = null;

/**
 * Obtiene los textos iniciales y agrega los eventos
 */
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
    		
    		generateCanvas();   		  		
    	});
    	$( "#b-share" ).bind( "click", function(event, ui) {
    		$.mobile.changePage("html/menu.html", { transition: "slideup"});
    	});
      getText();
 }

/**
 * Al estar el dispositivo listo, agrega los eventos extras
 */
 function onDeviceReady(){
	 document.addEventListener("menubutton", onMenuKeyDown, false);
 }
 
 /**
  * Evento al presionar el botón menú del dispositivo
  */
 function onMenuKeyDown() {
	 if (notificationDefined)
		 navigator.notification.vibrate(200);
	 generateCanvas();
 }

 /**
  * Obtiene el texto a mostrar 
  */
 function getText(){	  
	 $("#text-top").html($("#ph-" + arrayPosition + "_0").text());
	 $("#text-bottom").html($("#ph-" + arrayPosition + "_1").text());
	  setTextPosition(20);
 }
 
 /**
  * Reposiciona el texto y apaga controles para generar el canvas
  */
 function generateCanvas(){
	 setTextPosition(-5);	 
	 hideDivs();
	 $('body').html2canvas();  
 }
 
 /**
  * La dirección en la que mostrará el siguiente texto
  * @param direction la dirección del botón presionado (izquierda o derecha)
  */
 function setDirections(direction){
	 if (notificationDefined)
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
	 getText();
 }
 
 /**
  * Calcula la posición del texto a desplegar
  * @param extraPx la posición en pixeles del texto inferior 
  */
 function setTextPosition(extraPx){
	 /*Se coloca la posicion del texto inferior*/
	 $("#text-bottom").css("top", $("#background").height() 
			 - $("#text-bottom").height() + extraPx + "px");
	 /*Se calcula la posicion de los textos para colocarlos en medio*/
	 $("#text-top").css("left", 
		 ((document.documentElement.clientWidth / 2) 
			-($("#background").width() / 2)) + "px");
	 $("#text-bottom").css("left", 
		 ((document.documentElement.clientWidth / 2) 
			-($("#background").width() / 2)) + "px");
 }
 
 /**
  * Obtiene el listado de frases a desplegar
  */
 function loadPhrasesDiv(){
	 var req = new XMLHttpRequest();
	 req.open("GET", "html/phrases.html", false);
	 req.send(null);
	 $("#phrases").html(req.responseText);
 }
 
 /**
  * Genera una imagen a partir de un objeto canvas
  * @param oCanvas el objeto canvas del cual se obtiene la imagen
  */
 function saveCanvas(oCanvas){
	 
	 $("#imagen2").html("");
	 oImgJPEG = Canvas2Image.saveAsBMP(oCanvas, true, 300, 300);
	 $("#imagen2").html(oImgJPEG);
	 //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	 $.mobile.hidePageLoadingMsg();
 } 
 
 /**
  * Oculta los divs indicados para que el canvas no los genere
  */
 function hideDivs(){
	 $('#buttons').toggle();
	 $('#title').toggle();
	 $.mobile.hidePageLoadingMsg();
 }
 
 /**
  * Genera el objeto canvas que contendra la imagen a compartir
  */
 
 (function( $ ){
	    $.fn.html2canvas = function(options) {
			$('#canvas').html("");
	        html2canvas.Preload(this[0], $.extend({
	            complete: function(images){
	                var queue = html2canvas.Parse(this[0], images, options),
	                $canvas = $(html2canvas.Renderer(queue, options));           
	          	    $('#canvas').html($canvas);
	          	    hideDivs();	          	  
	        	  	setTextPosition(20);
	        	  	saveCanvas($("#canvas").children()[0]);	        	  	
	            }
	        }, options));	       
	    };
	})( jQuery );
 /*
 function gotFS(fileSystem) {
	 console.log("quiere obtener el archivo");
     fileSystem.root.getFile("Pictures/sbabuino.bmp", {create: true}, gotFileEntry, fail);
 }

 function gotFileEntry(fileEntry) {
	 console.log("obtuvo el archivo");
     fileEntry.createWriter(gotFileWriter, fail);
 }

 function gotFileWriter(writer) {
     writer.onwrite = function(evt) {
         console.log("write success");
     };
     writer.write(oImgJPEG);
 }

 function fail(error) {
     console.log(error.code);
 }
*/