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

const NoAccess = () => {
  return (
    <Container maxW="container.xl">
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={12}
    >
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src="/unauthorized.svg"
          alt="Segun Adebayo"
          border={0}

          p={4}
          sizes="100%"
        />
        </Box> 
        <Heading as="h1" size="2xl" my={4}
        align="center"
        >
          You are not authorized to view this page
        </Heading>
        <Text fontSize="xl" my={4}>
          Please sign in to view this page
        </Text> 
        <Button
          onClick={async() => {
            await signIn()
           
          

          }
          }
          colorScheme="teal"
          variant="outline"
          size="lg"
          my={4}
        >
          Sign In
        </Button>
       
      </Flex>
    </Container>

  )
}

export default NoAccess