import React from "react";
import {  useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import {
    Link as ChakraLink,
} from "@chakra-ui/react";
export default function NavLink({ children }) {
    return (
       
            <ChakraLink
            as={Link}
            href={
            children === "Found"?"/":"/"+children.toLowerCase()

            }
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("gray.200", "gray.700"),
                }}
            >
                {children}
            </ChakraLink>

            
        
    );
}