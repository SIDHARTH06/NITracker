import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Badge,
  Icon,
  ListIcon,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImage } from "../../../lib";

export default function Simple({ item, session }) {
  const handleSendMail = async () => {
    console.log("in mail");
    const res = await axios.post(
      "http://localhost:9000/sendmail",
      {
        subject: `${item.name} is found by ${session.user.name}`,
        body: `${item.name} with description ${item.description} is found by ${session.user.name} please contact him/her at ${session.user.email}`,
        email: item.user.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    if (res.status === 200) {
      alert("Mail sent successfully");
    } else {
      alert("Mail not sent");
    }
  };

  const router = useRouter();

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              item?.image?.formats?.medium?.url ||
              item?.image?.formats?.thumbnail.url
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {item.name}
            </Heading>
            <Flex mt={5} alignItems={"center"} flexWrap={"wrap"}>
              {/* {item.tags.map((tag, index) => (
                      <Badge
                      key={index}
                      borderRadius={'full'}
                      px={2}
                      colorScheme={'teal'}
                      size={'lg'}
                      py={1}
                      mr={2}
                     
                      >
                      {tag}
                      </Badge>
                  ))} */}
            </Flex>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{item.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                More Information
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem fontSize={{ base: "16px", lg: "18px" }}>
                    <ListIcon
                      as={FaLocationArrow}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontSize={"20px"}
                      mr={2}
                    />

                    {item.location}
                  </ListItem>
                  <ListItem>
                    <ListIcon
                      as={FaCalendarAlt}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontSize={"20px"}
                      mr={2}
                    />
                    {item.date}
                  </ListItem>{" "}
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                USER INFORMATION
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Name:
                  </Text>{" "}
                  {item.user.firstname + " " + item.user.lastname}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Email:
                  </Text>{" "}
                  {item.user.email}
                </ListItem>
                {/* <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                      Phone:
                  </Text>{' '}
                  {item.user.phone}
                </ListItem> */}
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleSendMail}
          >
            Found Item
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  //get the mails of current user using gmail api
  //get the mails of current user using gmail api
  else {
    const res = await fetch(`http://localhost:1337/api/lost-items/${id}`);
    const data = await res.json();
    console.log(data);
    return {
      props: {
        item: data,
        session,
      },
    };
  }
}
