

//Element Declaration

const Elements = {
    calltypebtn: document.querySelector('#calltypebtn'),
    blended: document.querySelector('#blended'),
    extension: document.querySelector('#hidden_extension'),
    calltype: document.querySelector('#calltype'),
    index_body: document.querySelector('#index_body'),
    calltypevalue: document.querySelector('#calltypelabel')

}
//at page load IIFE function
{
    getLoginUser();
    
 }
 

 var params = {}
 params.extension = Elements.extension.value;


 fetch(`${HTTPADDR}api/getCalltype.php`, {method:'post', body:JSON.stringify(params)}).then(data =>{
 return data.json()
.then(calltype => {
    
    document.querySelector('#calltypelabel').textContent= calltype;
}) 
 }).catch(err => {
     alert(err);
 })

if(Elements.blended.value === "1"){
    Elements.calltypebtn.style.display = "block";
}else{
    Elements.calltypebtn.style.display = "none";
}

var calltypeValue = document.querySelector('#calltypelabel').textContent;
const modalform = `<div id="myModal" class="modal" style="display: none;" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">CALLTYPE</h4>
										<button class="close" data-dismiss="modal"></button>
									</div>
									<div class="modal-body">
										
										<p style="padding: 0px; margin: 0px; font-weight: 500;">SELECT CALLTYPE:</p>
										<select id="select_calltype" style="width: 450px;">
                                                <option value="collection"  >collection</option>
                                                <option value="csd" >csd</option>
												<option value="${Elements.calltype.value}"  selected>${Elements.calltype.value}</option>
												
										</select>
                                    </div>
                                    <div>
                                         <div id="myProgress">
                                        <div id="myBar"></div>
                                    </div>
									<div id="$odalfooter" class="modal-footer">
										<button id="update" class="btn btn-primary" data-action="update">Update</button>
                                        <button id=cancel" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        
                                       
                                    </div>
									</div>
                                </div>
                                    
							</div>
                        </div>`
                        



Elements.index_body.insertAdjacentHTML("beforeend",modalform);

const progress = () => {
    let myProgress = document.getElementById('myProgress');
    let myBar = document.getElementById('myBar');

    myProgress.style.width = "100%";
    myProgress.style.backgroundColor = "#ddd";

    myBar.style.width = "1%";
    myBar.style.height = "30px";
    myBar.style.backgroundColor = "#04AA6D";


}

progress();

 
//update calltype
 document.getElementById('update').addEventListener('click', (e) => {
    
    var params = {};
    params.extension = Elements.extension.value;
    params.calltype =  document.getElementById('select_calltype').value;
     
     //alert(JSON.stringify(params))

     fetch(`${HTTPADDR}api/collection/updateCallType.php`, {method:'post', body:JSON.stringify(params)})
     .then(response => {
         return response.json()
     }).then(data => {
         alert('Its take 1 minute or two to transfer calltype');
        
        message = JSON.stringify(data.message );
        setTimeout(function(){ 
            
            alert(message); 
            alert('Need to Logout and Login to  effect the changes...');
       
        },100000);
        
        move();
   
     }).catch(err =>{
         console.log(err)
     })


 });

 


function move() {
    var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 1000);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
       
        
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

