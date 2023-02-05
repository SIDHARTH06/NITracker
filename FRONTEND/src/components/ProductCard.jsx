import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    ButtonGroup,
    Button,
    useColorModeValue,
    Badge,
    Flex
    } from '@chakra-ui/react'
    
    import {FaShoppingCart} from 'react-icons/fa'
    import {RiHeartAddLine} from 'react-icons/ri'
    import { useRouter } from 'next/router'
    import { trimString} from '../lib'
import { getImage } from '../lib'
    

const ProductCard = ({item}) => {
  const router = useRouter()

  return (
    <Card maxW='sm'
    pos={'relative'}
    >
      <Badge
        pos='absolute'
        top='1.5rem'
        left='1.5rem'
        bg={useColorModeValue('green.500', 'green.300')}
        color={useColorModeValue('white', 'gray.800')}
        rounded='full'

        px='2'
        py='1'
      >
        {item.date}</Badge>
    <CardBody
    
    >
      <Image
        src={getImage(item)}
        alt='Green double couch with wooden legs'
        borderRadius='lg'
        maxH={'15rem'}
        mx='auto'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{item.name}</Heading>
        <Text>
           {item.description}
        </Text>
       <Flex 
        alignItems='center'
        gap={3}
        wrap='wrap'


       >
         {/* {
            item.found_tags.map((tag, index) => (
              <Badge
              key={index}
              colorScheme='teal'
              >
                {tag}
              </Badge>
            ))

         } */}
        </Flex>


      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        {/* <Button variant='solid' colorScheme='teal' 
        leftIcon={<RiHeartAddLine />}
        >
          Claim
        </Button> */}
        <Button variant='ghost' colorScheme='teal'
        onClick={
          () => {
          
            router.push(`/found-item/${item.id}`)
          }
        }
        >
          Details
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  )
}

export default ProductCard