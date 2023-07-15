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
import { colorPallete } from "../../../../styles/color";
import { KeycapProfileForm } from "../../form/part-data/keycap-profile.form";
import { useEffect, useState } from "react";
import { useFetchKeycapProfilesPage } from "../../../../hooks/part-data-hooks/get-all/keycap-profile.get-all-page.hook";
import { Pagination } from "../../../paging/pagination/pagination";
import { useDeleteKeycapProfile } from "../../../../hooks/part-data-hooks/delete/keycap-profile.delete.hook";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { KeycapProfile } from "../../../../model/part-data.model";

export const KeycapProfileView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getKeycapProfilesPage, getKeycapProfilesPageRes } =
		useFetchKeycapProfilesPage();
	const { deleteKeycapProfile } = useDeleteKeycapProfile();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getKeycapProfilesPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteKeycapProfile(name: String) {
		deleteKeycapProfile(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getKeycapProfilesPage(0).then(() => setCurrentPage(1));
			}
		});
	}

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
						<Table
							variant="striped"
							colorScheme={"purple"}
							fontSize={"small"}
						>
							<Thead>
								<Tr>
									<Th>Name</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getKeycapProfilesPageRes.data.content &&
									getKeycapProfilesPageRes.data.content.map(
										(item: KeycapProfile) => (
											<Tr key={item.name}>
												<Td w={"80%"}>{item.name}</Td>
												<Td>
													<Flex gap={"4"}>
														<Button
															flexGrow={"1"}
															rounded={"32px"}
															overflow={"hidden"}
															bg={
																colorPallete.deleteButton
															}
															color={"white"}
															onClick={() =>
																handleDeleteKeycapProfile(
																	item.name
																)
															}
															_hover={{
																bg: colorPallete.deleteButtonHover,
																transform:
																	"scale(1.05,1.05)",
																transition:
																	"0.2s",
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
					lastPage={getKeycapProfilesPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getKeycapProfilesPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<KeycapProfileForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchKeycapProfiles={getKeycapProfilesPage}
			/>
		</Box>
	);
};
