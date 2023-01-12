import React, { useState } from "react";
import "@fontsource/rowdies";
import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
///////////////////////////////
import { Search2Icon } from "@chakra-ui/icons";
//import "@fontsource/rowdies";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
///////////////////////////////
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "@fontsource/rowdies";
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../common/ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import UserListItem from "./UserListItem";
//////////////////////////////////////////////////

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const history = useHistory();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();

  //////////////////////
  async function handleSearch() {
    if (!search) {
      toast({
        title: "Enter search keys to search.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  //////////////////////
  async function accessChat(user_id) {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      //access OR create&access new chat with selected user_id
      const { data } = await axios.post("api/chat", { user_id }, config);
      console.log(data);
      //check if chat is newly created? then add it in chats state
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      //close the drawer
      onClose();
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  //////////////////////
  function logoutUser() {
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  //////////////////////////////////////////////////////
  return (
    <Flex p="0.5rem" bg="white" justifyContent="space-between">
      {/* Drawer */}
      <>
        <Button ref={btnRef} colorScheme="gray" color="black" onClick={onOpen}>
          <Search2Icon marginRight="0.5rem" />
          Search User
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

            <DrawerBody>
              <Flex>
                <Input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search by name or email"
                />
                <Button onClick={handleSearch} ml={".5rem"} colorScheme="blue">
                  Go
                </Button>
              </Flex>

              {loading ? (
                <Loading />
              ) : (
                searchResult?.map((searchedUser) => {
                  return (
                    <UserListItem
                      key={searchedUser._id}
                      handleFunction={() => accessChat(searchedUser._id)}
                      user={searchedUser}
                    />
                  );
                })
              )}
              {loadingChat && <Spinner m={2} />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
      {/* Title */}
      <Text
        cursor={"pointer"}
        fontSize="2xl"
        fontFamily={"Rowdies"}
        color="gray"
      >
        BAAT
      </Text>
      {/* Right Menu */}
      <div>
        <Menu>
          <MenuButton>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Flex>
  );
};

export default Header;
