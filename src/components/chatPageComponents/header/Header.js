import React from "react";
import "@fontsource/rowdies";
import { Flex, Text } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import RightMenu from "./RightMenu";
///////////////////////////////
import { Search2Icon } from "@chakra-ui/icons";
//import "@fontsource/rowdies";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
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
import { ChatState } from "../../../context/ChatProvider";
import ProfileModal from "../../common/ProfileModal";
import { useHistory } from "react-router-dom";
//////////////////////////////////////////////////

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { user } = ChatState();
  const history = useHistory();
  function logoutUser() {
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  return (
    <Flex p="0.5rem" bg="white" justifyContent="space-between">
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
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
      <Text
        cursor={"pointer"}
        fontSize="2xl"
        fontFamily={"Rowdies"}
        color="gray"
      >
        BAAT
      </Text>
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
