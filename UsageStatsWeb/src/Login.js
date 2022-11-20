import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login p-10 ">
      <h1 className="m-4">Log in</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        {/* <label for="email">
          Email</label> */}
          <input className="m-3" name="email" type="email" id="email" placeholder="Email" />
        
        {/* <label>
          Password</label> */}
          <input name="password" type="password" placeholder="Password" />
        
        <button type="submit" className="m-3 "  >Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
