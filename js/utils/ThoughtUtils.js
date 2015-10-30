var apiUrl = 'http://www.thinkingaboutbatman.com/thought';


function preloadImg (src) {
 	function loadimg (res, rej) {
 		var img=new Image();
    img.onload = res;
    img.onerror = rej;
    img.src=src;
 	}
 	return new Promise (loadimg);
}

function getJson (url) {
	return new Promise(function (res, rej) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    var data = JSON.parse(request.responseText);
		    res(data);
		  } 
		  else {
		  	rej(request);
		  }
		};
		request.onerror = function() {
			rej(request);
		};
		request.send();
	});
}


export default { getJson, preloadImg, apiUrl };