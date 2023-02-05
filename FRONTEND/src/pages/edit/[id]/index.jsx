import React from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Divider,
    HStack,
    Avatar,
    Container,
    Spacer,
    inputLeftElement,
    Box,
    Heading,
    Flex,
    useColorModeValue,
    LightMode,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Image,
    Textarea,
} from '@chakra-ui/react'
import {
    CreatableSelect,
} from 'react-select/creatable'

const index = () => {
  return (
    <Box
    p={5}
    >
         <Flex
      mb={5}
      width={'100%'}
      display={'flex'}
      justifyContent='space-between'
      wrap='wrap'
      >
      <Heading
      as='h1'
      size='xl'
      mb={3}
      alignSelf='start'
      >
        Create New Entry
      </Heading>
      
      </Flex>
      <Divider
      mb={5}
      />


<FormControl mb={4} >
  <FormLabel fontWeight={'bold'} fontSize='xl'>Item Name</FormLabel>
  <Input type='text' placeholder='Enter Name'/>
</FormControl>

<FormControl mb={4}>
  <FormLabel fontWeight={'bold'} fontSize='xl'>Description</FormLabel>
  <Input type='text' placeholder='Enter Description'/>
</FormControl>

<FormControl mb={4}>
  <FormLabel fontWeight={'bold'} fontSize='xl'>Location</FormLabel>
  <Input type='text' placeholder='Enter Location'/>
</FormControl>

<FormControl mb={4}>
  <FormLabel fontWeight={'bold'} fontSize='xl'>Date Lost</FormLabel>
  <Input type='date' placeholder='Enter Description'/>
</FormControl>

<FormControl mb={4}>
  <FormLabel fontWeight={'bold'} fontSize='xl'>Image</FormLabel>
  
  <Input type='file' p={2} placeholder='Choose image'/>
</FormControl>

{/* <CreatableSelect 
   

    // defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    isCreatable
    // options={colourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    
  /> */}

    <Button mt={4} type="sumbit"colorScheme={"teal"} >Submit</Button>
    </Box>
  )
}

export default index


export async function getServerSideProps(context) {
    const session = await getSession(context)

    const id= context.params.id
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
   
    else {
      const res = await axios.get('http://localhost:1337/api/found-items/')
      const data = await res.data
      console.log(data.data)
      return {
        props: { data:data },
      }
  
  
    }
  }