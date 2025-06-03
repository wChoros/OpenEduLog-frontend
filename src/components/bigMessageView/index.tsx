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
   const [previousButton, setPreviousButton] = useState<boolean>(true)
   const [nextButton, setNextButton] = useState<boolean>(true)

   // Combine both useEffect hooks into one to avoid dependency issues
   useEffect(() => {
      // Get offset from URL params
      const urlParams = new URLSearchParams(window.location.search)
      const offsetParam = urlParams.get('offset')
      const currentOffset = offsetParam ? parseInt(offsetParam) : 0

      // Only update offset state if it's different
      if (currentOffset !== offset) {
         setOffset(currentOffset)
      }

      // if current offset is 0, disable left button
      if (currentOffset <= 0) {
         setPreviousButton(false)
      } else {
         setPreviousButton(true)
      }

      // Get userId from cookie
      const userIdCookie = document.cookie.split('; ').find((row) => row.startsWith('user_id='))
      const userId = userIdCookie ? userIdCookie.split('=')[1] : null

      // @ts-ignore
      const apiUrl = import.meta.env.VITE_API_URL

      // Only fetch if we have a userId
      if (userId) {
         fetch(`${apiUrl}/messages/headers/received/${userId}/${currentOffset}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Cache-Control': 'no-cache',
            },
            credentials: 'include',
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.length < 20) {
                  setNextButton(false)
               } else {
                  setNextButton(true)
               }
               setMessageData(data)
            })
            .catch((error) => {
               console.error('Error fetching messages:', error)
            })
      }
   }, [window.location.search]) // Only depend on URL changes

   const handlePagination = (newOffset: number) => {
      // Prevent negative offsets
      const validOffset = newOffset < 0 ? 0 : newOffset
      window.location.href = `/dashboard/student/messages?offset=${validOffset}`
   }

   return (
      <>
         <section id="bigMessageView">
            <h1 className="dashboardSectionTitle">Messages</h1>
            <div className="messageContainer">
               <div className="navigation">
                  <button
                     onClick={() => handlePagination(offset - 20)}
                     className={`paginationButton ${!previousButton ? 'hidden' : ''}`}
                  >
                     <img src="/icons/arrow-left.svg" alt="previous page" />
                  </button>
                  <button
                     onClick={() => handlePagination(offset + 20)}
                     className={`paginationButton ${!nextButton ? 'hidden' : ''}`}
                  >
                     <img src="/icons/arrow-right.svg" alt="next page" />
                  </button>
               </div>
               {Array.isArray(messageData) && messageData.length > 0 ? (
                  messageData.map((data, i) => (
                     <div key={i} className={`messageRecord ${data.isRead ? 'read' : 'unread'}`}>
                        <a href={`/dashboard/student/messages/${data.messageId}`}>
                           <div className="messageAuthor">{data.senderName || 'John Doe'}</div>
                           <div className="messageContent">
                              <div className="messageTitle">{data.messageTitle}</div>
                              <div className="messageContent">{data.messageContent}</div>
                           </div>
                           <div className="messageDate">{formatDate(new Date(data.date))}</div>
                        </a>
                     </div>
                  ))
               ) : (
                  <div className="noMessages">No messages to display</div>
               )}
            </div>
         </section>
      </>
   )
}

export default Index
