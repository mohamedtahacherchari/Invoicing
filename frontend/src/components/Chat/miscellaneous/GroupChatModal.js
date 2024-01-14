import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../Chat/context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { ArrowCircleRight } from "@mui/icons-material";

const GroupChatModal = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const token = useSelector((state) => state.token);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [query, setQuery] = useState("");

  const { chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
  
      const { data } = await axios.get(`/api/user/allusers?search=${search}`,
      {
        headers: {Authorization: token}
      }
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleSearch2 = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    console.log("alalalalalalalal", query)
    try {
      setLoading(true);
     // console.log("Data received from server:", data);

      // const { data } = await axios.get(`api/user/allusers?search=${encodeURIComponent(query)}`, {
        const { data } = await axios.get(`http://localhost:5000/api/user/allusers?search=${encodeURIComponent(String(query))}`, {
  
      headers: { Authorization: token },
      });
      console.log("pmpmpm")
     /* const { data } = await axios.get(`api/user/allusers`, {
        params: { search: query },
        headers: { Authorization: token },
      });*/
      console.log(data,'gggggggggggggggggggggggggggggggggggggggggggg');
      console.log("TAHA")
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
 
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
console.log(selectedUsers)

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const userIds =  JSON.stringify(selectedUsers.map((u) => u._id));

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          //users: JSON.stringify(selectedUsers.map((u) => u._id)),
          users: userIds,
        },
        config
      );
    
      setChats([data, ...chats]);
      onClose();
    
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(users,"gjblgktjbitjhiobhjtnlkbjhkloimty")
    } catch (error) {
  console.error("Error creating chat:", error);

  let errorDescription = "Failed to create chat";
  
  if (error.response && error.response.data) {
    // Check if there's a more specific error message in the response data
    errorDescription = error.response.data.message || errorDescription;
  }

  toast({
    title: "Failed to Create the Chat!",
    description: errorDescription,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
}
  }
console.log(user._id)
  return (
    <>
      <span onClick={onOpen}> {children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" fontFamily="Work sans" d="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u?._id}
                  users={u?.firstName}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult.slice(0, 9).map((user) => (
                <UserListItem key={user?._id} user={user} handleFunction={() => handleGroup(user)} />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
            Créer un chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default GroupChatModal;
