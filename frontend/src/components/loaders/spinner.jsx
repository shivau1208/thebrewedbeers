import React from 'react'
import './spinner.css'

export default function Spinner() {
  return (
    <>
        <div className="spinner-box">
            <div className="circle-border">
                <div className="circle-core"></div>
            </div>  
        </div>
    </>
  )
}
