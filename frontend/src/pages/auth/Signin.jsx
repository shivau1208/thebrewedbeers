import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertFunc } from "../../components/Alert/Alert";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { VerifyAuth } from "../../redux/actions";
import { loginAuthService } from "../../services/loginService";

export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: null, password: null });
  const dispatch = useDispatch()
  const submit = async (event) => {
    event.preventDefault();
    let loader = document.querySelector(".flexbox");
    if (data.email && data.password) {
      try{
        if(loader){
          loader.style.display = 'flex';
        }
        const res = await loginAuthService(data);
        let { message } = await res.json();
        if (res.status == 200) {
          loader.style.display = 'none';
          AlertFunc(message, "success", 2000);
          dispatch(VerifyAuth('authenticate'))
          setTimeout(()=>{
            navigate('/home');
          },2000)
        } else {
          loader.style.display = 'none';
          AlertFunc(message, "danger", 2000);
          navigate(`/auth/signin`);
        }
      }catch(err){
        loader.style.display = 'none';
        console.log(err);
        AlertFunc('Failed to login', "danger", 2000);
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
              <input type="email" className="" autoComplete="off" onChange={(e) => setData({ ...data, email: e.target.value })} id="floatingInput" placeholder="name@cl.me" />
            </div>
            <div className="form-inputs">
              <input type="password" className="" autoComplete="off" onChange={(e) => setData({ ...data, password: e.target.value })} id="floatingPassword" placeholder="Password" />
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
      </div>
      <div className="signin-suggetion">
        <p><b>Username:</b> user@cl.me</p>
        <p><b>Password:</b> 1234</p>
      </div>
    </>
  );
}
