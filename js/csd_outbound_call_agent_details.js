var report = document.getElementById('export')
   report.addEventListener('click', csdoutboundCallAgentDetailsExport)

//document.getElementById('clickdate').addEventListener('submit', csdoutboundCallDetails)


function csdoutboundCallAgentDetails() {

    getLoginUser()
    var querystring = window.location.search.substring(1);

    //get username and extension from the query
    var split = querystring.split('&');
    var extension = split[0].split('=');
    var username = split[1].split('=');
    
   document.getElementById('extension').value = extension[1];
   document.getElementById('username').value = username[1];
   document.getElementById('modalextension').value = extension[1];
   document.getElementById('modalusername').value = username[1];
   document.getElementById('agentusername').innerHTML = username[1];


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var tbody = 'csdoutbound_call_details_tbody'
        csdoutboundCallAgentDetailsTable(this.responseText,tbody);
        
      }
    };
   
      var apiquery = `api/csdoutbound/csd_outbound_call_agent_details_api.php?${querystring}`;
      xhttp.open("GET", apiquery  , true);
      xhttp.send();
     
}

function csdoutboundCallAgentDetailsExport() {

    let querystring = window.location.search.substring(1);
    let split = querystring.split('&');
    let extension = split[0].split('=');
    let username = split[1].split('=');
   let startdate = split[2].split('=')[1];
    let enddate = split[3].split('=')[1];
    let tag = split[4].split('=')[1];

     getdate = `(${startdate}) - (${enddate})`
        if(startdate === enddate){
          getdate = startdate
        }

    
    let url = `${HTTPADDR}api/csdoutbound/csd_outbound_call_agent_details_export_api.php?${querystring}`
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        data.options.fileName = `${username}-${getdate}-${tag}-outbound-calldetails`
        Jhxlsx.export(data.tableData, data.options);
    })
}


function csdoutboundCallAgentDetailsTable(res,tbody) {
   var agent_data = JSON.parse(res);  // the parent array  agent call detials and inbound tags array
   var response = agent_data[0];   //array of agent call detials
   var outbound_tags = agent_data[1]; // array of inbound tags of agents
  
   var tagname_select = document.getElementById('tagname')
   
   for(var t=0;t<outbound_tags.length;t++){
        var option_el = document.createElement('option')
        option_el.setAttribute("value",outbound_tags[t])
        var text_node = document.createTextNode(outbound_tags[t])
        option_el.appendChild(text_node)
        tagname_select.appendChild(option_el)
       }

  var active_tbody = document.getElementById(tbody);
  var i;
  for(i=0; i< response.length ; i++){
    //create elements
    var tr =  document.createElement('tr');
    var tdi = document.createElement('td');
    var tdcallednumber = document.createElement('td');
    var tdcaller = document.createElement('td');
    var tdcallstatus = document.createElement('td');
    var tdstarttime = document.createElement('td');
    var tdendtime = document.createElement('td');
    var tdcallduration = document.createElement('td');
    var tdcallrecording = document.createElement('td');
    var linkrecording = document.createElement('AUDIO');
    var tdgetdate = document.createElement('td');
    var btncomment = document.createElement('button');


    //Creating Modal Form
          
        var parentModal = document.createElement('div');
        document.getElementById('main').appendChild(parentModal);
        parentModal.id =  "myModal" + i;
        parentModal.className = "modal";
        var modalDialog = document.createElement('div');
        modalDialog.className = "modal-dialog";
        parentModal.appendChild(modalDialog);

        var modalContent = document.createElement('div');
        modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);

        var modalHeader = document.createElement('div');
        modalHeader.className = "modal-header";
        var modalTitle = document.createElement('h4');
        modalTitle.className = "modal-title";
        modalTitle.textContent = "YOUR COMMENT";
        var modalBtn = document.createElement('button');
        modalBtn.className= "close";
        modalBtn.dataset.dismiss = "modal";
        // modalBtn.textContent = "&times;";
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(modalBtn);
        modalContent.appendChild(modalHeader);


        var modalBody = document.createElement('div');
        modalBody.className = "modal-body";
        var textAreaBody = document.createElement('textarea');
        textAreaBody.id = i + "message";
        textAreaBody.cols = "62";
        textAreaBody.placeholder = "Put Your Comment Here."
        textAreaBody.textContent = response[i].comment;
        //textAreaBody.textContent = response[i].extension + " Channel is Currently Active";
        
        // var outbound_tags = ['MISSED CALL RETURN CALL','DROPPED CALL RETURN CALL','CONSIGNEE CALL',
        //                            'COURIER CALL','FOLLOW UP CALL INQUIRY','FOLLOW UP CALL PAYMENT','FOLLOW UP CALL SHIPMENT',
        //                     'FOLLOW UP CALL COMPLAINT', 'NO TAG']

        var select_tag = document.createElement('SELECT')
       select_tag.setAttribute("id", i+" outbound_select_tag")
       select_tag.style.width = "450px"
       var ptag = document.createElement('p')
       ptag.textContent = "SELECT TAG:"
       ptag.style.padding ="0"
       ptag.style.margin = "0"
       ptag.style.fontWeight = "500"

       for(var t=0;t<outbound_tags.length;t++){
        var option_el = document.createElement('option')
        option_el.setAttribute("value",outbound_tags[t])
        var text_node = document.createTextNode(outbound_tags[t])
        option_el.appendChild(text_node)
        select_tag.appendChild(option_el)
       }
       if(response[i].tag == '' || response[i].tag == 'NO TAG'){
          var option_el = document.createElement('option')
           option_el.setAttribute("value","")
           option_el.disabled = true
           option_el.selected = true
           var text_node = document.createTextNode("Select Tag")
           option_el.appendChild(text_node)
           select_tag.appendChild(option_el)
       }else{
        select_tag.value = response[i].tag
       }

        modalBody.appendChild(textAreaBody)
        modalBody.appendChild(ptag)
        modalBody.appendChild(select_tag)
        modalContent.appendChild(modalBody);

        var modalFooter = document.createElement('div');
        modalFooter.id = response[i].caller + "modalfooter";
        modalFooter.className = "modal-footer";

        var updateBtn = document.createElement('button');
        updateBtn.id = i ;
        updateBtn.className = "btn btn-primary";

       
       // listenBtn.dataset.dismiss = "modal";
        updateBtn.textContent = "Update";
        updateBtn.addEventListener('click', function(e){
            e.preventDefault() 
           var id = e.path[0].id
            var getExistingComment = document.getElementById(id + "message")
            var getExistingTag = document.getElementById(id+ " outbound_select_tag")
           var data = {};
            data.starttimestamp = response[id].starttimestamp;
            data.getdate = response[id].getDate
           data.caller =response[id].caller
           data.comment = getExistingComment.value
           data.tag =  getExistingTag.value
           
            
             fetch(`${HTTPADDR}api/csdoutbound/put_outbound_call_comment_api.php`, {method:'post', body:JSON.stringify(data)})
             .then(response => {
                 return response.json()
              }).then(res => {
                
                  alert(res.message)
                 let params = `caller=${response[id].caller}&getdate=${response[id].getDate}&starttimestamp=${response[id].starttimestamp}`
                 let url = `${HTTPADDR}api/csdoutbound/get_outbound_call_comment_api.php?${params}`
                 console.log(url)
                 return fetch(url)
             }).then(response => 
                {return response.json()}
             ).then(data => {
                  console.log(data)
                let btncomment = document.getElementById(response[id].caller + id);
                
                console.log(btncomment.id)
                if ( data.tag == "" || data.tag == "NO TAG"){
                     btncomment.textContent = "NO TAG";
                     btncomment.className  = "btn btn-outline-info btn-sm text-justify ";
                }else {
                    btncomment.textContent = data.tag;
                    btncomment.className  = "btn btn-info btn-sm text-justify red"
                }
             }).catch(err =>{
                 console.log(err)
             })
             
        })

        modalFooter.appendChild(updateBtn);

        var closeBtn = document.createElement('button');
        closeBtn.id = response[i].caller + "cancel";
        closeBtn.className = "btn btn-danger";
        closeBtn.dataset.dismiss = "modal";
        closeBtn.textContent = "Close";
        closeBtn.addEventListener('click', function(e){
            e.preventDefault();
        })
        modalFooter.appendChild(closeBtn)
        modalContent.appendChild(modalFooter);
        document.getElementById('main').appendChild(parentModal);

    
    
    //put values on the elements
    tdi.textContent = i+1;
    tdcallednumber.textContent = response[i].calledNumber;
    tdcaller.textContent = response[i].caller;
    tdcallstatus.textContent = response[i].callStatus;
    tdstarttime.textContent = response[i].startime;
    tdendtime.textContent = response[i].endtime;
    tdcallduration.textContent = response[i].callDuration;
   // linkrecording.textContent = "Call Recording";
   // linkrecording.href = response[i].callrecording;
    linkrecording.setAttribute("src",response[i].callrecording);
    linkrecording.setAttribute("controls","controls");
    linkrecording.style.width = "130px";
    tdcallrecording.appendChild(linkrecording);
    tdgetdate.textContent = response[i].getDate;
    btncomment.id = response[i].caller + i;
    //Check if commeent is blank
    if(response[i].tag == "" || response[i].tag == "NO TAG"){
        btncomment.textContent = "NO TAG";
        btncomment.className  = "btn btn-outline-info btn-sm text-justify ";
    }else{
        btncomment.textContent = response[i].tag;
        btncomment.className  = "btn btn-info btn-sm text-justify red"
    }

    
    btncomment.style.margin = "5px";
    btncomment.dataset.toggle = "modal";
    btncomment.dataset.target =  "#myModal" + i;
    btncomment.dataset.backdrop = "static";
    btncomment.dataset.keyboard = "false";
 

    //tds to tr

    tr.appendChild(tdi);
    tr.appendChild(tdcaller);
    tr.appendChild(tdcallednumber);
    tr.appendChild(tdcallstatus);
    tr.appendChild(tdstarttime);
    tr.appendChild(tdendtime);
    tr.appendChild(tdcallduration)
    tr.appendChild(tdcallrecording);
    tr.appendChild(tdgetdate);
    tr.appendChild(btncomment);

    //append tr to tbody
    active_tbody.appendChild(tr);
  }
}