import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Text,
  Divider,
  HStack,
  Avatar,
  Container,
  Spacer,
  inputLeftElement,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'


const editProfile = ({user}) => {
  const { data: session } = useSession()
  return (
   <>
      <Heading
        as='h1'
        size='xl'
        mb={3}
        alignSelf='start'
        textAlign={{ base: 'center', md: 'center' }}
      >
        Edit Profile
      </Heading>
      <Divider
        mb={5}
      />
    
        <Box
          p={5}
          width={'100%'}
          display={'flex'}
          justifyContent='center'
          wrap='wrap'
        >
          <Avatar
            size='2xl'
            name='Dan Abrahmov'
            src={session?.user.image}
          />
        </Box>
        <Container
          p={5}
          width={'100%'}
          >
        <Box
          p={5}
          width={'100%'}
          display={'flex'}
          justifyContent='center'
          wrap='wrap'
        >
          
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input type='email'
            value={session?.user.email}
            disabled={true}
            />
          </FormControl>
        </Box>
        <Box
          p={5}
          width={'100%'}
          display={'flex'}
          justifyContent='center'
          wrap='wrap'
        >
          <FormControl id='name'>
            <FormLabel>Name</FormLabel>
            <Input type='name'
            value={session?.user.name}
            disabled={true}
            />
          </FormControl>
        </Box>
        <Box
          p={5}
          width={'100%'}
          display={'flex'}
          justifyContent='center'
          wrap='wrap'
        >
      </Box>
     
      <Box
        p={5}
        width={'100%'}
        display={'flex'}
        justifyContent='center'
        wrap='wrap'
      >
        <FormControl id='phone'>
          <FormLabel>Phone Number</FormLabel>
          <Input type='phone'
          vallue={session?.user.phone|| 'Not Provided'}
          />
        </FormControl>
      </Box>
      <Button
        colorScheme='teal'
        variant='outline'
        size='lg'
        width={'100%'}
        display={'flex'}
        justifyContent='center'
        wrap='wrap'
      >
        Save
      </Button>
      </Container>
      </>

)
}


    
      
      

     

 

export default editProfile