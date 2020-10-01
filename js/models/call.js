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
}