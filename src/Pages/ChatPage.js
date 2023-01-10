import React, { useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Header from "../components/chatPageComponents/Header";
import MyChats from "../components/chatPageComponents/MyChats";
import ChatBox from "../components/chatPageComponents/ChatBox";
import { useHistory } from "react-router-dom";

const ChatPage = () => {
  const { user } = ChatState();
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === null || userInfo === undefined) {
      history.push("/");
    }
  }, []);

  return (
    <Box w="100%">
      {user && <Header />}
      <Flex p="2rem">
        {user && <MyChats />}
        <Spacer />
        {user && <ChatBox />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
