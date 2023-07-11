/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  Button,
  Text,
  useDisclosure,
  Tbody,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Thead,
} from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";
import {
  KeycapProfileForm,
  KeycapProfileFormValues,
} from "../form/keycap-profile.form";
import { useEffect, useState } from "react";
import { useFetchKeycapProfiles } from "../../../hooks/part-data-hooks/get-all/keycap-profile.get-all.hook";
import { Pagination } from "../../paging/pagination/pagination";

export const KeycapProfileView = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getKeycapProfiles, getKeycapProfilesRes } = useFetchKeycapProfiles();
  const {
    isOpen: isOpenForm,
    onClose: onCloseForm,
    onOpen: onOpenForm,
  } = useDisclosure();
  useEffect(() => {
    getKeycapProfiles(0).then(() => setCurrentPage(1));
  }, []);
  return (
    <Box w={"100%"}>
      <Flex
        color={"#343434"}
        bgColor={"rgba(255,255,255,0.6)"}
        mx={"auto"}
        mb={"32px"}
        px={"32px"}
        py={"32px"}
        rounded={"16px"}
        position={"relative"}
        fontWeight={"bold"}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
        w={"90%"}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"2xl"}>Keycap profile</Text>
          <Button
            w={"90px"}
            rounded={"32px"}
            overflow={"hidden"}
            bg={colorPallete.button}
            onClick={() => {
              onOpenForm();
            }}
            _hover={{
              bg: colorPallete.buttonHover,
              transform: "scale(1.05,1.05)",
              transition: "0.2s",
            }}
            fontSize={"md"}
          >
            New
          </Button>
        </Flex>
        <Flex h={"408px"} fontSize={"md"}>
          <TableContainer flex={1}>
            <Table variant="striped" colorScheme={"purple"} fontSize={"small"}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getKeycapProfilesRes.data.content &&
                  getKeycapProfilesRes.data.content.map(
                    (item: KeycapProfileFormValues) => (
                      <Tr key={item.name}>
                        <Td w={"80%"}>{item.name}</Td>
                        <Td>
                          <Flex gap={"4"}>
                            <Button
                              flexGrow={"1"}
                              rounded={"32px"}
                              overflow={"hidden"}
                              bg={colorPallete.deleteButton}
                              color={"white"}
                              onClick={() => {
                                console.log("usao!");
                                onOpenForm();
                              }}
                              _hover={{
                                bg: colorPallete.deleteButtonHover,
                                transform: "scale(1.05,1.05)",
                                transition: "0.2s",
                              }}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    )
                  )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Pagination
          currentPage={currentPage}
          lastPage={getKeycapProfilesRes.data.totalPages}
          maxLength={5}
          setCurrentPage={setCurrentPage}
          getPage={getKeycapProfiles}
        />
      </Flex>
      <Box h={"calc(100vh - 815px)"} />
      <KeycapProfileForm
        isOpen={isOpenForm}
        onClose={onCloseForm}
        onOpen={onOpenForm}
        fetchKeycapProfiles={getKeycapProfiles}
      ></KeycapProfileForm>
    </Box>
  );
};
