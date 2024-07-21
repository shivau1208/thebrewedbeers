import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../lib/request";
import Alert, { AlertFunc } from "../../components/Alert/Alert";
import "./auth.scss";
import { server } from "../../App";

export default function Signin() {
  const router = useNavigate();
  const [data, setData] = useState({ email: null, password: null });
  const submit = async (event) => {
    event.preventDefault();
    let loader = document.querySelector(".loader");
    if (data.email && data.password) {
      if (loader) {
        loader.style.display = "flex";
      }
      const res = await postData(`${server}/login`, data);
      let { message } = await res.json();
      if (res.status == 200) {
        AlertFunc(message, "success", 2000);
        setTimeout(()=>{
          router(`/home`);
        },2000)
      } else {
        AlertFunc(message, "danger", 2000);
        router(`/auth/signin`);
      }
      if (loader) {
        loader.style.display = "none";
      }
    } else {
      AlertFunc("Please fill credentials", "info", 2000);
    }
  };
  return (
    <>
      <div className="container">
        <div className="signinForm">
          <h4 className="">Sign In</h4>
          <div>
            <div className="form-inputs">
              <input type="email" className="" onChange={(e) => setData({ ...data, email: e.target.value })} id="floatingInput" placeholder="name@cl.me" />
            </div>
            <div className="form-inputs">
              <input type="password" className="" onChange={(e) => setData({ ...data, password: e.target.value })} id="floatingPassword" placeholder="Password" />
            </div>
            <div className="form-checkbox">
              <input className="" type="checkbox" value="" id="rememberPasswordCheck" />
              <label className="" htmlFor="rememberPasswordCheck">
                Remember Me
              </label>
            </div>
            <button onClick={submit} className="" type="submit"> Sign in </button>
            <hr className="" />
            <div className="form-not-user">
              <p className=""> Not a member? <Link to={"/auth/signup"}>Register</Link></p>
            </div>
          </div>
        </div>
        <Alert />
      </div>
      <div className="signin-suggetion">
        <p><b>Username:</b> user@cl.me</p>
        <p><b>Password:</b> 1234</p>
      </div>
    </>
  );
}
