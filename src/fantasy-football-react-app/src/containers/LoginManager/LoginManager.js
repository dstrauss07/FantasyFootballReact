import React, { Component } from 'react';
import Aux from '../../hoc/Aux'


let loginReturnDiv;

class LoginManager extends Component {
    state = {
        loginMode: "login"
    }


    render() {
        if(this.state.loginMode == "login")
        {
            loginReturnDiv = <div> 
                <h3>Login!</h3>
                <form>
                    <label>Email Address:
                        <input type ="text" name="emailAddress"/>
                    </label>
                    <label>Password:
                        <input type ="text" name="password"/>
                                           </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        }

        if(this.state.loginMode == "register")
        {
            loginReturnDiv = 
            <div> 
            <h3>Register!</h3>
            <form>
                <label>Name:
                    <input type ="text" name="name"/>
                </label>
                <label>Email Address:
                    <input type ="text" name="emailAddress"/>
                </label>
                <label>Password:
                    <input type ="text" name="password"/>
                </label>
                <label>Confirm Password:
                    <input type ="text" name="confirmpassword"/>
                </label>
                <input type="submit" value="Submit" />

            </form>
        </div>
        }
    
        return (
            <Aux>
                <h3>Fantasy Football Login</h3>
                <button onClick={()=>this.setState({loginMode: "login"})}>Login</button>
                <button onClick={()=>this.setState({loginMode: "register"})}>Register</button>
                {loginReturnDiv}
            </Aux>
        )
    }
}

export default LoginManager;