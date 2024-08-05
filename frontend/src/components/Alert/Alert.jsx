import React, { useEffect } from 'react';
import './alert.scss';


export function AlertFunc(message, type,timeout){
  const alertPlaceholder = document.querySelector('.alertPlaceholder')
  let html = `
  <div class="alert alert-${type} alert-dismissible" role="alert">
    <span>${message}</span>
    <span class="btn-close" id="alert_btn_close" data-bs-dismiss="alert" aria-label="Close">&#x2715;</span>
  </div>
`;
  
  if (alertPlaceholder) {
    alertPlaceholder.innerHTML = html;
    let btnClose = document.getElementById('alert_btn_close');
    if(btnClose){
      btnClose.addEventListener('click',()=>{
        alertPlaceholder.innerHTML = "";
      })
    }
    setTimeout(() => {
      alertPlaceholder.innerHTML = "";
    }, timeout);
  } else {
    console.error('Alert placeholder element not found.');
  }
}
export default function Alert() {
  return (
    <div className='alertPlaceholder'>
    </div>
  )
}
