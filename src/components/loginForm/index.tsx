// @ts-ignore
import './style.sass'

const index = () => {
   return (
      <>
         <form id={'loginForm'}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
         </form>
      </>
   )
}

export default index
