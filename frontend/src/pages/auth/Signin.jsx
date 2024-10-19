import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertFunc } from "../../components/Alert/Alert";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { UpdateUser, VerifyAuth } from "../../redux/actions";
import { loginAuthService, oauthService } from "../../services/loginService";
import { signInWithPopup} from 'firebase/auth'
import { auth, provider } from "./firebaseConf";


export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: null, password: null });
  const dispatch = useDispatch()
 
 
  const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider)
    .then(async({_tokenResponse:userInfo,providerId,user})=>{
      const loginRes = await handlleSignin(userInfo?.email,user?.uid)
      if(loginRes.status == 401){
        const res = await oauthService({ email: userInfo?.email, fname:userInfo?.firstName , lname:userInfo?.lastName,password:user?.uid, providerId: providerId});
        // const {message} = await res.json();
        if(res.ok){
          await handlleSignin(userInfo?.email,user?.uid);
        }
      }
      dispatch(UpdateUser(userInfo));
      localStorage.setItem('userInfo',JSON.stringify(userInfo))
      // if(user?.email){
      //   AlertFunc((message || ""), "success", 2000);
      //   dispatch(VerifyAuth('authenticate'));
      //   navigate('/home');
      //   document.cookie = `beerToken=${user?.refreshToken}; max-age=${60*60*24*365}; path=/; domain=${location.hostname}; SameSite=Lax`;
      // }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  async function handlleSignin(email,password) {
    try {
      const res = await loginAuthService({email,password});
      const { message } = await res.json();
      if (res.status == 200) {
        AlertFunc(message, "success", 2000);
        dispatch(VerifyAuth('authenticate'));
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('Service work registered with scope:', registration.scope);
            })
            .catch(err => {
              console.log('Service worker registration failed', err);
            });
        }
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        AlertFunc(message, "danger", 2000);
        navigate(`/auth/signin`);
      }
      return res
    } catch (err) {
      console.log(err);
      AlertFunc('Failed to login', "danger", 2000);
    }
  }
  const submit = async (event) => {
    event.preventDefault();
    let loader = document.querySelector(".flexbox");
    if (data.email && data.password) {
      if (loader) {
        loader.style.display = 'flex';
      }
      await handlleSignin(data?.email,data?.password);
      loader.style.display = 'none';
    } else {
      AlertFunc("Please fill credentials", "info", 2000);
    }
  };
  return (
    <>
      <div className="container">
        <div className="signinForm">
          <h4>Sign In</h4>
          <div>
            <div className="form-inputs">
              <input type="email" autoComplete="off" onChange={(e) => setData({ ...data, email: e.target.value })} id="floatingInput" placeholder="name@cl.me" />
            </div>
            <div className="form-inputs">
              <input type="password" autoComplete="off" onChange={(e) => setData({ ...data, password: e.target.value })} id="floatingPassword" placeholder="Password" />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" value="" id="rememberPasswordCheck" />
              <label htmlFor="rememberPasswordCheck">
                Remember Me
              </label>
            </div>
            <button onClick={submit} type="submit"><img src="/beer-mug.svg" alt="beer" srcSet="" /> Sign In </button>
            <button onClick={signInWithGoogle} type="submit"><img src="/gsignin.svg" alt="G" srcSet="" /> Sign in with Google</button>
            <hr />
            <div className="form-not-user">
              <p> Not a member? <Link to={"/auth/signup"}>Register</Link></p>
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
