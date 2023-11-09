
import { Link, NavLink,useNavigate , useLocation } from "react-router-dom";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import Loader from "./Loader";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSideBar = () => {
  const { user, setIsAuthenticated, setUser, isLoading } = useUserContext();
  const {mutate: signOut} = useSignOutAccount();
  const navigate = useNavigate();

  const {pathname} = useLocation();

  const handleSignOut = (e :  React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate('/sign-in')
  }


  return (
    <nav className="leftsidebar">
      <div className=" flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            className='invert-white'
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        {isLoading || !user.email ? (
          <div className=" h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold first-letter:capitalize">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li className={`leftsidebar-link group ${ isActive && 'bg-primary-500'}`} key={link.label}>
                <NavLink className={'flex gap-4 items-center p-4'} to={link.route}>
                  <img src={link.imageUrl} alt={link.label} className={` group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button 
      variant={'ghost'}
      className="shad-button_ghost"
      onClick={handleSignOut}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className=" small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
