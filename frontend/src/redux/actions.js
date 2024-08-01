

export const VerifyAuth = (authtype) => (dispatch) => {
  if(authtype=='authenticate'){
    dispatch({type:'AUTHENTICATE'})
  }else if(authtype=='deauthenticate'){
    dispatch({type:'DEAUTHENTICATED'})
  }
}