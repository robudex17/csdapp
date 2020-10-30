import { elements } from './elements.js'

export const clearTable = () => {
	elements.csd_body.innerHTML = ''
}
export const agentHtml = (agent,id) => {
		   const markup =
				 `<tr>
	                <th>${id+1}</th>
		                <td class="lead text-justify">${agent.extension}</td>
		                <td class=" lead text-justify">${agent.name}</td>
		                <td class="text-primary lead text-justify">${agent.email}</td>
		                <td>
	                  <button class="btn btn-primary btn-sm font-weight-normal lead" data-toggle="modal" data-target="#myModal${agent.extension}" data-backdrop="static" data-keyboard="false" style="margin: 0px 5px;">Update</button>
	                  <button class="btn btn-danger btn-sm font-weight-normal lead" id="delete-${agent.extension}" data-toggle="modal">Delete</button></td>
	         	  </tr>`
	        const modalAgent = `
					       <div id="myModal${agent.extension}" class="modal">
				            <div class="modal-dialog">
				              <div class="modal-content">
				                <div class="modal-header">
				                  <h4 class="modal-title">Update Agent Info</h4>
				                  <button class="close" data-dismiss="modal"></button>
				                </div>
								<div class="modal-body">
								<form method="POST" id="updateForm-${agent.extension}">
				                  <label>Name:</label>
				                  <input id="name-${agent.extension}"type="text" class="form-control lead" placeholder="Agent Name" value=${agent.name}>
				                  <label>Extension:</label>
				                  <p id="0extension" class="form-control lead bg-dark text-success">${agent.extension}</p>
				                  <label>Email:</label>
				                  <input id="email-${agent.extension}"  type="email" class="form-control lead" placeholder="Agent Email" value=${agent.email}>
				                </div>
				                <div id="${agent.extension}modalfooter" class="modal-footer">
				                  <button id="update-${agent.extension}" class="btn btn-primary">Update</button>
				                  <button id="cancel-${agent.extension}" class="btn btn-danger" data-dismiss="modal">Close</button>
								</div>
								</form>
				              </div>
				            </div>
				          </div>
	                    `
	             elements.csd_body.insertAdjacentHTML('beforeend', markup);
	             elements.main.insertAdjacentHTML('beforeend', modalAgent);

		}
export const agentCallSummary = (agentCallSummary,id) =>{
	const markup = `<tr>
						<td>${id+1}</td>
						<td>${agentCallSummary.extension}</td>
						<td>${agentCallSummary.name}</td>
						<td>${agentCallSummary.total_counts}</td>
						<td>${agentCallSummary.total_duration}</td>
						<td>
							<a href="${agentCallSummary.call_details}">${agentCallSummary.getdate}</a>
						</td>
					</tr>
				  `			
		elements.call_summary_body.insertAdjacentHTML('beforeend', markup)		  
	}

export const agentCallDetails =(type,agent, id,tags) => {
	let markup ;
		markup = `<tr>
					<td>${id+1}</td>
					<td ${type !=='csdinbounddetails' ? 'style="display:none;"':''}>${agent.extension}</td>
					<td>${agent.calledNumber}</td>
					<td>${agent.caller}</td>
					<td>${agent.callStatus}</td>
					<td>${agent.startime}</td>
					<td>${agent.endtime}</td>
					<td>${agent.callDuration}</td>
					<td>
						<audio src="${agent.callrecording}" controls="controls" style="width: 130px;"></audio>
					</td>
					<td>${agent.getDate}</td>
					<td>
						<button id="${agent.extension}${id}" class=" ${agent.tag ==="" || agent.tag === "NO TAG" ? 'btn btn-outline-info btn-sm text-justify' : 'btn btn-info btn-sm text-justify red' } " data-toggle="modal" data-target="#myModal${id}" data-backdrop="static" data-keyboard="false" style="margin: 5px;">
							${agent.tag ==="" || agent.tag === "NO TAG" ? 'NO TAG' : `${agent.tag}`} 
						</button>
					</td>
				</tr>`

	const modalform = `<div id="myModal${id}" class="modal" style="display: none;" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">YOUR COMMENT</h4>
										<button class="close" data-dismiss="modal"></button>
									</div>
									<div class="modal-body">
										<textarea id="${id}message" cols="62" placeholder="Put Your Comment Here.">${agent.comment}</textarea>
										<p style="padding: 0px; margin: 0px; font-weight: 500;">SELECT TAG:</p>
										<select id="${id}select_tag" style="width: 450px;">
                                            ${tags.map((tag)=> {
										  		return `<option value="${tag}">${tag}</option>`
											})}
										
											${agent.tag === "" || agent.tag ==="NO TAG" ? 
											    '<option value="" selected disabled>SELECT TAG</option>': 
												`<option value="${agent.tag}"  selected>${agent.tag}</option>`}
												
										</select>
									</div>
									<div id="${agent.extension}modalfooter" class="modal-footer">
										<button id="${id}" class="btn btn-primary" data-action="update">Update</button>
										<button id=${agent.extension}cancel" class="btn btn-danger" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>`

	elements.call_detail_body.insertAdjacentHTML('beforeend', markup);
	elements.modaltagcomment.insertAdjacentHTML("beforeend",modalform);
}
 export const tags = (tag) => {
	const markup = ` <option value="${tag}">${tag}</option>`
	elements.tagname.insertAdjacentHTML('beforeend', markup);
 }

 
		
 export const getNewAgent = () => {
	 return {
		 name: elements.addAgentFrom.name.value,
		 extension: elements.addAgentFrom.extension.value,
		 email: elements.addAgentFrom.email.value
	 }
 }

