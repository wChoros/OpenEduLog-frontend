import { useState, useEffect } from 'react'
//@ts-ignore
import './style.sass'

interface MessageRecord {
   messageId: number
   messageTitle: string
   messageContent: string
   date: Date
   isRead: boolean
   senderId: number
   senderName: string
}

function formatDate(date: Date): string {
   const today = new Date(Date.now())

   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ]

   if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() == today.getDate()
   ) {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
   } else {
      return `${date.getDate()} ${months[date.getMonth()]}`
   }
}

const Index: React.FC = () => {
   const [messageData, setMessageData] = useState<MessageRecord[]>([])
   const [offset, setOffset] = useState<number>(0)

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const offsetParam = urlParams.get('offset')
      setOffset(offsetParam ? parseInt(offsetParam) : 0)
   }, [])

   useEffect(() => {
      // get userId from cookie
      const userIdCookie = document.cookie.split('; ').find((row) => row.startsWith('user_id='))
      const userId = userIdCookie ? userIdCookie.split('=')[1] : null

      // @ts-ignore
      const apiUrl = import.meta.env.VITE_API_URL
      fetch(`${apiUrl}/messages/headers/received/${userId}/${offset}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((data) => {
            setMessageData(data)
         })
         .catch((error) => {
            console.error('Error fetching messages:', error)
         })
   }, [offset])

   return (
      <>
         <section id="bigMessageView">
            <h1 className="dashboardSectionTitle">Messages</h1>

            <div className="messageContainer">
               <div className="navigation">
                  <a
                     href={`/dashboard/student/messages?offset=${offset - 20 < 0 ? 0 : offset - 20}`}
                  >
                     <img src="/icons/arrow-left.svg" alt="previous week" />
                  </a>
               </div>
               <div className="nextWeekButton">
                  <a href={`/dashboard/student/messages?offset=${offset + 20}`}>
                     <img src="/icons/arrow-right.svg" alt="next week" />
                  </a>
               </div>

               {Array.isArray(messageData) &&
                  messageData.map((data, i) => (
                     <div key={i} className={`messageRecord ${data.isRead ? 'read' : 'unread'}`}>
                        <a href={`/dashboard/student/messages/${data.messageId}`}>
                           <div className="messageAuthor">John Doe</div>
                           <div className="messageContent">
                              <div className="messageTitle">{data.messageTitle}</div>
                              <div className="messageContent">{data.messageContent}</div>
                           </div>
                           <div className={'messageDate'}>{formatDate(new Date(data.date))}</div>
                        </a>
                     </div>
                  ))}
            </div>
         </section>
      </>
   )
}

export default Index
