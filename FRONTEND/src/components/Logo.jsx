import React from 'react'
import { HStack, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { FaShoppingBag } from 'react-icons/fa'
import {
  FaSearchLocation
} from 'react-icons/fa'

const Logo = () => {
  return (
    <HStack spacing={2}>
    <Link
    href={'#'}
    title={'Logo'}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    
    >
    <Icon w={8} h={8}
    color={useColorModeValue('teal.500', 'teal.300')}
    >
        <FaSearchLocation
        size={'1.3rem'}
        />
    </Icon>


    
    <Text
    fontSize={'lg'}
    fontWeight={'bold'}
    color={useColorModeValue('teal.500', 'teal.300')}
    >
    NITracker
</Text>
    </Link>
</HStack>
  )
}

export default Logo