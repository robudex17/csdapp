
const HTTPADDR = "http://103.5.6.2/sbtph_csd_dev/";
setInterval(function() {
  getTotalCounts()
},5000)

function getTotalCounts() {
  fetch(`${HTTPADDR}api/get_total_counts.php`).then(res => {
    return res.json();
  }).then(counts => {
     var miss_calls_counts = document.getElementById('miss_calls_counts');
      miss_calls_counts.textContent = `(${counts.total_missed_calls})`
      miss_calls_counts.style.font = " bold 20px arial,serif";

      var parked_calls_counts = document.getElementById('parked_calls_counts');
      parked_calls_counts.textContent = `(${counts.parked_calls})`;
      parked_calls_counts.style.font = " bold 20px arial,serif";

      var voicemail_counts = document.getElementById('voicemail_counts');
      voicemail_counts.textContent = `(${counts.voicemail_counts})`;
      voicemail_counts.style.font = " bold 20px arial,serif";

  })
}
function logout() {
  alert('logout');
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete the jwt cookie
  window.location.reload();
}

function alreadyLogin() {

  var jwt = getCookie('jwt',function(jwt){
  	 if (jwt != ''){
     window.location.href = HTTPADDR
    }
  })  
}

function getLoginUser() {
  
   getCookie('jwt', function(jwt){
	   	if (jwt === ''){
	    window.location.href = `${HTTPADDR}login.php`;
	  }else{
	    getTotalCounts()
      var token = JSON.parse(decodeToken(jwt));
      console.log(token.data);
	    document.getElementById('user').textContent = token.data.name;
	    document.getElementById('hidden_extension').value = token.data.extension;
	    document.getElementById('position').value  = token.data.position;
           
      document.getElementById('blended').value = token.data.blended;
       document.getElementById('calltype').value = token.data.calltype;
   
	  }
  });

  
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname,callback){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            callback(c.substring(name.length, c.length));
        }else{
        	callback("")
        }
    }
    
}
function decodeToken(token){
  var playload = atob(token.split('.')[1]);
    return playload;

};


