

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
									<div id="$odalfooter" class="modal-footer">
										<button id="update" class="btn btn-primary" data-action="update">Update</button>
										<button id=cancel" class="btn btn-danger" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
                        </div>`
                        



	Elements.index_body.insertAdjacentHTML("beforeend",modalform);


 
//update calltype
 document.getElementById('update').addEventListener('click', (e) => {
    //   document.getElementById('udpate').disabled = true;
    //   document.getElementById('cancel').disabled = true;
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
        //     document.getElementById('udpate').disabled = false;
        //    document.getElementById('cancel').disabled = false;
        },180000);
       
        //location.reload();
   
     }).catch(err =>{
         console.log(err)
     })


 });


