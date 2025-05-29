//import { useState, useEffect } from 'react'
// @ts-ignore
import './style.sass'

// interface Teacher {
//    id: number
//    firstName: string
//    lastName: string
// }
//
// interface Subject {
//    id: number
//    name: string
// }
//
// interface SubjectOnTeacher {
//    id: number
//    subjectId: number
//    teacherId: number
//    createdAt: string
//    updatedAt: string
//    subject: Subject
//    teacher: Teacher
// }
//
// interface Group {
//    name: string
// }
//
// interface TimetableItem {
//    id: number
//    date: Date
//    createdAt: string
//    updatedAt: string
//    group: Group
//    groupId: number
//    isCanceled: boolean
//    lessonNumber: number
//    subjectOnTeacher: SubjectOnTeacher
//    subjectOnTeacherId: number
//    substitutionTeacher: Teacher | null
//    substitutionTeacherId: number | null
// }

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const days = (() => {
   const today = new Date()
   const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1
   const monday = new Date(today)
   monday.setDate(today.getDate() - dayOfWeek)

   return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      return {
         day: dayNames[i],
         date: date.getDate(),
         fullDate: date.toISOString().split('T')[0]
      }
   })
})()

const time = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']

export const timetableSmallView = () => {
   // const [timetableData, setTimetableData] = useState<TimetableItem[] | null>(null)
   //
   // useEffect(() => {
   //    const userIdCookie = document.cookie.split('; ').find((row) => row.startsWith('user_id='))
   //    const userId = userIdCookie ? userIdCookie.split('=')[1] : null
   //
   //    // @ts-ignore
   //    const apiUrl = import.meta.env.VITE_API_URL
   //    fetch(`${apiUrl}/timetables/user/${userId}/${days[0].fullDate}/${days[6].fullDate}`, {
   //       method: 'GET',
   //       headers: { 'Content-Type': 'application/json' },
   //       credentials: 'include',
   //    })
   //       .then((res) => res.json())
   //       .then((data) => {
   //          if (Array.isArray(data)) {
   //             setTimetableData(data)
   //          } else {
   //             setTimetableData([data])
   //          }
   //       })
   //       .catch((error) => {
   //          console.error('Error fetching timetable:', error)
   //       })
   // }, [])

   return (
      <div className="timetable">
         <div className="timetable">
            <div className="column time">
               <div className="cell time"></div>
               {time.map((t, i) => (
                  <div className="cell" key={i}>{t}</div>
               ))}
            </div>

            {days.map((day, index) => {
               //const isToday = new Date().toISOString().split('T')[0] === day.fullDate

               return (
                  <div className={`column`} key={index}>
                     <div className="cell header">
                        <div className="text-wrapper">{day.day}</div>
                        <div className="date">{day.date}</div>
                     </div>
                  </div>
               )
            })}

                  {/*{time.map((_, timeIndex) => {*/}
                  {/*   const lesson = timetableData?.find(*/}
                  {/*      (item) =>*/}
                  {/*         new Date(item.date).toISOString().split('T')[0] === day.fullDate &&*/}
                  {/*         item.lessonNumber === timeIndex + 1*/}
                  {/*   )*/}

                  {/*   if (!lesson) {*/}
                  {/*      return <div className="cell" key={timeIndex}></div>*/}
                  {/*   }*/}

                  {/*   const isCanceled = lesson.isCanceled*/}
                  {/*   const substitutionTeacher = lesson.substitutionTeacher*/}
                  {/*   const regularTeacher = lesson.subjectOnTeacher.teacher*/}
                  {/*   const subjectName = lesson.subjectOnTeacher.subject.name*/}

                  {/*   return (*/}
                  {/*      <div className={`cell ${isCanceled ? 'canceled' : ''}`} key={timeIndex}>*/}
                  {/*         <span className={`subjectName ${isCanceled ? 'canceled' : ''}`}>{subjectName}</span>*/}
                  {/*         <br />*/}
                  {/*         {substitutionTeacher ? (*/}
                  {/*            <span className="teacherName substitution">*/}
                  {/*               {substitutionTeacher.firstName} {substitutionTeacher.lastName}*/}
                  {/*            </span>*/}
                  {/*         ) : (*/}
                  {/*            <span className="teacherName">*/}
                  {/*               {regularTeacher.firstName} {regularTeacher.lastName}*/}
                  {/*            </span>*/}
                  {/*         )}*/}
                  {/*      </div>*/}
                  {/*   )*/}
                  {/*})}*/}
               </div>
         </div>
   )
}