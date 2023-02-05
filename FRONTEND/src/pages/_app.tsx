import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps,session }: AppProps) {
  return (
    <SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <NavBar
      user={session?.user}
      />
      <Component {...pageProps}
      user={session?.user}
      />
    </ChakraProvider>
    </SessionProvider>
  )
}



export default MyApp

