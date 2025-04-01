//@ts-ignore
import React, { useState, useRef, useEffect} from "react";
// @ts-ignore
import './style.sass';

const studentDashboardHeader = (props: Readonly<{ studentName: string, schoolName: string }>) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   }

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      }
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      }
   }, [])

   return (
      <header id={'studentDashboardHeader'}>
         <h3>Hi, {props.studentName}!</h3>
         <div className={"dropdown"} ref={dropdownRef}>
            <button id={'dropdown-btn'} onClick={toggleDropdown}>
               <img src={'../icons/user.svg'} alt={'User icon'} />
            </button>
            {isOpen && (
               <div id={"dropdown-content"}>
                  <a href={'/'}>Logout</a>
               </div>
            )}
         </div>
      </header>
   )
}

export default studentDashboardHeader;