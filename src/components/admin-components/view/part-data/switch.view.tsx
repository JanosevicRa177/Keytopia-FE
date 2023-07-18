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
import { useEffect, useState } from "react";
import { Pagination } from "../../../paging/pagination/pagination";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { Switch } from "../../../../model/part-data.model";
import { useDeleteSwitch } from "../../../../hooks/part-data-hooks/delete/switch.delete.hook";
import { useFetchSwitchesPage } from "../../../../hooks/part-data-hooks/get-all/switch.get-all-page.hook";
import { SwitchForm } from "../../form/part-data/switch.form";

export const SwitchView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getSwitchesPage, getSwitchesPageRes } = useFetchSwitchesPage();
	const { deleteSwitch } = useDeleteSwitch();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getSwitchesPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteSwitch(name: String) {
		deleteSwitch(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getSwitchesPage(0).then(() => setCurrentPage(1));
			}
		});
	}

	return (
		<Box w={"100%"}>
			<Flex
				color={"#343434"}
				bg={"rgba(255,255,255,0.9)"}
				mx={"auto"}
				mb={"32px"}
				px={"32px"}
				py={"32px"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"4px"}
				position={"relative"}
				fontWeight={"bold"}
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
				w={"90%"}
			>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"2xl"}>Switch</Text>
					<Button
						w={"90px"}
						rounded={"4px"}
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
									<Th>Actuation force</Th>
									<Th>Actuation point</Th>
									<Th>Pin type</Th>
									<Th>Switch type</Th>
									<Th>Price weight</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getSwitchesPageRes.data.content &&
									getSwitchesPageRes.data.content.map(
										(item: Switch) => (
											<Tr key={item.name}>
												<Td>{item.name}</Td>
												<Td w={"10%"}>
													{item.actuationForce}
												</Td>
												<Td w={"10%"}>
													{item.actuationPoint}
												</Td>
												<Td w={"10%"}>
													{item.pinType}
												</Td>
												<Td w={"10%"}>
													{item.switchType}
												</Td>
												<Td w={"10%"}>
													{item.priceWeight}
												</Td>
												<Td>
													<Flex gap={"4"}>
														<Button
															flexGrow={"1"}
															rounded={"4px"}
															overflow={"hidden"}
															bg={
																colorPallete.deleteButton
															}
															color={"white"}
															onClick={() =>
																handleDeleteSwitch(
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
					lastPage={getSwitchesPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getSwitchesPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<SwitchForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchSwitch={getSwitchesPage}
			/>
		</Box>
	);
};
