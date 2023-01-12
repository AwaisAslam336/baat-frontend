import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";

const MyChats = () => {
  const { user, setSelectedChat, selectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  /////////////////
  function getSender(users) {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  }
  /////////////////
  async function fetchChats() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      //get all the chats
      const { data } = await axios.get("api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error fetching the chats",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  /////////////////
  useEffect(() => {
    fetchChats();
  }, []);
  ///////////////
  return (
    <Box
      // display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      h={"100%"}
      w={["100%", "100%", "100%", "31%"]}
      flexDir={"column"}
      borderRadius={"lg"}
      bg="white"
      padding={3}
      // alignItems={"stretch"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          fontSize={["24px", "28px", "30px", "22px", "26px", "30px"]}
          fontFamily={"sans-serif"}
        >
          My Chats
        </Text>
        <Button
          fontSize={["12px", "14px", "17px", "12px", "14px", "17px"]}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Flex>
      {chats?.map((chat) => {
        return (
          <Flex
            w={"100%"}
            px={3}
            py={2}
            mt={2}
            flexDir={"column"}
            borderRadius="lg"
            color={selectedChat === chat ? "white" : "black"}
            bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
            cursor="pointer"
            alignItems={"start"}
          >
            <Text>
              {chat.isGroupChat ? chat.chatName : getSender(chat.users)}
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default MyChats;
