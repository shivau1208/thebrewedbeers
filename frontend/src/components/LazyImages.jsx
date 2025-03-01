import { ImgCDN } from "@/App";

export default function LazyImages({beer}) {
  return (
    <img src={`${ImgCDN}/${beer?.strDrinkThumb}`} className="" alt={beer.strDrink} />
  )
}
