import loginForm from '../components/loginForm/index.js'

export default function Page(props: { message: string }) {
   return (
      <>
         <h1>{props.message}</h1>
         {loginForm()}
      </>
   )
}
