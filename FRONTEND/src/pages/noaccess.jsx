import React from 'react'
import {
    Image,
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Container,
} from '@chakra-ui/react'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/router';

const noaccess = () => {
    const router = useRouter();
  return (
   <></>
  )
}

export default noaccess