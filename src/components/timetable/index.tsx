import React, { useEffect, useState } from 'react'
// @ts-ignore
import './style.sass'

// Nested interfaces for clarity
interface Teacher {
   id: number
   firstName: string
   lastName: string
}

interface Subject {
   id: number
   name: string
}

interface SubjectOnTeacher {
   id: number
   subjectId: number
   teacherId: number
   createdAt: string
   updatedAt: string
   subject: Subject
   teacher: Teacher
}

interface Group {
   name: string
}

interface TimetableItem {
   id: number
   weekNumber: number
   weekDay: string // e.g. "MONDAY"
   createdAt: string
   updatedAt: string
   group: Group
   groupId: number
   isCanceled: boolean
   lessonNumber: number
   subjectOnTeacher: SubjectOnTeacher
   subjectOnTeacherId: number
   substitutionTeacher: Teacher | null // or undefined, if not present
   substitutionTeacherId: number | null // or undefined
}

// Extend your data interface to include day & lesson
interface TimetableItem {
   weekDay: string
   lessonNumber: number
   subjectOnTeacherId: number
   subjectOnTeacher: SubjectOnTeacher
}

const getCurrentWeekNumber = () => {
   const today = new Date()
   const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
   const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000
   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const Index: React.FC = () => {
   const [timetableData, setTimetableData] = useState<TimetableItem[]>([])

   useEffect(() => {
      let weekNumber: number
      // get week number from url (will be at the end of the url)
      if (
         window.location.pathname.endsWith('/dashboard/student/timetable') ||
         window.location.pathname.endsWith('/dashboard/student/timetable/')
      ) {
         weekNumber = getCurrentWeekNumber()
      }      
      else {
         const weekNumberString =  window.location.pathname.split('/').pop()
         weekNumber = weekNumberString ? parseInt(weekNumberString) : getCurrentWeekNumber()
      }

      // Get userId from cookie
      const userIdCookie = document.cookie.split('; ').find((row) => row.startsWith('user_id='))
      const userId = userIdCookie ? userIdCookie.split('=')[1] : null

      // @ts-ignore
      const apiUrl = import.meta.env.VITE_API_URL

      // get week number from url

      fetch(`${apiUrl}/timetables/user/${userId}/${weekNumber}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data)
            if (Array.isArray(data)) {
               setTimetableData(data)
            } else {
               setTimetableData([data])
            }
         })
         .catch((error) => {
            console.error('Error fetching timetable:', error)
         })
   }, [])

   const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
   const totalLessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // hardcoded for now

   return (
      <section id="timetable">
         <h1 className="dashboardSectionTitle">Timetable</h1>
         <div className="timetableContainer">
            <table>
               <thead>
                  <tr>
                     <th>Lesson</th>
                     {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {totalLessons.map((lessonNumber) => (
                     <tr key={lessonNumber}>
                        <td>Lesson {lessonNumber}</td>
                        {daysOfWeek.map((day) => {
                           const entry = timetableData.find(
                              (item) => item.weekDay === day && item.lessonNumber === lessonNumber
                           )

                           return (
                              <td key={day}>
                                 {entry ? (
                                    <>
                                       <span className={'subjectName'}>
                                          {entry.subjectOnTeacher.subject.name}
                                       </span>
                                       <br />
                                       <span className={'teacherName'}>
                                          {entry.subjectOnTeacher.teacher.firstName}{' '}
                                          {entry.subjectOnTeacher.teacher.lastName}
                                       </span>
                                    </>
                                 ) : (
                                    <></>
                                 )}
                              </td>
                           )
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default Index
