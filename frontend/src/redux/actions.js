

export const VerifyAuth = (authtype) => (dispatch) => {
  if(authtype=='authenticate'){
    dispatch({type:'AUTHENTICATE'})
  }else if(authtype=='deauthenticate'){
    dispatch({type:'DEAUTHENTICATED'})
  }
}

export const UpdateUser = (user) => (dispatch) => {
  dispatch({ type: 'UPDATE_USER', payload: user });
}