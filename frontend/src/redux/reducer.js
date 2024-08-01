


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