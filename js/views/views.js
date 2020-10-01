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
							<a href="csd_inbound_call_agent_details.php?extension=6308&amp;username=JM&amp;startdate=2020-10-02&amp;enddate=2020-10-02&amp;tagname=all">2020-10-02</a>
						</td>
					</tr>
				  `			
		elements.call_summary_body.insertAdjacentHTML('beforeend', markup)		  
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

