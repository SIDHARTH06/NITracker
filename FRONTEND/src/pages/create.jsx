import React from "react";
//import Select from 'react-select';
import CreatableSelect from "react-select/creatable";

import { getSession } from "next-auth/react";
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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useColorModeValue,
  LightMode,
  Form,
  RadioGroup,
  Radio,
  Stack,
  
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import GooglePicker from "react-google-picker";



const create = ({ session,user }) => {
  const genRefId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    dateLost: "",
    image: null,
    category: "lost",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(session.id);

    if(!formData.name || !formData.description || !formData.location || !formData.dateLost || !formData.image){
      alert("Please fill all the fields");
      return;
    }

    if(formData.category === "lost"){


    try {
      // Create the blog post
      const postData = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        date: formData.dateLost,
        user:{ id:session.id},
        category:'lost'
      };
      const postResponse = await axios.post(
        "http://localhost:1337/api/lost-items",
        { data: postData }
      );
      const blogPostId = postResponse.data.data.id;

      // Upload the thumbnail image
      const fileData = new FormData();
      fileData.append("files", formData.image);
      fileData.append("refId", blogPostId);
      fileData.append("ref", "api::lost-item.lost-item");
      fileData.append("field", "image");
      const uploadResponse = await axios.post(
        "http://localhost:1337/api/upload",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(uploadResponse.data);
      alert("Item created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating item");
    }
  } 
  else if(formData.category=='found') {
    try {
      // Create the blog post
      const postData = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        date: formData.dateLost,
        user:{ id:session.id},
        category:'lost'
      };
      const postResponse = await axios.post(
        "http://localhost:1337/api/found-items",
        { data: postData }
      );
      const blogPostId = postResponse.data.data.id;

      // Upload the thumbnail image
      const fileData = new FormData();
      fileData.append("files", formData.image);
      fileData.append("refId", blogPostId);
      fileData.append("ref", "api::found-item.found-item");
      fileData.append("field", "image");
      const uploadResponse = await axios.post(
        "http://localhost:1337/api/upload",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(uploadResponse.data);
      alert("Item created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating item");
    }


  }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  return (
    <Box p={5}>
      <Flex
        mb={5}
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        wrap="wrap"
      >
        <Heading as="h1" size="xl" mb={3} alignSelf="start">
          Create New Entry
        </Heading>
      </Flex>
      <Divider mb={5} />

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Item Name
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Description
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Location
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
            name="location"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Date Lost
          </FormLabel>
          <Input
            type="date"
            value={formData.dateLost}
            onChange={handleChange}
            name="dateLost"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Image
          </FormLabel>
          <Input type="file" onChange={fileChangeHandler} name="image" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel fontWeight={"bold"} fontSize="xl">
            Category
          </FormLabel>
          <Input type="text" value={formData.category} name="category"
          onChange={handleChange}
          />
        </FormControl>

        <Button mt={4} type="sumbit" colorScheme={"teal"}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default create;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }
  else {
    const res= await axios.get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
        },
        });
        console.log(res.data);
        return {
          props: {
            session: session,
            user: res.data,
          },
  }
}
}


