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
import { useState, useEffect } from "react";
import { useDeleteSwitch } from "../../../hooks/part-data-hooks/delete/switch.delete.hook";
import { useFetchSwitchesPage } from "../../../hooks/part-data-hooks/get-all/switch.get-all-page.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { SwitchType, PinType } from "../../../utils/enum";
import { SwitchForm } from "../../form/part-data-form/switch.form";
import { Pagination } from "../../paging/pagination/pagination";
import { Switch } from "../../../model/part-data.model";

export const SwitchView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getSwitchesPage, getSwitchesPageRes } = useFetchSwitchesPage();
	const { deleteSwitch } = useDeleteSwitch();
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
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
	function mapSwitchType(switchType: SwitchType): string {
		let value = "";
		if (switchType === "CLICKY") value = "Clicky";
		else if (switchType === "TACTILE") value = "Tactile";
		else value = "Linear";
		return value;
	}
	function mapPinType(pinType: PinType): string {
		let value = "";
		if (pinType === "PIN5") value = "5 pin";
		else value = "3 pin";
		return value;
	}

	return (
		<Box minW={"927px"}>
			<Flex
				color={"#343434"}
				bg={"rgba(255,255,255,0.9)"}
				mx={"auto"}
				mb={"32px"}
				px={"32px"}
				py={"32px"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"8px"}
				position={"relative"}
				fontWeight={"bold"}
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
				w={"100%"}
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
				<Flex
					h={"408px"}
					fontSize={"md"}
					w={"863px"}
					rounded={"8px"}
					mt={"12px"}
					border={"2px"}
					borderColor={colorPallete.button}
				>
					<TableContainer>
						<Table variant="striped" colorScheme={"purple"} fontSize={"small"}>
							<Thead>
								<Tr>
									<Th px={"11px"} py={"16px"}>
										Name
									</Th>
									<Th px={"11px"} py={"16px"}>
										Actuation force
									</Th>
									<Th px={"11px"} py={"16px"}>
										Actuation point
									</Th>
									<Th px={"11px"} py={"16px"}>
										Pin type
									</Th>
									<Th px={"11px"} py={"16px"}>
										Switch type
									</Th>
									<Th px={"11px"} py={"16px"}>
										Price weight
									</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{getSwitchesPageRes.data.content &&
									getSwitchesPageRes.data.content.map((item: Switch) => (
										<Tr key={item.name}>
											<Td>{item.name}</Td>
											<Td px={"26px"} py={"16px"}>
												{item.actuationForce}
											</Td>
											<Td px={"26.5px"} py={"16px"}>
												{item.actuationPoint}
											</Td>
											<Td px={"26.5px"} py={"16px"}>
												{mapPinType(item.pinType)}
											</Td>
											<Td px={"26.5px"} py={"16px"}>
												{mapSwitchType(item.switchType)}
											</Td>
											<Td px={"26.5px"} py={"16px"}>
												{item.priceWeight}
											</Td>
											<Td px={"26.5px"} py={"16px"}>
												<Flex gap={"4"}>
													<Button
														flexGrow={"1"}
														rounded={"4px"}
														overflow={"hidden"}
														bg={colorPallete.deleteButton}
														color={"white"}
														onClick={() => handleDeleteSwitch(item.name)}
														_hover={{
															bg: colorPallete.deleteButtonHover,
															transform: "scale(1.05,1.05)",
															transition: "0.2s",
														}}
														w={"150px"}
													>
														Delete
													</Button>
												</Flex>
											</Td>
										</Tr>
									))}
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
			<SwitchForm isOpen={isOpenForm} onClose={onCloseForm} fetchSwitch={getSwitchesPage} />
		</Box>
	);
};
