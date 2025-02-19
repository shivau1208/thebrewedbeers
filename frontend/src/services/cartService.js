import { server } from "../App"

export const getCartItems = async (userID)=>{
  try{
    const res = await fetch(`${server}/cartitems_get/${userID}`);
    return res
  }catch(err){
    console.log(err);
    
  }
  
}

export const postCartItems = async (localId, drinkIds)=>{
  try{
    const res = await fetch(`${server}/cartitems_post`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ localId, drinkIds })
    })
    return res
  }catch(err){
    console.log(err);
    
  }
}