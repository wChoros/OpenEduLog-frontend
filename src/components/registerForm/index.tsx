//@ts-ignore
import './style.sass'

const registerForm = () => {
   return (
      <>
         <form id={'registerForm'}>
            <h2>Register</h2>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />

            <input type="email" placeholder="Email" />
            <input type="email" placeholder="Confirm Email" />

            <input type="tel" placeholder="Phone Number" />
            <input type="date" placeholder="Birthday" />

            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />

            <input type="text" placeholder="Username" />

            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Register</button>
         </form>
      </>
   )
}

export default registerForm
