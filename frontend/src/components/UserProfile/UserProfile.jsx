import React from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../lib/request";
import { AlertFunc } from "../Alert/Alert";
import './userprofile.scss';
import Cookies from 'js-cookie';
import { useBeerContextApi } from "../../context/beerContextApi";

export default function UserProfile() {
  const { cartComp, searchComp, Debounce, hanldeBeerSearch,showProfile,setShowProfile } = useBeerContextApi();

  const router = useNavigate();
  async function handleSignout(){
    setShowProfile(false);
    Cookies.remove('cid')
    AlertFunc('Logged out successfully',"success",2000)
    setTimeout(()=>{
      router(`/auth/signin`);
    },2000)
    // let loader = document.querySelector('.loader')
    // if(loader){
    //   loader.style.display = 'flex';
    // }
    // let res = await postData('/api/logout',{})
    // let {message} = await res.json();
    // if(res.status == 200){
    //   AlertFunc(message,"success",2000)
    //   setTimeout(()=>{
    //     router(`/auth/signin`);
    //   },2000)
    //   if(loader){
    //     loader.style.display = 'none';
    //   }
    // }
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
