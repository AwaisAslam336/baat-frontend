import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Container
      display={"flex"}
      maxWidth={["3xl", "4xl", "5xl", "6xl"]}
      flexDirection={["column", "column", "column", "row"]}
    >
      <Text
        fontSize={["6xl", "7xl", "8xl"]}
        fontFamily="Work Sans"
        color={"white"}
        width="90%"
        textAlign={"center"}
        alignSelf={["center", "center", "center", "auto"]}
      >
        Baat
      </Text>
      <Box
        bg={"white"}
        width="90%"
        h={"min"}
        p={[3, 4]}
        borderRadius="lg"
        borderWidth="1px"
        alignSelf={["center", "center", "center", "auto"]}
        m={["30px", "40px", "60px", "70px"]}
      >
        <Tabs w="100%" variant="soft-rounded" colorScheme="pink">
          <TabList mb={"1em"}>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
