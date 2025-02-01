import studentDashboardNavigation from '../components/studentDashboardNavigation/index.js'

export default function Page() {
   return (
      <>
         {studentDashboardNavigation({ studentName: 'John Doe', schoolName: 'School of Hard Knocks' })}
      </>
   )
}
