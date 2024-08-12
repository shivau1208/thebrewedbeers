self.addEventListener('message', async(event)=>{
  const {url} = event.data;
  try{
    const res = await fetch(url);
    const data = await res.json();
    self.postMessage({status:'success',data});
  }catch(err){
    self.postMessage({status:'error',error:err.message});
  }
})