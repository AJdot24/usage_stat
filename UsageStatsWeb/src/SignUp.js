import { auth } from "firebase";
import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
const database = app.database();
const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password,pname,phone } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(function(res){
 

            var databaseref = database.ref()

            var user_data = {
              email : email.value,
              parent_name : pname.value,
              phone : phone.value,
              children:[]
            }
            const username=res.user.email.split("@")[0]
            // console.log(username)
            databaseref.child('users').child(username).set(user_data)
              // databaseref.child('users').child(username).child("children").set(user_data)
        })
       history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="login p-10 ">
    <h1 className="m-4">Sign Up</h1>
    <form className="loginForm" onSubmit={handleSignUp}>
      {/* <label for="email">
        Email</label> */}
        <input className="m-3" name="email" type="email" id="email" placeholder="Email" />
        <input className="m-3" name="pname" type="text" id="Parent_name" placeholder="Parent Name" />
        <input className="m-3" name="phone" type="number" id="Phone" placeholder="Phone " />
      {/* <label>
        Password</label> */}
        <input name="password" type="password" placeholder="Password" />
      
      <button type="submit" className="m-3 "  >signup</button>
    </form>
  </div>
  );
};

export default withRouter(SignUp);
