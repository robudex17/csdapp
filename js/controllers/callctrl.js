import CALL from "../../js/models/call.js"
import * as agentViews from  "../../js/views/views.js"
import { elements }  from  "../../js/views/elements.js"

//at page load IIFE function
{
	getLoginUser();
 }
 

//get Summary
let  querystring = window.location.search.substring(1)
const call = new CALL("", " ", " ", elements.type.value)
call.callSummary(querystring).then(dataSummary => {
    //Put to views
    const callSummary = dataSummary[0];
    callSummary.forEach((agentSummary, id)=>{
        agentViews.agentCallSummary(agentSummary,id)
    })
    const tags = dataSummary[1];

    tags.forEach(tag => {
        agentViews.tags(tag)
    })
    
})