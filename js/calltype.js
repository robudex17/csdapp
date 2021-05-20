getLoginUser()

var calltype = document.getElementById('calltype');
var blended = document.getElementById('blended').value;

alert(blended);
if(blended === 1 ){
    calltype.style.display = "block";
}else{
    calltype.style.display = "none";
}

