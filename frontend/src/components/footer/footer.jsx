import '@/footer.css'

export default function Footer() {
    var url = encodeURIComponent(window.location.href);
    var text = encodeURIComponent("Visit Our Online Store...!")
    const FacebookBtn = ()=>{
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }
    const TwitterBtn = ()=>{
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
    const WhatsappBtn = ()=>{
        window.open(`whatsapp://send?text=${text} ${url}`, '_blank');
    }



  return (
    <>
        <div className="footerContainer">
            <div className="socialLinks">
                <div>
                    <img src="/facebook-svgrepo-com.svg" alt="facebook" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/instagram-svgrepo-com.svg" alt="instagram" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/whatsapp-svgrepo-com.svg" alt="whatsapp" srcSet="" width='30' />
                </div>
                <div>
                    <img src="/twitterx.svg" alt="twitter" srcSet="" width='30' />
                </div>
            </div>
            <div className="contactTabs">
                <p>CONTACT</p>
                <p>HOURS & LOCATION</p>
                <p>FEEDBACK</p>
            </div>
        </div>
    </>
  )
}
