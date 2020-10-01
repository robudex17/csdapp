
var report = document.getElementById('collection_summary_export').addEventListener('click', getCollectionCallSummaryExport)
// document.getElementById('form_date').addEventListener("submit", getCollectionCallSummary);


function getCollectionCallSummaryExport(){
  var querystring = window.location.search.substring(1);
  var d = new Date();
  var months = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12" ];
   var getmonth = months[d.getMonth()];
   var getdate = `${d.getFullYear()}-${getmonth}-${d.getDate()}`;
  
  var url = `${HTTPADDR}api/collection/collection_call_summary_export_api.php`;
  if (querystring !== ''){
       url = `${HTTPADDR}api/collection/collection_call_summary_export_api.php?${querystring}`;
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
        data.options.fileName = `collection_call_summary-${getdate}-calldetails`
        Jhxlsx.export(data.tableData, data.options);
    })
}

function getCollectionCallSummary(){
  getLoginUser()
  var querystring = window.location.search.substring(1)
  // var querydate = document.getElementById('form_date').getdate.value;
   var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var tbody = 'collection_summary'
     callCollectionCallSummaryTable(this.responseText,tbody);
      
    }
  };
  if(querystring !== ''){
    var apiquery = `api/collection/collection_call_summary_api.php?${querystring}`;
    xhttp.open("GET", apiquery  , true);
    xhttp.send();
  }else {
    xhttp.open("GET", "api/collection/collection_call_summary_api.php", true);
    xhttp.send();
  }
 
}

function callCollectionCallSummaryTable(res,tbody) {
 
   var summary_data = JSON.parse(res);   // the parent array collection call summary and collection tags array
    var response = summary_data[0];   //array of collection call summmary
    var collection_tags = summary_data[1]; // array of outbound tags of agents

    var select_tag = document.getElementById('tagname')
       
    
       for(var t=0;t<collection_tags.length;t++){
        var option_el = document.createElement('option')
        option_el.setAttribute("value",collection_tags[t])
        var text_node = document.createTextNode(collection_tags[t])
        option_el.appendChild(text_node)
        select_tag.appendChild(option_el)
       }


  var collection_tbody = document.getElementById(tbody);   
    if(response.message === "No Records Found"){
      //create elements
      var tr =  document.createElement('tr');
      var tdmessage = document.createElement('td');

      tdmessage.textContent = response.message;
      tr.appendChild(tdmessage);

      //append tr to tbody
      collection_tbody.appendChild(tr);

    }else{
    
    var i;
    for(i=0; i< response.length ; i++){
      //create elements
      var tr =  document.createElement('tr');
      var tdi = document.createElement('td');
      var tdname = document.createElement('td');
      var tdextension = document.createElement('td');
      var tdtotalmadecalls = document.createElement('td');
      var tdtotal_duration = document.createElement('td');
      var linkdate = document.createElement('a');
      var tddate = document.createElement('td');
      
      
      //put values on the elements
      tdi.textContent = i+1;
      tdextension.textContent = response[i].extension;
      tdname.textContent = response[i].name;
      tdtotalmadecalls.textContent = response[i].total_counts;
      tdtotal_duration.textContent = response[i].total_duration;
     linkdate.href = response[i].call_details;
      linkdate.textContent = response[i].getdate;
      tddate.appendChild(linkdate)
      
      //tds to tr

      tr.appendChild(tdi);
      tr.appendChild(tdextension);
      tr.appendChild(tdname);
      tr.appendChild(tdtotalmadecalls);
      tr.appendChild(tdtotal_duration);
      tr.appendChild(tddate);

      //append tr to tbody
      collection_tbody.appendChild(tr);
    }
  }
}