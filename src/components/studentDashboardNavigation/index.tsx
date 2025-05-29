//@ts-ignore
import './style.sass'


const studentDashboardNavigation = () => {
   return (
      <nav id={'studentDashboardNavigation'}>
         <header id={'studentDashboardHeader'}>
            <h1 className="dashboard-text">Student Dashboard</h1>
            <img src="/logos/OEL_icon.png" alt="OpenEduLog" />
         </header>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/mail'}>
               <img src={'/icons/mail.png'} alt={'courses'} />
               <span>Messages</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/grades'}>
               <img src={'/icons/grades.png'} alt={'grades'} />
               <span>Grades</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/timetable'}>
               <img src={'/icons/timetable.png'} alt={'timetable'} />
               <span>Timetable</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/attendance'}>
               <img id={'attendance-icon'} src={'/icons/attendance.png'} alt={'attendance'} />
               <span>Attendance</span>
            </a>
         </div>
      </nav>
   )
}

export default studentDashboardNavigation
