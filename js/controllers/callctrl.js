import CALL from "../../js/models/call.js"
import * as Views from  "../../js/views/views.js"
import { elements }  from  "../../js/views/elements.js"

//at page load IIFE function
{
    getLoginUser();
    
 }
 

//get Summary
let  querystring = window.location.search.substring(1)
const call = new CALL("", " ", " ", elements.type.value)
if(elements.type.value === "csdinbound" || elements.type.value === "csdoutbound" || elements.type.value === "collection"){
    call.callSummary(querystring).then(dataSummary => {
        //Put to views
        const callSummary = dataSummary[0];
        callSummary.forEach((agentSummary, id)=>{
            Views.agentCallSummary(agentSummary,id)
        })
        const tags = dataSummary[1];
    
        tags.forEach(tag => {
            Views.tags(tag)
        })
        
    })
    let summary_export =  call.summaryExport();
 
    document.querySelector(`#${summary_export.type}`).addEventListener('click', (e) => {
        e.preventDefault();
        let callSummary;
        call.callSummary(querystring).then(dataSummary => {
        //Put to views
        callSummary = dataSummary[0];
        return fetch(summary_export.jsonfile);        
        }).then(res => {
        return res.json();
        }).then(resobj => {
            callSummary.forEach((agentSummary) =>{
                let inbound_summary = []; 
                let extension = { text: agentSummary.extension};
                let name = { text: agentSummary.name};
                let total_counts = { text: agentSummary.total_counts};
                let total_duration = { text: agentSummary.total_duration};
                let getdate = { text: agentSummary.getdate};
                inbound_summary.push(extension);
                inbound_summary.push(name);
                inbound_summary.push(total_counts);
                inbound_summary.push(total_duration);
                inbound_summary.push(getdate);
                resobj.tableData[0].data.push(inbound_summary);
            })
            resobj.options.fileName = `${summary_export.type}-${callSummary[0].getdate}-summary`
            Jhxlsx.export(resobj.tableData, resobj.options);
        })
    
    })
    
}

if(elements.type.value === "csdinbounddetails" || elements.type.value ==="csdoutbounddetails" || elements.type.value === "collectiondetails"){
    //get agentname from querystring and display to the view
    elements.agentname.innerHTML = querystring.split('&')[1].split('=')[1];

    //get agentname from querystring and assign 
    elements.modalextension.value = querystring.split('&')[0].split('=')[1];
    elements.modalname.value = querystring.split('&')[1].split('=')[1];
    
    call.callAgentDetails(querystring).then(dataDetails => {
        //Put to views
        const agentsCallDetails = dataDetails[0];
        const tags = dataDetails[1]
        let id ;
      
        agentsCallDetails.forEach((agent,id) =>{
            Views.agentCallDetails(elements.type.value,agent,id,tags)
        })

         //Event Delagation Section
        modaltagcomment.addEventListener('click', (e) => {
            e.preventDefault();
            //PUT OR UPDATE TAG OR COMMENT
            if(e.target.dataset.action){
                id = e.path[0].id
               
                let getExistingComment = document.getElementById(id + "message")
                let getExistingTag = document.getElementById(id+"select_tag")
                let username = document.getElementById('user').textContent
                let data = {};
                data.starttimestamp = agentsCallDetails[id].starttimestamp;
                data.getdate = agentsCallDetails[id].getDate
                data.whoansweredcall = agentsCallDetails[id].extension
                data.caller = agentsCallDetails[id].caller
                data.comment = getExistingComment.value
                data.commentby = username
                data.tag =  getExistingTag.value

               
                call.updateTagComment(data)
                    .then(res => {
                        alert(res.message);
                        let params = `extension=${agentsCallDetails[id].extension}&getdate=${agentsCallDetails[id].getDate}&starttimestamp=${agentsCallDetails[id].starttimestamp}`
                        return call.getTagComment(params);
                    }).then(data => {
                        let btncomment = document.getElementById(agentsCallDetails[id].extension+id);
                        console.log(btncomment)
                        if (data.tag == "" || data.tag == "NO TAG"){
                            btncomment.textContent = "NO TAG"
                            btncomment.className  = "btn btn-outline-info btn-sm text-justify ";
                        }else {
                            btncomment.textContent = data.tag;
                            btncomment.className  = "btn btn-info btn-sm text-justify red"
                        }
                
                
                    }).catch(err => console.log(err))
            }
        })    

    })
    
    //details calls export
    let details_export = call.detailsExport();

    document.querySelector(`#${details_export.type}`).addEventListener('click', e => {
        e.preventDefault();
        let agentCallDetails;
        call.callAgentDetails(querystring).then(dataDetails => {
            agentCallDetails = dataDetails[0];
           
            return fetch(details_export.jsonfile);
        })
        .then(res => {
            return res.json();
        })
        .then(resobj => {
               console.log(resobj)
                agentCallDetails.forEach(agent => {
                    let agentarray = [];
                    let name = { text: agent.name}
                    let extension = { text: agent.extension}
                    let calledNumber = { text: agent.calledNumber}
                    let caller = { text : agent.caller}
                    let callStatus = { text: agent.callStatus}
                    let startime = { text: agent.startime}
                    let endtime = {text: agent.endtime}
                    let callDuration = {text: agent.callDuration}
                    let callrecording = { text: agent.callrecording}
                    let getDate = { text: agent.getDate }
                    let comment = { text: agent.comment}
                    let tag = { text: agent.tag }
                    
                    agentarray.push(name)
                    agentarray.push(extension)
                    agentarray.push(calledNumber)
                    agentarray.push(caller)
                    agentarray.push(callStatus)
                    agentarray.push(startime)
                    agentarray.push(endtime)
                    agentarray.push(callDuration)
                    agentarray.push(callrecording)
                    agentarray.push(getDate)
                    agentarray.push(comment)
                    agentarray.push(tag)
                    resobj.tableData[0].data.push(agentarray);
                })
            resobj.options.fileName = `${agentCallDetails[0].name}-(${agentCallDetails[0].getDate})-calldetails`
            Jhxlsx.export(resobj.tableData, resobj.options);
        })
    })
    
}


