import React from 'react'
import { getSession } from 'next-auth/react'

import {
    Box,
    Flex,
    Avatar,
    Container,
    Heading,
    Divider,
    IconButton,
    HStack,
    Spacer,
    Text,
    Card,
    Image,
    CardHeader,
    CardBody,
    SimpleGrid,
    Button,

    

    

} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import {FaEdit} from 'react-icons/fa'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
const profile = ({userData}) => {
    const router = useRouter()
    const { data: session } = useSession()
  return (
   <><Box
          p={5}
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            alignItems={'center'}

      >
          <HStack
              mb={5}
              width={'100%'}
              display={'flex'}
              justifyContent='center'


          >
              <Heading
                  as='h1'
                  size='xl'
                  textAlign={{ base: 'center', md: 'center' }}
                  ml={10}

              >
                  PROFILE
              </Heading>
{/* 
              <IconButton
                  aria-label='Profile'
                  colorScheme='teal'
                  icon={<FaEdit />} /> */}
          </HStack>



          <Divider
              mb={5} />
      </Box><Container
          maxW={'container.xl'}
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          alignItems={'center'}
          
      >
              <Card
                    width={'100%'}
                    
                    borderRadius="lg"
                    overflow="hidden"
                    mb={5}
                   

                >
                    <CardHeader
                        p={5}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <HStack spacing="24px">
                            <Avatar
                                size="lg"
                                name={session?.user.name}
                                src={session?.user.image}
                            />
                            <Box>
                                <Heading fontSize="xl" fontWeight="semibold">
                                    {session?.user.name}
                                </Heading>
                                <Text fontSize="sm" color="gray.500">
                                    {session?.user.email}
                                </Text>
                            </Box>
                        </HStack>
                    </CardHeader>
                    <CardBody p={5}>
                        <Divider />
                        <SimpleGrid
                            columns={{ sm: 2, md: 3, lg: 4, xl: 4 }}
                            spacing={5}
                            mt={5}
                        >
                            <Box>
                                <Heading fontSize="md" fontWeight="semibold">
                                    Phone
                                </Heading>
                                <Text fontSize="sm" color="gray.500">
                                    +1 123 456 7890
                                </Text>
                            </Box>
                            <Box>
                                <Heading fontSize="md" fontWeight="semibold">
                                    Joined on
                                </Heading>
                                <Text fontSize="sm" color="gray.500">
                                    {
                                        new Date(userData.createdAt).toLocaleDateString()
                                    }
                                </Text>
                            </Box>
                            <Box>
                                <Button
                                    colorScheme="teal"
                                    variant="outline"
                                    size="sm"
                                    width="100%"
                                >
                                    Edit
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    colorScheme="teal"
                                    variant="outline"
                                    size="sm"
                                    width="100%"
                                    onClick={() => {
                                        router.push('/history')

                                     }
                                    }

                                >
                                    History
                                </Button>
                            </Box>

                        </SimpleGrid>

                        
                    </CardBody>


                  
                </Card>
        </Container>
        </>
    )
}

export default profile


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      }

     //current user infor STRAPI using axios
   

     
    }

    else {
    //get the mails of current user using gmail api
    //get the mails of current user using gmail api
    const res = await axios.get(`http://localhost:1337/api/users/me`,{
        headers: {
            Authorization: `Bearer ${session.jwt}`,
            },
    })
    const data = await res.data
    console.log(data)
   
    return {
      props: {session,userData:data},
      //get the mails of current user using gmail api
      
      
    }
}
  }