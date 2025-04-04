import React, { useEffect, useState } from 'react'
// @ts-ignore
import './style.sass'

interface Message {
   id: number
   title: string
   content: string
   date: Date
   senderId: number
   senderName: string
   receivers: {
      id: number
      name: string
      isRead: boolean
   }[]
}

const Index: React.FC = () => {
   // Store an array of grades
   const [messageData, setMessageData] = useState<Message>()

   const [messageId] = useState(() => {
      return window.location.pathname.split('/').pop()
   })

   useEffect(() => {
      // Get gradeId from URL

      // @ts-ignore
      const apiUrl = import.meta.env.VITE_API_URL

      fetch(`${apiUrl}/messages/content/received/${messageId}/`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((data) => {
            setMessageData(data)
         })
         .catch((error) => {
            console.error('Error fetching grades:', error)
         })
   }, [messageId])

   if (!messageData) {
      return "Error fetching data"
   }

   return (
      <section id="gradeDetails">
         <h1 className="dashboardSectionTitle">Message Info</h1>
         <div className="messageDetailsContainer">
            <header>
               <div className={'returnButton'}>
                  <a href={'/dashboard/student/messages'}>
                     <img src={'/icons/close.svg'} alt={'return'} />
                  </a>
               </div>
            </header>
            <div className="messageRecord">
               <div className='messageField'>
                  <div className='messageFieldName'>
                     Subject:
                  </div>
                  <div className='messageFieldContent'>
                     {messageData.title}
                  </div>
               </div>
            </div>
            <div className="messageRecord">
               <div className='messageField'>
                  <div className='messageFieldName'>
                     Date:
                  </div>
                  <div className='messageFieldContent'>
                     {new Date(messageData.date).toLocaleDateString()}
                  </div>
               </div>
            </div>
            <div className="messageRecord">
               <div className='messageField'>
                  <div className='messageFieldName'>
                     From:
                  </div>
                  <div className='messageFieldContent'>
                     {messageData.senderName}
                  </div>
               </div>
            </div>
            <div className="messageRecord">
               <div className='messageField'>
                  <div className='messageFieldName'>
                     Content:
                  </div>
                  <div className='messageFieldContent'>
                     {messageData.content}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Index
