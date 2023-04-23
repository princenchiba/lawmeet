import React from "react"

interface navItemProps {
    name: string,
    activeLink: string,
    setActiveLink: (activeLink: string) => void;
}



const NavItem: React.FC<navItemProps> = ({name, activeLink, setActiveLink}) =>{

    const selectNavItem =(name: string)=>{
        setActiveLink(name)
    }

    return(
        <div className={activeLink === name? "text-white font-bold p-3" : "text-white opacity-50 p-3"} 
        onClick={()=>selectNavItem(name)}>
            <p>{name}</p>
        </div>
    )
}

export default NavItem