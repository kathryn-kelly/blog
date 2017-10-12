import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

class User extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  user() {
    fetch({
      url: "/api/authenticate",
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(userInfo => console.log(userInfo));
  }

  render() {
    return (
      <div>
        <h4>
          Username: {" "}
          <input onChange={e => this.setState({ username: e.target.value })} />
          Password: {" "}
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />{" "}
          <Link to="/playlists">
            <button onClick={e => this.user()}> Login</button>{" "}
          </Link>
        </h4>
        <h4>
          Username: {" "}
          <input onChange={e => this.setState({ username: e.target.value })} />
          Password: {" "}
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Link to="/playlists">
            <button onClick={e => this.user()}> Sign up</button>
          </Link>
        </h4>
      </div>
    );
  }
}

export default User;
