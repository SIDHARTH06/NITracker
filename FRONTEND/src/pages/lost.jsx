
import React from 'react'
import { getSession } from 'next-auth/react'
import {
  Box,
  Flex,
  Avatar,
  Container,
  SimpleGrid,
  HStack,
  Link,
  IconButton,
  Button,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Image,
  Text,



} from '@chakra-ui/react'
import LostCard from '../components/LostCard';
import { useState } from 'react';
import axios from 'axios';

import  SearchInput  from '../components/SearchInput'


const index = ({data}) => {
  const [items, setItems] = useState(
    data
  )

  const [search,setSearch] = React.useState('')


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
        Recently Lost
      </Heading>
      <SearchInput 
      items={items}
      setItems={setItems}
      search={search}
      setSearch={setSearch}
      />
      </Flex>
      
      <Divider
      mb={5}
      />
      

<SimpleGrid
columns={{ sm: 2, md: 3,lg: 4, xl: 4 }}
spacing={5}
>
{items.filter((item) => {
  if (search == "") {
    return item
  } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
    return item
  }
}).map((item) => (
  <LostCard
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
    const res = await axios.get('http://localhost:1337/api/lost-items/all')
    const data = await res.data
    console.log(data)
    return {
      props: { data:data },
    }


  }
}