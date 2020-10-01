  import CSD from "../../js/models/csd.js"
  import * as agentViews from  "../../js/views/views.js"
  import { elements }  from  "../../js/views/elements.js"

  //at page load IIFE function
  {
	getLoginUser();
  }
 
//1.) Get the current existing agents
	const allAgents =  new CSD ();
	allAgents.getAgents(elements.type.value).then(agents => {
		 agents.forEach((agent,id) =>{
		 	agentViews.agentHtml(agent,id)
		 })

	}) .catch(err => console.log(err));

	//Event Delagation Section
	document.querySelector("#main").addEventListener('click', (e) =>{
		e.preventDefault();
		//ADDING AGENTS
		if(e.target.matches('#addbtn')){
			//1. get the Input in views
			const newAgent = agentViews.getNewAgent()
			console.log(newAgent)
			//2.create new Instance of CSD and save the new agent
			const csd = new CSD(newAgent.name, newAgent.extension, newAgent.email);
			csd.createAgent(elements.type.value)
			.then(res => {
					alert(res.message)
					return csd.getAgents(elements.type.value)
			}).then(agents => {
				//clear table
					agentViews.clearTable()
				//3. output the new agents to the views
					agents.forEach((agent,id) => {
						agentViews.agentHtml(agent,id)	   
					})

			}).catch(err => {
				alert (err)
			}) 
		
		}
		//UPDATE AGENT
		if(e.target.id.includes('update')){
			let getExtension = e.target.id.split("-")[1]
			let name = document.querySelector(`#name-${getExtension}`).value; 
			let email = document.querySelector(`#email-${getExtension}`).value;
			updateAgent(name,getExtension,email)
		}
        //DELETEING AGENT
		if(e.target.id.includes('delete')){
			let getExtension = e.target.id.split("-")[1];
			deleteAgent(getExtension)
		}

	})

    function updateAgent(name,extension,email){
		const Agent = new CSD (name,extension, email);
		Agent.updateAgent(elements.type.value).then(res => {
			alert(res.message)
			return Agent.getAgents(elements.type.value)
		}).then(agents =>{
			  //clear table
			  agentViews.clearTable()
			  //2. output the new agents to the views
			  agents.forEach((agent,id) => {
					agentViews.agentHtml(agent,id)	   
			  })
		}).catch(err =>{
			alert(err.message)
		})
	}

	function deleteAgent(extension){
		const Agent = new CSD("",extension,"")
		//Delete the agent
		if(confirm(`Are you sure you want delete ${extension} Agent? Deleting Agent will automatically delete Agent Records as well`)){
			Agent.deleteAgent(elements.type.value)
			.then(res =>{
				alert(res.message)
				return Agent.getAgents(elements.type.value)
			}).then(agents => {
				 //clear table
				 agentViews.clearTable()
				 //2. output the new agents to the views
				 agents.forEach((agent,id) => {
					   agentViews.agentHtml(agent,id)	   
				 })
			}

			).catch(err => {
				alert(err.message)
			})
		}
		
	}







