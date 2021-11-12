import React, { Component } from 'react'
import axios from 'axios'
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ""};
    }
    componentDidMount = () => {
        axios.get('/welcome').then((res) => {
            console.log(res);
            this.setState({
                message: res.data
            });
        });
    };
    
    render() {
        return (
            <div>
                <h1>{ this.state.message }</h1>
            </div>
        )
    }
}
