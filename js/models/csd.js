
export default class CSD {
    constructor(agent ="", extension="" , email =""){
        this.extension = extension;
        this.agent = agent;
        this.email = email;
        
    }

    async createAgent(type){
        let apiPath;
        if(type == "csdAgent"){
            apiPath = `${HTTPADDR}api/create_csd_agent.php`;
        }else if(type == "collectionAgent"){
           apiPath = `${HTTPADDR}api/collection/create_collection_agent_api.php`
        }else{
            throw new Error('Missing type argument')
        }
        console.log(apiPath)
        let data = {
            name: this.agent,
            extension: this.extension,
            email : this.email
        }
        const response = await fetch(apiPath,{method:'POST', body:JSON.stringify(data)})
        if(response.status !== 201){
            throw new Error('Cannot Add extension that already added.')
        }else{
            const res = response.json();
            return res; 
        }

      
    }
    async getAgents(type){
         let apiPath;
         if(type === 'csdAgent' ){
            apiPath = `${HTTPADDR}api/csd_manage.php`
         }else if(type === 'collectionAgent') {
             apiPath = `${HTTPADDR}api/collection/collection_get_all_collection_agent_api.php`
         }else{
            throw new Error('Missing agent Type argument')
         }
         const response = await fetch(apiPath);
         if(response.status !== 200){
           
              throw new Error('Cannot Access the API')
         }else{
             
             const agents = await response.json();
           
             return agents;
              
         }
      
    }
    async updateAgent(type){
        let apiPath;
        if(type === 'csdAgent'){
            apiPath = `${HTTPADDR}api/updatecsd.php`
        }else if(type === 'collectionAgent'){
            apiPath = `${HTTPADDR}/api/collection/update_collection_agent_api.php`
        }else{
            throw new Error('Missing type argument')
        }

        let data = {
            name: this.agent,
            extension: this.extension,
            email : this.email
        }
        const response = await fetch(apiPath,{ method:'POST', body: JSON.stringify(data)});
        
        if(response.status !== 200){
            throw new Error('Unable to update agent')
        }

        const res = response.json()
        return res

    }
    async deleteAgent(type){
        let apiPath;
        if(type === 'csdAgent'){
            apiPath = `${HTTPADDR}api/delete_csd.php`
        }else if(type === 'collectionAgent'){
            apiPath = `${HTTPADDR}api/collection/delete_collection_agent_api.php`
        }else{
            throw new Error('Missing type argument')
        }

        let data = { 
            extension: this.extension, 
        }

        const response = await fetch(apiPath,{ method:'DELETE', body: JSON.stringify(data)});
        
        if(response.status !== 200){
            throw new Error('Cannot Delete Agent')
        }
        const res = response.json()
        return res

    }

    createTag(){

    }

    deleteTag(tagId){

    }
    
}