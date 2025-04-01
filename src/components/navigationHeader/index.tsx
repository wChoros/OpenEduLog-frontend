// @ts-ignore
import './style.sass'
// @ts-ignore
import '../../../public/styles/global-big.sass'

const navigationHeader = () => {
   return (
      <header id={'navigationHeader'}>
         <div className={'logo-container'}>
            <img src={'./logos/OEL_icon.png'} alt={'OpenEduLog icon'} id={"icon"} />
            <img src={'./logos/OEL_Name.png'} alt={'OpenEduLog name'} id={"name"}/>
         </div>
         <nav>
            <ul>
               <li className={'navRecord'}>
                  <a href={'/'}>Home</a>
               </li>
               <li className={'navRecord'}>
                  <a href={'/about'}>About</a>
               </li>
               <li className={'navRecord'}>
                  <a href={'/contact'}>Contact</a>
               </li>
               <li className={'navRecord'}>
                  <a href={'/login'}>Login</a>
               </li>
               <li className={'navRecord'}>
                  <a href={'/register'}>Register</a>
               </li>
            </ul>

         </nav>
      </header>
   )
}

export default navigationHeader
