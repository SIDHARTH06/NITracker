import React from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Divider,
  List,
  ListItem,
  Text,
  Box,
  Spacer,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const history = ({items,lostItems}) => {

  const router = useRouter();

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={3}>
        History
      </Heading>
      <Divider mb={5} />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
            _selected={{
              color: "white",
              bg: "teal.500",
            }}
          >
            Found
          </Tab>
          <Tab
            _selected={{
              color: "white",
              bg: "teal.500",
            }}
          >
            Lost
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <List spacing={3}>
              
              {items.map((item) => {
                return (
                  <ListItem p={5} shadow="md" borderWidth="1px">
                <Flex
                alignItems={'center'}
                >
                    <Box>
                  <Heading fontSize="xl">{item.name}</Heading>
                  <Text mt={4}>Found on {item.date}</Text>
                    </Box>
               
                <Spacer />
                <ButtonGroup size="sm">
                  <Button colorScheme="teal" variant="outline"
                  onClick={() => {
                    router.push(`/found-item/${item.id}`)
                  }
                  }
                  >
                    Details
                  </Button>
                  <Button colorScheme="teal" variant="outline"
                   onClick={() => {
                    router.push(`/similar/found/${item.id}`)
                  }
                }
                 
                  >
                    Similar
                  </Button>
                </ButtonGroup>
                </Flex>
              </ListItem>
                );
              })}
            </List>
          </TabPanel>
          <TabPanel>
            <List spacing={3}>
              {lostItems.map((item) => {
                return (
                  <ListItem p={5} shadow="md" borderWidth="1px">
                <Flex
                alignItems={'center'}
                >
                    <Box>
                  <Heading fontSize="xl">{item.name}</Heading>
                  <Text mt={4}>Lost on {item.date}</Text>
                    </Box>
                    <Spacer />
                <ButtonGroup size="sm">
                  <Button colorScheme="teal" variant="outline"
                  onClick={() => {
                    router.push(`/lost-item/${item.id}`)
                  }
                  }
                  >
                    Details
                  </Button>
                  <Button colorScheme="teal" variant="outline"
                   onClick={() => {
                    router.push(`/similar/lost/${item.id}`)
                  }
                }
                  >
                    Similar
                  </Button>
                </ButtonGroup>
                </Flex>
              
              </ListItem>
                );
              })}
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default history;


export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }


  else {
    //get found items corresponding to the user
    const foundItems = await axios.get(
      `http://localhost:1337/api/found-items/all`)
    const foundItemsData = await foundItems.data
    const items = foundItemsData.filter((item) => {
      if (item.user.email == session.user.email) {
        return item
      }
    })

    
    //get lost items corresponding to the user

    const lostItems = await axios.get(
      `http://localhost:1337/api/lost-items/all`)
    const lostItemsData = await lostItems.data
    const lostItemsFiltered = lostItemsData.filter((item) => {
      if (item.user.email == session.user.email) {
        return item
      }
    })

    return {
      props: {
        items,
        lostItems: lostItemsFiltered
      },


  }
}
}
