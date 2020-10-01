

import CSD from './models/csd.js';

//get all agents
let allAgents = new CSD();

//allAgents.getAgents();

    const response =  async fetch(`${HTTPADDR}api/csd_manage.php`);

   const res = await response.json()
 
   
   console.log(res)



