
document.getElementById('gen_metrics').addEventListener('click', function(e){
    alert('This Function is not yet available');
})
document.getElementById('addbtn').addEventListener('click', function(e){
   
   addTag()
});


function addTag() {
    var data = {};
    var username = document.getElementById('user').textContent ;
    var d = new Date()
    var month = d.getMonth()+1
    var year = d.getFullYear()
    var day = d.getDate()
     createddate = `${year}-${month}-${day}`
     data.tagtype = document.getElementById('addTag').tagtype.value ;
     data.tagname = document.getElementById('addTag').tagname.value;
     data.createdby = username;
     data.createddate = createddate;


  
    
    //call fetch function

    fetch(`${HTTPADDR}api/create_tag.php`, { method: 'post', body:JSON.stringify(data)} )
    .then(response => {
        response = response.json();
        return response;
        alert(response)
    }).then(response => {
       //alert(JSON.stringify(data.message)) 
       var message
        message = JSON.stringify(response.message)
        //create data to send to log
        var event_data = {};
        event_data.action = 'CREATE TAG';
        event_data.performed_by = username;
        event_data.description = `NEW TAG WAS ADDED FOR:${data.tagtype} tagname:${data.tagname}  was added by ${username}`
        fetch(`${HTTPADDR}api/create_event_log.php`, { method: 'post', body:JSON.stringify(event_data)})
        .then(() => {
             alert(message);
             location.reload();
        })

    }).catch(err => alert("Cannot Add Tag that already added."))

}




function getAllTags() {
	getLoginUser();
    var position = document.getElementById('position').value;
     if(position != 1) {
        document.getElementById('add_tag').disabled = true;
    }

	fetch(`${HTTPADDR}api/tag_manage.php`)
	.then(data => {
		data = data.json();
		return data
      //  console.log(data)
	}).then(data =>
		putToTable(data)
        
	)
    .catch(err => console.log(err))
}


function putToTable(data){
   var position = document.getElementById('position').value;  
  console.log(data)
  for (var i= 0; i< data.length; i++) {
            //creat element
            var tr = document.createElement('tr')
            var thi = document.createElement('th');
            var tdtagtype = document.createElement('td')
            var tdtagname = document.createElement('td')
            var tdcreatedby = document.createElement('td')
            var tdcreateddate = document.createElement('td')
            var actDelete = document.createElement('button')
            var tdAction = document.createElement('td')

            
            tdtagtype.textContent = data[i].tagtype
            if(tdtagtype.textContent == 'CSDINBOUND'){
                tdtagtype.style.color = "green";
                tdtagtype.style.fontWeight = "700"
            }
            if(tdtagtype.textContent == 'CSDOUTBOUND'){
                tdtagtype.style.color = "blue";
                tdtagtype.style.fontWeight = "700"
            }
            if(tdtagtype.textContent == 'COLLECTION'){
                tdtagtype.style.color = "RED";
                tdtagtype.style.fontWeight = "700"
            }
            tdtagname.textContent = data[i].tagname
            tdcreatedby.textContent = data[i].createdby
             tdcreateddate.textContent = data[i].createddate
             actDelete.textContent = 'Delete'
            actDelete.className ="btn btn-danger btn-sm font-weight-normal lead";
          // actDelete.style.margin = "4px";
        actDelete.id = data[i].tagId;
        
        //disable delete button if credentials is agent
        if(position != 1) {
                actDelete.disabled = true;
            }
        actDelete.addEventListener('click',function(e){
            var username = document.getElementById('user').textContent ;
            var message;
           var params  = {};
            params.tagId = this.id;
            if(confirm(`Are you sure you want delete ${this.id} Tag? `)){
                 fetch(`${HTTPADDR}api/delete_tag.php`, {method:'post', body:JSON.stringify(params)})
             .then(response => {
                 return response.json()
             }).then(data => {
                    message = JSON.stringify(data.message)
                
                  //create data to send to log
                    var event_data = {};
                    event_data.action = 'DELETE TAG';
                    event_data.performed_by = username;
                    event_data.description = `TAG ID ${params.tagId} Deleted by ${username}`
                    fetch(`${HTTPADDR}api/create_event_log.php`, { method: 'post', body:JSON.stringify(event_data)})
                    .then(() => {
                         alert(message);
                         location.reload();
                    })
             }).catch(err =>{
                 console.log(err)
                 location.reload();
             })
            }
            
           
        })
        
        tdAction.appendChild(actDelete)

    
        tr.appendChild(tdtagtype);
        tr.appendChild(tdtagname)
        tr.appendChild(tdcreatedby)
        tr.appendChild(tdcreateddate)
        tr.appendChild(tdAction)
        document.getElementById('tag_tbody').appendChild(tr)

    }

}