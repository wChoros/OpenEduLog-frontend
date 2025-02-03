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
   substitutionTeacher: Teacher | null // or undefined
   substitutionTeacherId: number | null // or undefined
}

const getCurrentWeekNumber = () => {
   const today = new Date()
   const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
   const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000
   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const Index: React.FC = () => {
   const [timetableData, setTimetableData] = useState<TimetableItem[]>([])

   const [weekNumber] = useState(() => {
      // If the path ends with /dashboard/student/timetable or the same with trailing slash
      if (
         window.location.pathname.endsWith('/dashboard/student/timetable') ||
         window.location.pathname.endsWith('/dashboard/student/timetable/')
      ) {
         return getCurrentWeekNumber()
      }

      // Otherwise, parse last segment
      const weekNumberString = window.location.pathname.split('/').pop()
      return weekNumberString ? parseInt(weekNumberString) : getCurrentWeekNumber()
   })

   useEffect(() => {
      // Get userId from cookie
      const userIdCookie = document.cookie.split('; ').find((row) => row.startsWith('user_id='))
      const userId = userIdCookie ? userIdCookie.split('=')[1] : null

      // @ts-ignore
      const apiUrl = import.meta.env.VITE_API_URL

      fetch(`${apiUrl}/timetables/user/${userId}/${weekNumber}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('Timetable data:', data)
            if (Array.isArray(data)) {
               setTimetableData(data)
            } else {
               setTimetableData([data])
            }
         })
         .catch((error) => {
            console.error('Error fetching timetable:', error)
         })
   }, [weekNumber]) // refetch whenever weekNumber changes

   const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
   const totalLessons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Hardcoded for now

   return (
      <section id="timetable">
         <h1 className="dashboardSectionTitle">Timetable</h1>

         <div className={'timetableContentContainer'}>
            <div className="previousWeekButton">
               <a href={`/dashboard/student/timetable/${weekNumber - 1}`}>
                  <img src="/icons/arrow-left.svg" alt="previous week" />
               </a>
            </div>
            <div className="nextWeekButton">
               <a href={`/dashboard/student/timetable/${weekNumber + 1}`}>
                  <img src="/icons/arrow-right.svg" alt="next week" />
               </a>
            </div>
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
                                 (item) =>
                                    item.weekDay === day && item.lessonNumber === lessonNumber
                              )
                              return (
                                 <td
                                    key={day}
                                    className={entry && entry.isCanceled ? 'canceled' : ''}
                                 >
                                    {entry ? (
                                       <>
                                          <span
                                             className={`subjectName ${entry && entry.isCanceled ? 'canceled' : ''}`}
                                          >
                                             {entry.subjectOnTeacher.subject.name}
                                          </span>
                                          <br />
                                          {entry.substitutionTeacher ? (
                                             <>
                                                <span className={`teacherName substitution`}>
                                                   {entry.substitutionTeacher.firstName}{' '}
                                                   {entry.substitutionTeacher.lastName}
                                                </span>
                                             </>
                                          ) : (
                                             <>
                                                <span className={'teacherName'}>
                                                   {entry.subjectOnTeacher.teacher.firstName}{' '}
                                                   {entry.subjectOnTeacher.teacher.lastName}
                                                </span>
                                             </>
                                          )}
                                       </>
                                    ) : null}
                                 </td>
                              )
                           })}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>
   )
}

export default Index
