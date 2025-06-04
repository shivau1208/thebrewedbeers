import {useNavigate } from "react-router-dom";
import { AlertFunc } from "@/components/Alert/Alert";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { VerifyAuth } from "@/redux/actions";
import { oauthService } from "@/services/loginService";
import { signInWithPopup} from 'firebase/auth'
import { auth, provider } from "./firebaseConf";


export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
 
 
  const signInWithGoogle = ()=>{
    let loader = document.querySelector(".flexbox");
    if (loader) {
      loader.style.display = 'flex';
    }
    signInWithPopup(auth,provider)
    .then(async ({user})=>{
      console.log("user",user);
      
      localStorage.setItem("user", JSON.stringify({ email: user.email, displayname:user.displayName, profile: user.photoURL, userId: user.uid, lastRefresh:user.reloadUserInfo.lastRefreshAt})); // Set the token in local storage
      
      const res = await oauthService(user.accessToken);
      const {message} = await res.json();

      if (res.status == 200) {
        AlertFunc(message, "success", 2000);
        dispatch(VerifyAuth('authenticate'));
        if(loader){
          loader.style.display = 'none';
        }
        navigate('/home');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('Service work registered with scope:', registration.scope);
            })
            .catch(err => {
              console.log('Service worker registration failed', err);
            });
        }
      } else {
        if(loader){
          loader.style.display = 'none';
        }
        AlertFunc(message, "danger", 2000);
        navigate(`/auth/signin`);
      }
      
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="container">
      <div className="signinForm">
          <button onClick={signInWithGoogle} type="submit"><img src="/gsignin.svg" alt="G" srcSet="" /> Sign in with Google</button>
      </div>
    </div>
  );
}
