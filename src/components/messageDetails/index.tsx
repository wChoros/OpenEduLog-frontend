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

      fetch(`${apiUrl}/content/received/${messageId}/`, {
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

   return (
      <section id="gradeDetails">
         <h1 className="dashboardSectionTitle">Grade Info</h1>
         <div className="gradeDetailsContainer">
            <header>
               <div className={'returnButton'}>
                  <a href={'/dashboard/student/grades'}>
                     <img src={'/icons/close.svg'} alt={'return'} />
                  </a>
               </div>
            </header>
            <div className="messageRecord">
               <div className="title">
                  <h2>{messageData?.title}</h2>
               </div>
               <div className="info">
                  <p>From: {messageData?.senderName}</p>
               </div>
               <div className="content">
                  <p>{messageData?.content}</p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Index
