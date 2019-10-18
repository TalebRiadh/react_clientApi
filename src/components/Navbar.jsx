import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Signup from "./Signup";
import Signin from "./Signin";


import Home from "./Home";
const Navbar = () => {
    return (

        <div>
            <Router>
                <ul>
                    <img className="logo" src="TsaRAPI.svg" />
                    <li><NavLink exact={true} activeClassName='active' to="/">Home</NavLink ></li>
                    <li className="signup"><NavLink activeClassName='active' to="/signup">SignUp</NavLink ></li>
                    <li className="signup"><NavLink activeClassName='active' to="/signin">SignIn</NavLink ></li>

                </ul>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/signin" component={Signin} />

                </Switch>
            </Router>
        </div>
    )
}

export default Navbar
