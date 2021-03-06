
var report = document.getElementById('inbound_summary_export').addEventListener('click', getCsdInboundCallSummaryExport)

// document.getElementById('date_form').addEventListener("submit", getCallSummary);


function getCsdInboundCallSummaryExport(){
  var querystring = window.location.search.substring(1);
  var d = new Date();
  var months = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12" ];
   var getmonth = months[d.getMonth()];
   var getdate = `${d.getFullYear()}-${getmonth}-${d.getDate()}`;
   console.log(getdate)
  var url = `${HTTPADDR }api/csdinbound/csd_inbound_call_summary_export_api.php`;
  if (querystring !== ''){
       url = `${HTTPADDR}api/csdinbound/csd_inbound_call_summary_export_api.php?${querystring}`;
       var splitquery = querystring.split('&');
       var startdate = splitquery[0].split('=')[1];
       var enddate = splitquery[1].split('=')[1]
        getdate = `(${startdate}) - (${enddate})`
        if(startdate === enddate){
          getdate = startdate
        }

  }
  fetch(url).then(response => {
        return response.json();
    }).then(data => {
        data.options.fileName = `inbound_call_summary-${getdate}-calldetails`
        Jhxlsx.export(data.tableData, data.options);
    })
}

function getCsdInboundCallSummary(){
  getLoginUser()
  var querystring = window.location.search.substring(1)
 
  //var querydate = document.getElementById('date_form').getdate.value;
   var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var tbody = 'call-summary-body'
      csdInboundCallSummaryTable(this.responseText,tbody);
      
    }
  };
  if(querystring !== ''){
    var apiquery = `api/csdinbound/csd_inbound_call_summary_api.php?${querystring}`;
    xhttp.open("GET", apiquery  , true);
    xhttp.send();
  }else {
    xhttp.open("GET", "api/csdinbound/csd_inbound_call_summary_api.php", true);
    xhttp.send();
  }
 
}

function csdInboundCallSummaryTable(res,tbody) {
  var active_tbody = document.getElementById(tbody);
   // the parent array inbound call summary and inbound tags array
   var summary_data = JSON.parse(res);
   // check if there is only on object in the array meaning it contain only error message
  
   if(summary_data.length < 2){
       
     //create elements
      var tr =  document.createElement('tr');
      var tdmessage = document.createElement('td');

      tdmessage.textContent = summary_data[0].message;
      tr.appendChild(tdmessage);

      //append tr to tbody
      active_tbody.appendChild(tr);
     
   }else{
       var response = summary_data[0];   //array of inbound call summmary
      var inbound_tags = summary_data[1]; // array of inbound tags of agents
   
  

     var select_tag = document.getElementById('tagname')
       
      
       for(var t=0;t<inbound_tags.length;t++){
        var option_el = document.createElement('option')
        option_el.setAttribute("value",inbound_tags[t])
        var text_node = document.createTextNode(inbound_tags[t])
        option_el.appendChild(text_node)
        select_tag.appendChild(option_el)
       }

    var i;
    for(i=0; i< response.length ; i++){
      //create elements
      var tr =  document.createElement('tr');
      var tdi = document.createElement('td');
      var tdname = document.createElement('td');
      var tdextension = document.createElement('td');
      var tdtotal_answered = document.createElement('td');
      var tdtotal_duration = document.createElement('td');
      var linkdate = document.createElement('a');
      var tddate = document.createElement('td');
      
      
      //put values on the elements
      tdi.textContent = i+1;
      tdextension.textContent = response[i].extension;
      tdname.textContent = response[i].name;
      tdtotal_answered.textContent = response[i].total_counts;
      tdtotal_duration.textContent = response[i].total_duration;
      linkdate.href = response[i].call_details;
      linkdate.textContent = response[i].getdate
      tddate.appendChild(linkdate)

      //tds to tr

      tr.appendChild(tdi);
      tr.appendChild(tdextension);
      tr.appendChild(tdname);
      tr.appendChild(tdtotal_answered);
      tr.appendChild(tdtotal_duration);
      tr.appendChild(tddate);

      //append tr to tbody
      active_tbody.appendChild(tr);
    }
  }
}