export const server = 'https://login-service-xwdp.onrender.com'

export const VerifyAuthService = async()=>{
  const res = fetch(`${server}/protected`,{
    headers:{
      'content-type':'application/json',
    },
    credentials:'include',
  });
  return res;
}

export const loginAuthService = async(data)=>{
    const response = await fetch(`${server}/login`, {
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      credentials:'include',
      body:JSON.stringify(data)
    });
    return response;
}
export const signupAuthService = async(data)=>{
    const response = await fetch(`${server}/signup`, {
      method:'POST',
      headers:{
        'content-type':'application/json',
        
      },
      credentials:'include',
      body:JSON.stringify(data)
    });
    return response;
}

export const logoutService = async()=>{
  const res = await fetch(`${server}/logout`,{
    method:'POST',
    credentials:'include'
  })
  return res;
}