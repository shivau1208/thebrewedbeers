import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <>
        <div className="footerContainer">
            <div className="socialLinks">
                <div>
                    <img src="/facebook-svgrepo-com.svg" alt="" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/instagram-svgrepo-com.svg" alt="" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/whatsapp-svgrepo-com.svg" alt="" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/twitter-svgrepo-com.svg" alt="" srcSet="" width='30' />
                </div>
            </div>
            <div className="contactTabs">
                <p>CONTACT</p>
                <p>HOURS & LOCATION</p>
                <p>FEEDBACK</p>
            </div>
        </div>
    </>
  )
}
