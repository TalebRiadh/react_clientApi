import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {
    constructor() {
        super();
        //Set default message
        this.state = {
            message: 'Loading...'
        }
    }
    componentDidMount() {
        axios.get(`/api`)
            .then(res =>
                this.setState({ message: res.data.message }))
    }

    render() {
        return (
            <div>
                <h1><b>Home</b></h1>
                <h1><small>{this.state.message}</small></h1>
            </div>
        );
    }

}