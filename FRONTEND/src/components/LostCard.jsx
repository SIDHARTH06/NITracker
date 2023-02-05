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
    import { trimString } from '../lib'
    import { useRouter } from 'next/router'

const LostCard = ({item}) => {
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
        src={item.image.formats.thumbnail.url}
        alt='Green double couch with wooden legs'
        borderRadius='lg'
        maxH={'15rem'}
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{item.name}</Heading>
        <Text>
          {trimString(item.description, 100)}
        </Text>
       <Flex 
        alignItems='center'
        gap={3}
        wrap='wrap'


       >
         {/* {
            item.tags.map((tag, index) => (
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
       
        <Button variant='ghost' colorScheme='teal'
        onClick={() => {
          router.push(`/lost-item/${item.id}`)

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

export default LostCard