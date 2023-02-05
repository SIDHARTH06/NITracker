import React from 'react'
import {
  Center,
  Container
} from '@chakra-ui/react'
import {useEffect} from 'react'
import {useState} from 'react'
//server session
import { getSession } from 'next-auth/react'

import {
  Heading,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Spinner,
  Badge,Divider
  

  } from '@chakra-ui/react'

const index = () => {
  const [mails, setMails] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    //get the mails of current user using gmail api
    //get the mails of current user using gmail api

    const getMails = async () => {
      const response = await fetch('/api/getMails')
      const data = await response.json()
      console.log(data)
      setMails(data)
      setLoading(false)
    }
    getMails()
  }, [])
  return (
    <Container maxW="container.xl" p={3}>
      <Heading as="h1" size="2xl" mb={4}>
        In The Mail
      </Heading>
      <Divider mb={4}/>
      <Text mb={4}>
        This is a list of mails from your gmail account.
      </Text>
      {!loading&&<Container maxW="container.xl">
      <Accordion allowToggle>
        {mails.map((mail) => (
          <AccordionItem key={mail.id}>
            <AccordionButton>
              <Box flex="1" textAlign="left">

                <Text fontWeight="bold"
                color={useColorModeValue('gray.900', 'white')}
                >{mail.subject}</Text>
                <Text fontSize="sm"
                color={useColorModeValue('gray.500', 'gray.200')}
                >{mail.sender}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Badge colorScheme="teal" mr={2}
              size="md"
              >{mail.date}</Badge>
              <Text>{mail.body}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>}
    {loading&&
    <Center
   
    >
    
    <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="teal.500"
    size="xl"
  />
  </Center>
  }
    </Container>

  )
}

export default index

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  //get the mails of current user using gmail api
  //get the mails of current user using gmail api
 
  return {
    props: {session,},
    //get the mails of current user using gmail api
    
    
  }
}