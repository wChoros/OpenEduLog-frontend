//@ts-ignore
import './style.sass'


const studentDashboardNavigation = () => {
   return (
      <nav id={'studentDashboardNavigation'}>
         <header id={'studentDashboardHeader'}>
            <h3>Student</h3>
            <h3>Dashboard</h3>
            <img src="/logos/OEL_icon.png" alt="OpenEduLog" />

         </header>
         <div className={'navRecord'}>
            <a href={'/dashboard/student'}>
               <img src={'/icons/overview.svg'} alt={'overview'} />
               <span>Overview</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/mail'}>
               <img src={'/icons/mail.svg'} alt={'courses'} />
               <span>Mail</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/grades'}>
               <img src={'/icons/grades.svg'} alt={'grades'} />
               <span>Grades</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/timetable'}>
               <img src={'/icons/timetable.svg'} alt={'timetable'} />
               <span>Timetable</span>
            </a>
         </div>
         <div className={'navRecord'}>
            <a href={'/dashboard/student/attendance'}>
               <img src={'/icons/attendance.svg'} alt={'attendance'} />
               <span>Attendance</span>
            </a>
         </div>
      </nav>
   )
}

export default studentDashboardNavigation
