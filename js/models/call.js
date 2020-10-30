import CSD from './csd.js'

export default class CALL extends CSD {
    constructor(agent="", extension="", email="", type){
        super()
        this.agent = agent;
        this.extension = extension;
        this.type = type;
    }
   async callSummary(queryString){
        let apiPath;
        if(this.type ==="csdinbound"){
            apiPath = `${HTTPADDR}api/csdinbound/csd_inbound_call_summary_api.php?${queryString}`;
        }else if(this.type === "csdoutbound"){
            apiPath = `${HTTPADDR}api/csdoutbound/csd_outbound_call_summary_api.php?${queryString}`;
        }else if(this.type === "collection"){
            apiPath =`${HTTPADDR}api/collection/collection_call_summary_api.php?${queryString}`;
        }else{
            throw new Error('Missing Type argument');
        }

       const response = await fetch(apiPath);
       if(response.status !== 200){
           throw new Error('Cannot Acces the API');
       }
       const summary = response.json();
       return summary

    }

    async callAgentDetails(queryString) {
        let apiPath;
        if(this.type ==="csdinbounddetails"){
            apiPath = `${HTTPADDR}api/csdinbound/csd_inbound_call_agent_details_api.php?${queryString}`;
        }else if(this.type === "csdoutbounddetails"){
            apiPath = `${HTTPADDR}api/csdoutbound/csd_outbound_call_agent_details_api.php?${queryString}`;
        }else if(this.type === "collectiondetails"){
            apiPath =`${HTTPADDR}api/collection/collection_call_agent_details_api.php?${queryString}`;
        }else{
            throw new Error('Missing Type argument');
        }

       const response = await fetch(apiPath);
       if(response.status !== 200){
           throw new Error('Cannot Acces the API');
       }
       const agentcalldetails = response.json();
       return agentcalldetails;
    }

    async updateTagComment(data){
        let apiPath;
        if(this.type ==="csdinbounddetails"){
            apiPath = `${HTTPADDR}api/csdinbound/put_inbound_call_comment_api.php`;
        }else if(this.type === "csdoutbounddetails"){
            apiPath = `${HTTPADDR}api/csdinbound/put_inbound_call_comment_api.php`;
        }else if(this.type === "collectiondetails"){
            apiPath =`${HTTPADDR}api/collection/put_collection_call_comment_api.php`;
        }else{
            throw new Error('Missing Type argument');
        }

       const response = await fetch(apiPath,{method:'post', body:JSON.stringify(data)});
       console.log(response.status)
       if(response.status !== 200 ){
           throw new Error('Cannot Acces the API');
       }
       const res = response.json();
       return res;

       
    }
    async getTagComment(params){
        let apiPath;
        if(this.type ==="csdinbounddetails"){
            apiPath = `${HTTPADDR}api/csdinbound/get_inbound_call_comment_api.php?${params}`;
        }else if(this.type === "csdoutbounddetails"){
            apiPath = `${HTTPADDR}api/csdoutbound/get_outbound_call_comment_api.php?${params}`;
        }else if(this.type === "collectiondetails"){
            apiPath =`${HTTPADDR}api/collection/get_collection_call_comment_api.php?${params}`;
        }else{
            throw new Error('Missing Type argument');
        }

       const response = await fetch(apiPath);
       if(response.status !== 200){
           throw new Error('Cannot Acces the API');
       }
       const data = response.json();
       return data;
    }

    summaryExport(){
        if(this.type ==="csdinbound"){
            return {type:'inbound_summary_export',jsonfile:`${HTTPADDR}json/inbound_summary.json`}
        }else if(this.type === "csdoutbound"){
            return {type:'outbound_summary_export',jsonfile:`${HTTPADDR}json/outbound_summary.json`}
        }else if(this.type ==="collection"){ 
            
            return { type:'collection_summary_export',jsonfile:`${HTTPADDR}json/collection_summary.json`}
        }else{
            throw new Error('Missing Type argument');
        }
    }

    detailsExport(){
        if(this.type ==="csdinbounddetails"){
            return {type:'inbound_details_export',jsonfile:`${HTTPADDR}json/inbound_call_details.json`}
        }else if(this.type === "csdoutbounddetails"){
            return {type:'outbound_details_export',jsonfile:`${HTTPADDR}json/outbound_call_details.json`}
        }else if(this.type ==="collectiondetails"){ 
            return {type:'collection_details_export',jsonfile:`${HTTPADDR}json/collection_call_details.json`}
        }else{
            throw new Error('Missing Type argument');
        }
    }
}