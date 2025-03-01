import { useState } from "react";
import { AlertFunc } from "@/components/Alert/Alert";
import "./auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { signupAuthService } from "@/services/loginService";

export default function Signup() {
  const route = useNavigate();
  const [data, setData] = useState({ email: null, fname: null, lname: null, password: null });
  const [checked, setChecked] = useState(false);

  function termsAndConditionsCheckbox() {
    return () => setChecked(!checked);
  }
  function getFormData() {
    return (e) => e.target.type === 'email' ? setData({ ...data, email : `${e.target.value}@cl.me` }) : setData({ ...data, [e.target.name]: e.target.value });
  }
  const register = async(e) => {
    e.preventDefault();
    var confirmpassword = document.getElementById("cnfmpwd").value;
    let loader = document.querySelector(".flexbox");
    let dataKeys = Object.keys(data);
    if (dataKeys.every((item) => data[item])) {
      if (data.password === confirmpassword) {
        if (loader) {
          loader.style.display = "flex";
        }
        const res = await signupAuthService(data);
        const {message} = await res.json();
        if (res.ok) {
          AlertFunc((message || ""), "success", 2000);
          setTimeout(() => {
            route(`/auth/signin`);
          }, 2000);
        } else {
          AlertFunc((message || ""), "danger", 2000);
        }
        loader.style.display = "none";
      } else {
        AlertFunc("Passwords do not match!!", "warning", 2000);
      }
    } else {
      AlertFunc("Please fill all fields", "info", 2000);
    }
  };

  return (
    <>
      <div className="container" id="pills-register" role="tabpanel">
        <div className="signupForm">
          <h4>Sign Up</h4>
          <div>
            <div className="form-inputs">
              <input type="text" autoComplete="off" name="fname" onKeyUp={getFormData()} placeholder="First Name" />
            </div>
            <div className="form-inputs">
              <input type="text" autoComplete="off" name="lname" onKeyUp={getFormData()} placeholder="Last Name" />
            </div>
            <div className="form-inputs email">
              <input type="email" autoComplete="off" name="email" onKeyUp={getFormData()} className="form-email " placeholder="Email" />
              <span className="email-text">@cl.me</span>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-inputs">
              <input type="password" autoComplete="off" name="password" onKeyUp={getFormData()} placeholder="Password" />
            </div>

            {/* <!-- Repeat Password input --> */}
            <div className="form-inputs">
              <input type="password" autoComplete="off" id="cnfmpwd" placeholder="Confirm Password" />
            </div>

            {/* <!-- Checkbox --> */}
            <div className="form-checkbox">
              <input type="checkbox" checked={checked} value="" aria-describedby="registerCheckHelpText" onChange={termsAndConditionsCheckbox()} />
              <label htmlFor="registerCheck"> I have read and agree to the terms </label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" onClick={register} disabled={!checked}> Sign Up </button>
            <hr />
            <div className="form-not-user">
              <p className="m-0">
                Already member? <Link to={"/auth/signin"}>Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
