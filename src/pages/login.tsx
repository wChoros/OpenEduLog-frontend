import loginForm from '../components/loginForm/index.js'
import navigationHeader from '../components/navigationHeader/index.js'
import homeFooter from '../components/homeFooter/index.js'

// @ts-ignore
import '../../public/styles/global-big.sass'
export default function Page(props: { message: string }) {
   return (
      <>
         {navigationHeader()}
         <section>
            <h1>{props.message}</h1>
            {loginForm()}
         </section>
         {homeFooter()}
      </>
   )
}
