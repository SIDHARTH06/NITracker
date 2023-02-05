import React from 'react'
import { Center,Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Divider,
    Container,
    Button,
    Icon,
    useColorModeValue,
    Circle,


} from '@chakra-ui/react'
//import google icon
import {FcGoogle} from 'react-icons/fc'
import { FaGoogle,FaShoppingBag} from 'react-icons/fa'


const login = () => {
  return (
    <Center 
        h="100vh"
        m="2px"
    
    >
        <Card
            w={{ base: "90%", sm: "400px" }}
            h="300px"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
            borderRadius="10px"
            pb={10}
            textAlign={"center"}
        >
            <CardHeader>
                <Heading
                    as="h1"
                    size="lg"
                    color="teal.500"
                    textAlign={"center"}
                    
                >
                    LOGIN
                </Heading>

            </CardHeader>
            <Divider/>
         
            <CardBody 
            
            >
                
                <Container
                h="200px"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={8}
                >
                    <Circle
                    size={"100px"}
                    bg={useColorModeValue('gray.100', 'gray.900')}
                    >
                       <Icon
            as={FaShoppingBag}
            w={12}
            h={12}
            color={useColorModeValue('teal', 'teal.300')}
            
            
            

            >
            </Icon> 
                    </Circle>
                    <Center
                
                    >
                    <Button
                    className='google-btn'
                    size={"lg"}
                    
                    leftIcon={<FcGoogle/>}
                    >
                         Sign in
                    </Button>
                    </Center>
                    </Container>
            </CardBody>
            </Card>
    </Center>

  )
}

export default login