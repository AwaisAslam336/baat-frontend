import React from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "@fontsource/rowdies";
import {
  Button,
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

const RightMenu = () => {
  const { user } = ChatState();
  const history = useHistory();
  function logoutUser() {
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  return (
    <div>
      <Menu>
        <MenuButton>
          <BellIcon fontSize="2xl" m={1} />
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
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
  );
};

export default RightMenu;
