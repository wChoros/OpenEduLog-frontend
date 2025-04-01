import studentDashboardHeader from '../../components/studentDashboardHeader/index.js'
import studentDashboardNavigation from '../../components/studentDashboardNavigation'
import { Outlet } from 'react-router'

// @ts-ignore
import '../../../public/styles/dashboard-big.sass'

export default function Page() {
   return (
      <>
         {studentDashboardNavigation()}
         <div id={"main"}>
            {studentDashboardHeader({
               studentName: 'John Doe',
               schoolName: 'School of Hard Knocks',
            })}
            <div id={"dashboard-content"}>
               <Outlet />
            </div>
         </div>


      </>
   )
}
