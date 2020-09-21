import elements from '../views/base';
import axios from 'axios';
import APIADD from '../config';

export default class User {
    constructor(){
        this.extension;
        this.secret;
    }
     checkIfLogin() {

        this.jwt = this.getCookie('jwt')
        if (this.jwt != ''){
          this.jwt = true;
        }else{
            this.jwt = false;
        }
       
     }
      async userlogin () {
       
        // let credentials = {};
        // credentials.extension = extension
        // credentials.secret = secret
       try{
            const res = await axios({
                url: `${APIADD}/login.php`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    extension: this.extension,
                    secret: this.secret
                }
            })
            this.setCookie("jwt",res.jwt,1);
            return true;
        }catch(error){
            alert('User is not exist or Invalid Password' )
             
        }
      }
     getLoginUser() {
            
        let jwt = this.getCookie('jwt');
          
        if (jwt === ''){
              window.location.href = `#login`;
        }else{
          
             this.token = JSON.parse(decodeToken(jwt));
       
        }
    }

     
    // function to set cookie
     setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
     }

   // get or read cookie
    getCookie (cname){
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' '){
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
   }

    decodeToken(token){
         var playload = atob(token.split('.')[1]);
        return playload;

     };

}