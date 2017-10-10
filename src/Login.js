import React, { Component } from "react";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  login() {
    fetch({
      url: "/authenticate",
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(userInfo => console.log(userInfo));
  }

  render() {
    return (
      <div>
        Username{" "}
        <input onChange={e => this.setState({ username: e.target.value })} />
        Password{" "}
        <input
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button onClick={() => this.login()}>Login </button>
      </div>
    );
  }
}
