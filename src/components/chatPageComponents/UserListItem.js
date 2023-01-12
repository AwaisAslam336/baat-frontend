import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const UserListItem = ({ user }) => {
  return (
    <Flex
      w={"100%"}
      px={3}
      py={2}
      mt={2}
      borderRadius="lg"
      color={"black"}
      bg={"#E8E8E8"}
      _hover={{
        bg: "#38B2AC",
        color: "white",
      }}
      cursor="pointer"
      alignItems={"center"}
    >
      <Avatar
        size="sm"
        mr={2}
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>{"Email: " + user.email}</Text>
      </Box>
    </Flex>
  );
};

export default UserListItem;
