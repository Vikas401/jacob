import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/images/Zenty Logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isWrong: false,
      isClick: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (
      (this.state.userName != "ZentymentAdmin" &&
        this.state.password === "6tXFtUFE@2t(q#q-") ||
      (this.state.password != "6tXFtUFE@2t(q#q-" &&
        this.state.userName === "ZentymentAdmin") ||
      (this.state.password != "6tXFtUFE@2t(q#q-" &&
        this.state.userName != "ZentymentAdmin")
    ) {
      this.setState({
        isWrong: true,
      });
    } else if (
      this.state.userName === "ZentymentAdmin" &&
      this.state.password === "6tXFtUFE@2t(q#q-"
    ) {
      this.setState({
        isWrong: false,
      });
      localStorage.setItem("users", JSON.stringify(this.state.userName));
      window.location.href = "/dashboard";
    }
  };

  handleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  render() {
     console.log(this.state.isLoggedIn)
    return (
      <div class="container login">
        <div class="d-flex justify-content-center h-100">
          <div
            class="card"
            style={
              this.state.isWrong ? { height: "450px" } : { height: "400px" }
            }
          >
            <div class="card-header">
              <img src={logo} />
            </div>
            <div class="card-body">
              <form onSubmit={this.onSubmit}>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    placeholder="username"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "username")}
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="password"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "password")}
                  />
                </div>
                {this.state.isWrong && (
                  <div>
                    <span style={{ color: "crimson" }}>
                      The username or password you have entered is not correct,
                      please try again.
                    </span>
                  </div>
                )}
                <div class="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btn float-right login_btn"
                    value="Sign in"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
