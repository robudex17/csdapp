
import User from './models/User';
import * as userViews from './views/userViews';
import elements from './views/base'




window.addEventListener('load', (event) => {
    const user = new User();
    user.checkIfLogin();
    console.log(user.jwt)
    if(user.jwt){
        window.location.href = "#"
    }else{
        userViews.clearBody();
        userViews.loginpage();
       

        document.getElementById("login_form").addEventListener('submit', async (event) => {
            event.preventDefault();
            user.extension = document.getElementById("login_form").extension.value;
            user.secret = document.getElementById("login_form").secret.value;
            try {
              const succes = await user.userlogin()
              if(succes){
                  window.location.href = "#active"
              }

            }catch(error){
                alert(error)
            }
        })
    }
  });


