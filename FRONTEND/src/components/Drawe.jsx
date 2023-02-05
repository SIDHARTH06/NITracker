import React from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    List,
    ListItem,
    Divider,
    HStack,
    Avatar,
    Container,
    Text,
    Spacer,
    ListIcon,
    useColorMode,
    useColorModeValue
    } from "@chakra-ui/react"
    import { useRouter } from 'next/router'

    import { DarkModeSwitch } from './DarkModeSwitch'
    import {getIcon} from '../lib'
import NavLink from './NavLink'


const Drawe = ({
    isOpen,
    onClose,
    links,
    user,
    signIn,
    signOut
}) => {

    const router = useRouter()

    


  return (
    <Drawer
    isOpen={isOpen}
    placement='left'
    onClose={onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Menu</DrawerHeader>

      <DrawerBody>
       <List spacing={3}>
              {
                    links.map((link) => (
                        <>
                        <ListItem 
                        
                      
                        padding={2}
                          key={link}
                            onClick={onClose}
                            
                            >
                                <ListIcon as={getIcon(link)} />
                                
                            
                            <NavLink key={link}
                            href={`/${link}`}
                            >{link}</NavLink>
                        </ListItem>
                        <Divider />
                        </>
                       
                    ))
                }
         </List>
         <HStack 
            mt={4}
            spacing={4}
            >
            
            {!user?<Button
                variant='outline'
                colorScheme='teal'

                onClick={() => {
                    signIn()
                    onClose()


                }
                }
                
                >
                Login
            </Button>:
            <Button
                variant='outline'
                colorScheme='teal'
                onClick={() => {
                    signOut()
                    onClose()
                }
                }
                >
                Logout
            </Button>
            }
        </HStack>

            

      </DrawerBody>
      <Divider />
      {user&&<DrawerFooter>
      <Container
        maxW='container.xl'
        mt={4}
        >
        <HStack
            spacing={4}
            >
            <Avatar
                size='sm'
                src={user?.image}
                cursor={'pointer'}
                />
            <Text
                cursor={'pointer'}
                >
                {user?.name}
            </Text>
            <Spacer />
            <DarkModeSwitch />

        </HStack>
        </Container>

            

        </DrawerFooter>}

     
     
    </DrawerContent>
  </Drawer>
  )
}

export default Drawe