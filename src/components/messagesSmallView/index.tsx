// @ts-ignore
import './style.sass'

export const messagesSmallView = () => {
   return (
      <div id={'new-messages'}>
         <div className="overlap-group">
            <div id={'header'}>Recent messages</div>
            <div className="message-item">
               <span className="sender">John Doe</span>
               <span className="message-preview">Hey, how are you?</span>
            </div>
            <div className="message-item">
               <span className="sender">Jane Smith</span>
               <span className="message-preview">Don't forget about the meeting!</span>
            </div>
            <div className="message-item">
               <span className="sender">Admin</span>
               <span className="message-preview">Your profile has been updated.</span>
            </div>
         </div>
      </div>
   )
}