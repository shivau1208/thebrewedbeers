


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

const userInitialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const userReducer = (state={user:userInitialState},action)=>{
  if (action.type === 'UPDATE_USER') {
    return { user: action.payload };
  }
  return state;
}