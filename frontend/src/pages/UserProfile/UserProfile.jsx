import React from "react";
import { useNavigate } from "react-router-dom";
import './userprofile.scss';
import { useBeerContextApi } from "../../context/beerContextApi";
import { logoutService } from "../../services/loginService";
import { AlertFunc } from "../../components/Alert/Alert";

export default function UserProfile() {
  const { setShowProfile } = useBeerContextApi();

  const router = useNavigate();
  async function handleSignout(){
    let loader = document.querySelector('.flexbox')
    if(loader){
      loader.style.display = 'flex';
    }
    setShowProfile(false);
    logoutService()
    .then(res=>{
      if(res.status==200){
        loader.style.display = 'none';
        AlertFunc('Logged out successfully',"success",2000)
        setTimeout(()=>{
          router(`/auth/signin`);
        },2000)
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="user-profile">
      <div className="padding">
        <div className="profile-pic">
          <div className="profile-img">
            <img src="/icons8-user-50.png" alt="Profile" srcSet="" />
          </div>
          <div className="profile-edit ">
            <img src="/pencil.svg"  alt="" srcSet="" />
          </div>
        </div>
        <div className="profileManager">
          <button className="">Manage your Profile</button>
        </div>
      </div>
      <hr className="" />
      <div className="signoutBtn">
        <button type="button" className="" onClick={handleSignout}>Signout</button>
      </div>
    </div>
  );
}
