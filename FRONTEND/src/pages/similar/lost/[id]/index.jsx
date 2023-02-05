import React from 'react'

import { getSession } from 'next-auth/react'
import axios from 'axios'

import {
    Heading,
    Divider,
    Box,
    Flex,
    Text,
    Button,
    SimpleGrid,
    HStack,
    IconButton,
    Link,

} from '@chakra-ui/react'

import ProductCard from '../../../../components/ProductCard'

const index = ({items}) => {
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
            Similar Findings
        </Heading>
        </Flex>
        <Divider
        mb={5}
        />
        <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={5}
        >
            {/* <ProductCard />
            <ProductCard />
            <ProductCard /> */}
            {items.map((item) => (
                <ProductCard
                key={item.id}
                item={item}
                />
            ))}
            
          
            </SimpleGrid>
            </Box>
            
  )
}

export default index

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const { id } = context.query
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
      const res = await fetch(`http://localhost:1337/api/lost-items/${id}`)
      const data = await res.json()
      console.log(data)

      const res1=await axios.get(`http://localhost:9000/mllost`,{
        data
      })
        const data1=await res1.data
        console.log(data1)
      return {
        props: {
          items: data1,
        }
      }
    }
  }