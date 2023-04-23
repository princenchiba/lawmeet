import {  useState } from "react";
import NavItem from "./NavItem";
import profilePic from '../res/profilepic.png'
import './nav.css'
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Nav() {

    const currentUser = useUser().user
    const [activeLink, setActiveLink] = useState("Reports")

  return (
      <nav className="h-screen border-r-2 border-grey-100 p-10 z-10 bg-black flex flex-col justify-between sticky top-0">
        <div className="profile-container">
          <img className='mr-5 w-20px h-20px mb-1' src={profilePic} alt="user profile picture"/>
          <p className="text-white mb-0.5">{currentUser?.username}</p>
          <p className="text-white opacity-50 text-sm">{currentUser?.primaryEmailAddress?.emailAddress}</p>
        </div>

        <ul className='text-left h-fit'>
            <li className='cursor-pointer w-20px'>
              <Link to='reports'>
                <NavItem name="Reports" activeLink={activeLink} setActiveLink={setActiveLink}/>
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link to='templates'>
                <NavItem name="Templates" activeLink={activeLink} setActiveLink={setActiveLink}/>
              </Link>
            </li>
        </ul>
          
          <button className="signout-button">Sign out</button>
      </nav>
  )
}
