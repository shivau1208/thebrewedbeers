


export const authReducer = (state={authenticated:false},action)=>{
  switch(action.type){
    case 'AUTHENTICATE':
      return {authenticated:true};
    case 'DEAUTHENTICATE':
      return {authenticated:false};
    default:
      return state;
  }
}

export const userReducer = (state={user:null},action)=>{
  if (action.type === 'UPDATE_USER') {
    return { user: action.payload };
  }
  return state;
}