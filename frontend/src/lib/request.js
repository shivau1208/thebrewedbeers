export async function postData(url='', data=''){
  const response = await fetch(url, {
    method:'POST',
    headers:{
      'content-type':'application/json',
      
    },
    credentials:'include',
    body:JSON.stringify(data)
  });
  return response;
}