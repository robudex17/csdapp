
//at page load IIFE function
{
    getLoginUser();
    
 }
 
//Element Declaration

const Elements = {
    calltypebtn: document.querySelector('#calltypebtn'),
    blended: document.querySelector('#blended'),
    extension: document.querySelector('#hidden_extension'),
    calltype: document.querySelector('#calltype'),
    index_body: document.querySelector('#index_body')  

}


if(Elements.blended.value === "1"){
    Elements.calltypebtn.style.display = "block";
}else{
    Elements.calltypebtn.style.display = "none";
}

alert(Elements.calltype.value);
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




