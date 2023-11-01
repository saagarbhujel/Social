import { botombarLinks } from "@/constants"
import { Link, useLocation } from "react-router-dom"



const BottomBar = () => {

  const {pathname} = useLocation()

  return (
    <section className="bottom-bar">
      {
        botombarLinks.map((link)=>{
          const isActive = link.route === pathname
          return (
            <Link to={link.route} className={`${isActive && " rounded-[10px] bg-primary-500"} flex-center flex-col gap-1 p-2 transition`} >
            <img src={link.imgURL} alt="icons" className={`${isActive && "invert-white"}`} />
            <p className=" tiny-medium text-light-2">{link.label}</p>
            </Link>
            )

        })
      }

    </section>
  )
}

export default BottomBar