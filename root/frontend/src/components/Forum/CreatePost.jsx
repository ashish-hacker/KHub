import React, { Component } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";

const customStyle = {
    marginTop: 10,
    
}
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      email: "",
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    Axios.post("http://localhost:4001/api/posts/", {
      author: this.state.author,
      email: this.state.email,
      text: this.state.text,
    })
      .then((res) => {
        if (res) console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  handleChange(e) {
    if (e.target.name === "name") {
      this.setState({ author: e.target.value });
    } else if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "text") {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={customStyle} >Name </label>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1" style={customStyle}>
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label style={customStyle}>Text </label>
          <input
            type="text"
            placeholder="Write Here"
            name="text"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          style={customStyle}
        >
          Submit
        </Button>
        {/* <button type="submit">Submit</button> */}
      </form>
    );
  }
}
