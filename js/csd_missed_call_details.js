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
      var tddate = document.createElement('td');
      
      
      //put values on the elements
      tdi.textContent = i+1;
      tdstarttime.textContent = response[i].startime;
      tdendtime.textContent = response[i].endtime;
      tdcaller.textContent = response[i].caller;
      tdcallstatus.textContent = response[i].callStatus;
      tddate.textContent = response[i].getdate;
      

      //tds to tr
      tr.appendChild(tdi)
      tr.appendChild(tdstarttime);
      tr.appendChild(tdendtime);
      tr.appendChild(tdcaller);
      tr.appendChild(tdcallstatus);
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
 

