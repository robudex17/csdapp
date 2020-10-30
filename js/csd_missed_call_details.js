var report = document.getElementById('missedcalls_export')
   report.addEventListener('click', csdMissedCallsDetailsExport)


function getMissedDetails(){
  getLoginUser()
  var option = '&option=details';
  var querystring = window.location.search.substring(1) + option;

   var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var tbody = 'missed_calls_details-body'
     
      missedCallDetailsTable(this.responseText,tbody);
      
    }
  };
  if(querystring !== ''){
    var apiquery = `api/csdinbound/csd_inbound_missed_calls_details_api.php?${querystring}`;
    xhttp.open("GET", apiquery  , true);
    xhttp.send();
  }else {
    xhttp.open("GET", "api/csdinbound/csd_inbound_missed_calls_details_api.php", true);
    xhttp.send();
  }
 
}


 function limitRecipeTitle(comment, limit = 30)  {
  var newComment = [];
  if (comment.length > limit) {
      comment.split(' ').reduce((acc, cur) => {
          if (acc + cur.length <= limit) {
              newComment.push(cur);
          }
          return acc + cur.length;
      }, 0);

      // return the result
      return `${newComment.join(' ')} ...`;
  }
  return comment;
}

function missedCallDetailsTable(res,tbody) {
  var response = JSON.parse(res);

  var active_tbody = document.getElementById(tbody);   
    if(response.message === "No Records Found"){
      //create elements
      var tr =  document.createElement('tr');
      var tdmessage = document.createElement('td');

      tdmessage.textContent = response.message;
      tr.appendChild(tdmessage);

      //append tr to tbody
      active_tbody.appendChild(tr);

    }else{
    
    var i;
    for(i=0; i< response.length ; i++){
      //create elements
      var tr =  document.createElement('tr');
      var tdi = document.createElement('td');
      var tdstarttime = document.createElement('td');
      var tdendtime = document.createElement('td');
      var tdcaller = document.createElement('td');
      var tdcallstatus = document.createElement('td');
      var tdcomment = document.createElement('td');
      var btncomment = document.createElement('button');
      var tdcommentby = document.createElement('td');
      var tddate = document.createElement('td');
      tdcomment.appendChild(btncomment);
     

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
      
    
       modalBody.appendChild(textAreaBody)
       modalContent.appendChild(modalBody)

       var modalFooter = document.createElement('div');
       modalFooter.id = response[i].extension + "modalfooter";
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
           var username = document.getElementById('user').textContent
          
          var data = {};
          data.tag =  "NO TAG";
          data.starttimestamp = response[id].starttimestamp;
          data.getdate = response[id].getdate
          data.whoansweredcall =   response[id].extension; //"NONE"
          data.comment = getExistingComment.value
          data.commentby = username
          if(data.comment == ""){
            data.commentby = ""
          }
        
           console.log(data)
            fetch(`${HTTPADDR}api/csdinbound/put_inbound_call_comment_api.php`, {method:'post', body:JSON.stringify(data)})
            .then(response => {
                return response.json()
            }).then(res => {
               
                 alert(res.message)
                let params = `extension=${data.whoansweredcall}&getdate=${response[id].getdate}&starttimestamp=${response[id].starttimestamp}`
                console.log(params)
                let url = `${HTTPADDR}api/csdinbound/get_inbound_call_comment_api.php?${params}`
                return fetch(url)
            }).then(response => 
               {return response.json()}
            ).then(data => {
                 console.log(data)
               let btncomment = document.getElementById(response[id].caller + id);
               let tdcommentby =  document.getElementById(username + id);
               
               console.log(btncomment.id)
               if (data.comment == "" || data.comment =="No comment"){
                    btncomment.textContent = "No Comment"
                    btncomment.className  = "btn btn-outline-info btn-sm text-justify ";
                    tdcommentby.textContent = "";
               }else {
                   btncomment.textContent = limitRecipeTitle(data.comment);
                   btncomment.className  = "btn btn-info btn-sm text-justify red"
                   tdcommentby.textContent = data.commentby;
               }
            }).catch(err =>{
                console.log(err)
            })
       })

       modalFooter.appendChild(updateBtn);

       var closeBtn = document.createElement('button');
       closeBtn.id = response[i].extension + "cancel";
       closeBtn.className = "btn btn-danger";
       closeBtn.dataset.dismiss = "modal";
       closeBtn.textContent = "Close";
       closeBtn.addEventListener('click', function(e){
           e.preventDefault() ;
       })
       modalFooter.appendChild(closeBtn)
       modalContent.appendChild(modalFooter);
       document.getElementById('main').appendChild(parentModal);
      
      
      //put values on the elements
      tdi.textContent = i+1;
      tdstarttime.textContent = response[i].startime;
      tdendtime.textContent = response[i].endtime;
      tdcaller.textContent = response[i].caller;
      tdcallstatus.textContent = response[i].callStatus;
      btncomment.textContent = limitRecipeTitle(response[i].comment);
      tdcommentby.textContent = response[i].commentby;
      tddate.textContent = response[i].getdate;

      
      
      var username = document.getElementById('user').textContent
      tdcommentby.id = username + i
     
      btncomment.id = response[i].caller + i;
      //Check if commeent is blank
      if( response[i].comment == "" ){
          btncomment.textContent = "No Comment";
          btncomment.className  = "btn btn-outline-info btn-sm text-justify ";
          
      }else{
          btncomment.textContent = limitRecipeTitle(response[i].comment);
          btncomment.className  = "btn btn-info btn-sm text-justify red"
      }
  
      
      btncomment.style.margin = "5px";
      btncomment.dataset.toggle = "modal";
      btncomment.dataset.target =  "#myModal" + i;
      btncomment.dataset.backdrop = "static";
      btncomment.dataset.keyboard = "false";
  

      //tds to tr
      tr.appendChild(tdi)
      tr.appendChild(tdstarttime);
      tr.appendChild(tdendtime);
      tr.appendChild(tdcaller);
      tr.appendChild(tdcallstatus);
      tr.appendChild(tdcomment);
      tr.appendChild(tdcommentby);
      tr.appendChild(tddate);
      

      //append tr to tbody
      active_tbody.appendChild(tr);
    }
  }
}

function csdMissedCallsDetailsExport (){
  var querystring = window.location.search.substring(1);
   let split = querystring.split('&');
   let startdate = split[0].split('=')[1];
    let enddate = split[1].split('=')[1];


    getdate = `(${startdate}) - (${enddate})`
   if(startdate === enddate){
          getdate = startdate
    }

  let url = `${HTTPADDR}api/csdinbound/csd_inbound_missed_calls_details_export_api.php?${querystring}`
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        data.options.fileName = `${getdate}--csd-missed-calldetails`
        Jhxlsx.export(data.tableData, data.options);
    })
  
  }
 

