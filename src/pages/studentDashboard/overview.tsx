import { timetableSmallView } from '../../components/timetableSmallView/index.tsx';
import {GradesSmallView} from '../../components/gradesSmallView/index.tsx';
import {messagesSmallView} from '../../components/messagesSmallView/index.js'

export default function Page() {
   return <>{timetableSmallView()}
      <section>
         {GradesSmallView()}
         {messagesSmallView()}
      </section>
      </>

}
