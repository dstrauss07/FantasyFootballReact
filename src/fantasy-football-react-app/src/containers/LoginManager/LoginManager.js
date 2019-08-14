import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';


let loginReturnDiv;

const loginUri = 'https://localhost:44385/api/ProfileUser/'

class LoginManager extends Component {


    constructor() {
        super();
        this.UserLoginHandler = this.UserLoginHandler.bind(this);
        this.state = {
            loginMode: "login",
            loggedIn: false,
            UserId: "",
            UserName: "",
            UserEmail: "",
            UserPassword: ""
        }
    }

    UserLoginHandler = event => {
        event.preventDefault();
        console.log("Email: " + this.state.UserEmail);
        console.log("Password: " + this.state.UserPassword);
        axios.get(loginUri + this.state.UserEmail)
            .then(response => {
                let data = response.data;
            if(response.data != "")
            {
                if(response.data.userPassword == this.state.UserPassword)
                {
                    this.setState({
                        UserId: data.testUserProfileId,
                        UserName: data.name,
                        loggedIn: true
                    })
                    this.props.clickLogin(data);
                }
                else
                {
                    alert("invalid Password");
                }
            }
            else
            {
                alert("email not found");
            }

                })

    }
    

    handleEmailChange = (e) => {
        this.setState({UserEmail: e.target.value});
     }
     
     handlePasswordChange =(e) => {
        this.setState({UserPassword: e.target.value});
     }


    render() {
        if (this.state.loginMode == "login") {
            loginReturnDiv = <div>
                <h3>Login!</h3>
                <form>
                    <label htmlFor="UserEmail">Email Address: </label>
                    <input type="email"
                        id="UserEmail"
                        name="UserEmail"
                        value={this.state.UserEmail}
                        onChange={this.handleEmailChange}
                        required />
                    <label htmlFor="UserPassword">Password: </label>
                    <input type="text" 
                    id="UserPassword" 
                    name="UserPassword" 
                    value={this.state.UserPassword} 
                    onChange={this.handlePasswordChange} />
                    <button onClick={(e)=> {this.UserLoginHandler(e)}}>Login</button>
                </form>
            </div>
}


        if (this.state.loginMode == "register") {
            loginReturnDiv =
                <div>
                    <h3>Register!</h3>
                    <form>
                        <label>Name:
                    <input type="text" name="name" />
                        </label>
                        <label>Email Address:
                    <input type="text" name="emailAddress" />
                        </label>
                        <label>Password:
                    <input type="text" name="password" />
                        </label>
                        <label>Confirm Password:
                    <input type="text" name="confirmpassword" />
                        </label>
                        <input type="submit" value="Submit" />

                    </form>
                </div>
        }

        return (
            <Aux>
                <h3>Fantasy Football Login</h3>
                <button onClick={() => this.setState({ loginMode: "login" })}>Login</button>
                <button onClick={() => this.setState({ loginMode: "register" })}>Register</button>
                {loginReturnDiv}
            </Aux>
        )
    }
}

export default LoginManager;