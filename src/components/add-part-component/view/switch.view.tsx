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
import { useEffect, useState } from "react";
import { Pagination } from "../../paging/pagination/pagination";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { Switch } from "../../../model/part-data";
import { useDeleteSwitch } from "../../../hooks/part-data-hooks/delete/switch.delete.hook";
import { useFetchSwitches } from "../../../hooks/part-data-hooks/get-all/switch.get-all.hook";
import { SwitchForm } from "../form/switch.form";

export const SwitchView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getSwitches, getSwitchesRes } = useFetchSwitches();
	const { deleteSwitch } = useDeleteSwitch();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getSwitches(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteSwitch(name: String) {
		deleteSwitch(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getSwitches(0).then(() => setCurrentPage(1));
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
					<Text fontSize={"2xl"}>Switch</Text>
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
									<Th>Actuation force</Th>
									<Th>Actuation point</Th>
									<Th>Pin type</Th>
									<Th>Switch type</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getSwitchesRes.data.content &&
									getSwitchesRes.data.content.map(
										(item: Switch) => (
											<Tr key={item.name}>
												<Td>{item.name}</Td>
												<Td>{item.actuationForce}</Td>
												<Td>{item.actuationPoint}</Td>
												<Td>{item.pinType}</Td>
												<Td>{item.switchType}</Td>
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
					lastPage={getSwitchesRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getSwitches}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<SwitchForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchSwitch={getSwitches}
			></SwitchForm>
		</Box>
	);
};
