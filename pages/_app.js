import 'normalize.css';
import '../styles/reset.css';
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  	return (
		<SessionProvider session={session}>

			<Component {...pageProps} />
		</SessionProvider>
	  )
}

export default MyApp
