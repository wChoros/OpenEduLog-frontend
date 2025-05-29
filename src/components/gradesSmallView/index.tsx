// @ts-ignore
import './style.sass'

const grades = [
   {subject: 'Math', grade: 'A'},
   {subject: 'Science', grade: 'B'},
   {subject: 'History', grade: 'C'},
   {subject: 'English', grade: 'A'},
   {subject: 'Art', grade: 'B'},
];

export const GradesSmallView = () => {
   return (
      <div className="new-grades">
         <div className="overlap-group">
            <div id={'header'}>Recent grades</div>

               {grades.map((item, index) => (
                  <div className="subject-grade" key={index}>
                     <span className="subject">{item.subject}</span>
                     <span className="grade">{item.grade}</span>
                  </div>
               ))}

         </div>
      </div>
   )
}