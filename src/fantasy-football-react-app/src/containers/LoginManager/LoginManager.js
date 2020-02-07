import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import axios from 'axios';
import Classes from './loginManager.module.css';


let loginReturnDiv;

const loginUri = 'https://localhost:44385/api/ProfileUser/'

class LoginManager extends Component {
    constructor(props) {
        super(props);
        this.UserLoginHandler = this.UserLoginHandler.bind(this);
        this.state = {
            loginMode: "login",
            loggedIn: false,
            UserId: "",
            UserName: "",
            UserEmail: "",
            UserPassword: "",
            UserPasswordConfirm: ""
        }
    }

    UserLoginHandler = event => {
        event.preventDefault();
        console.log("Email: " + this.state.UserEmail);
        console.log("Password: " + this.state.UserPassword);
        axios.get(loginUri + this.state.UserEmail)
            .then(response => {
                let data = response.data;
                if (response.data !== "") {
                    if (response.data.userPassword === this.state.UserPassword) {
                        this.setState((state,props)=>{
                            return{
                                UserId: data.testUserProfileId,
                                UserName: data.name
                            }
                        })
                        this.props.clickLogin(data);
                        this.props.loggedInHandler();
                        this.props.changeMode(0);
                    }
                    else {
                        alert("invalid Password");
                    }
                }
                else {
                    alert("email not found");
                    this.setState((state,props)=>{ return{loginMode: "register" }})
                }

            })
    }

    UserRegisterHandler = event => {
        event.preventDefault();
        if (this.state.UserPassword === this.state.UserPasswordConfirm) {
            const data = { name: this.state.UserName, email: this.state.UserEmail, password: this.state.UserPassword }
            console.log(data);
            axios.post(loginUri, data)
                .then(response => {
                    let data = response.data;
                    console.log(data)
                    if (response.data !== "") {
                        if (response.data.userPassword === this.state.UserPassword) {
                            this.setState((state,props)=>{
                                return{
                                    UserId: data.testUserProfileId,
                                    UserName: data.name,
                                }

                            })
                            this.props.clickLogin(data);
                            this.props.loggedInHandler();
                            this.props.changeMode(0);
                        }
                        else {
                            alert("User Already Exists and You entered wrong Password");
                        }
                    }
                    else {
                        alert("something went wrong!");
                        this.setState((state,props)=>{return{ loginMode: "register" }})
                    }
                })
        }
        else {
            alert("passwords don't match");
        }
    }


    handleEmailChange = (e) => {
        this.setState({ UserEmail: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ UserPassword: e.target.value });
    }

    handleUserNameChange = (e) => {
        this.setState({ UserName: e.target.value })
    }

    handlePasswordConfirmChange = (e) => {
        this.setState({ UserPasswordConfirm: e.target.value });
    }






    render() {
        if (this.state.loginMode === "login") {
            loginReturnDiv = <div className={Classes.loginBox}><div>
                <h3 className={Classes.red}>Login</h3>
                <form className={Classes.loginForm}>
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
                    <button onClick={(e) => { this.UserLoginHandler(e) }}>Login</button>
                </form>
            </div></div>
        }


        if (this.state.loginMode === "register") {
            loginReturnDiv =
            <div className={Classes.loginBox}> <div>
                    <h3>Register!</h3>
                    <form className={Classes.loginForm}>
                        <label>Name:
                    <input type="text"
                                id="UserName"
                                name="UserName"
                                value={this.state.UserName}
                                onChange={this.handleUserNameChange}
                                required />
                        </label>
                        <label>Email Address:
                    <input type="email"
                                id="UserEmail"
                                value={this.state.UserEmail}
                                onChange={this.handleEmailChange}
                                name="emailAddress"
                                required />
                        </label>
                        <label>Password:
                    <input type="password"
                                id="UserPassword"
                                name="UserPassword"
                                value={this.state.UserPassword}
                                onChange={this.handlePasswordChange}
                                required />
                        </label>
                        <label>Confirm Password:
                    <input type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={this.state.UserPasswordConfirm}
                                onChange={this.handlePasswordConfirmChange}
                                required />
                        </label>
                        <button onClick={(e) => { this.UserRegisterHandler(e) }}> Register</button>

                    </form></div></div>      
            }

        return (
            <Aux>
                <h3>Fantasy Football Login</h3>
                <button onClick={() => this.setState({ loginMode: "login" })}>Login</button>
                <button onClick={() => this.setState({ loginMode: "register" })}>Register</button>
                {loginReturnDiv}
                {/* <br/> */}
            </Aux>
        )
    }
}

export default LoginManager;