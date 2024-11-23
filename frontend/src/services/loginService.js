export const server = 'https://login-service.netlify.app/.netlify/functions/api'
// export const server = 'http://localhost:5000'

export const VerifyAuthService = async()=>{
    const response = await fetch(`${server}/protected`,{
      credentials:'include',
    });
    return response;
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

export const oauthService = async(data)=>{
    const response = await fetch(`${server}/oauth`, {
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