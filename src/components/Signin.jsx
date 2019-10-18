import React, { Component } from 'react'
import "../App.css"
import axios from "axios"

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    })

    // validate the form was filled out 
    Object.values(rest).forEach(val => {
        val === null && (valid = false)
    })
    return valid

}
export default class Signin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            globalFormError: false,
            token: "",
            formErrors: {
                email: "",
                password: ""
            }
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        if (formValid(this.state)) {
            this.setState({ globalFormError: false })
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post(`/api/login`, { user })
                .then(res => {
                    this.setState({
                        token: res.data.token
                    })
                    this.setToken(res.data.token)
                    this.props.history.push("/");

                }).catch((res, err) => {
                    console.log(err)
                })
        } else {
            this.setState({ globalFormError: true })
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE")
        }
    }

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
    };



    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {

            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };
    render() {

        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create Account</h1>
                    <span className="error-form"> {this.state.globalFormError ? "*fill out the form well  please" : ""}</span><br></br>
                    <form onSubmit={this.handleSubmit} noValidate>

                        <div className="email">
                            <label htmlFor="email"><b>Email</b></label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password"><b>Password</b></label>
                            <input
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Sign In</button>
                            <small>
                                Don't have an Account?<a href="http://127.0.0.1:3000/signup">here</a></small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
