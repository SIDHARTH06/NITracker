import React from 'react'
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useState } from 'react'
const SearchInput = ({items,setItems,setSearch}) => {
    
  return (
    <Stack spacing={3}>
        <InputGroup>
            <InputLeftElement
            pointerEvents='none'
            children={<Search2Icon color='gray.300' />}

            />
            <Input type='search' placeholder='Search '
            onChange={(e) => {
                console.log(e.target.value)
                setSearch(e.target.value)

                
            }
            }
            
            />
        </InputGroup>
    </Stack>


  )
}


export default SearchInput