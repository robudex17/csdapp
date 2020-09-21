 import elements from './base'

export const title = `<title>Login Page</title>`;

 const loginform = ` <div class="login-box">
                <img src="images/sbtlogo.png" alt="Logo Here" class="avatar">
                <h1>Login Here</h1>
                <form id="login_form">
                    <p>Extension</p>
                    <input type="text" name="extension" id="extension" placeholder="Enter Extension">
                    <p>Secret</p>
                    <input type="password" name="secret" id="secret" placeholder="Enter Secret">
                    
                    <input type="submit" name="submit" id="" value="Login">
                    <a href="#">CSD MONITORING APP</a>
                </form>
            </div>`

export const clearBody = () => document.body.innerHTML = ''

export  const loginpage = () => {
    document.body.insertAdjacentHTML('afterbegin', loginform)
}




