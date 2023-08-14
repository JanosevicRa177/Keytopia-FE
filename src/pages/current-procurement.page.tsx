import {
	Button,
	Center,
	Flex,
	Img,
	NumberInput,
	NumberInputField,
	Text,
	useOutsideClick,
} from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import { useApplicationStore } from "../store/store";
import { PartStoreItem } from "../store/part-store/types/part.type";
import { colorPallete } from "../styles/color";

import plusImg from "../images/plus.png";
import minusImg from "../images/minus.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export const CurrentProcurementPage = () => {
	const navigate = useNavigate();
	const [focusedPart, setFocusedPart] = useState<PartStoreItem>();
	const procurementParts = useApplicationStore((state) => state.procurementParts);
	const removeFromProcurement = useApplicationStore((state) => state.removeFromProcurement);
	const user = useApplicationStore((state) => state.user);
	const increaseQuantityToPartProcurement = useApplicationStore(
		(state) => state.increaseQuantityToPartProcurement
	);
	const setQuantityToPartProcurement = useApplicationStore(
		(state) => state.setQuantityToPartProcurement
	);
	const decreaseQuantityToPartProcurement = useApplicationStore(
		(state) => state.decreaseQuantityToPartProcurement
	);
	const makeProcurement = useApplicationStore((state) => state.makeProcurement);
	const ref = useRef(null);
	useOutsideClick({
		ref: ref,
		handler: () => {
			if (focusedPart == null) return;
			const index = procurementParts.findIndex(
				(partItem: PartStoreItem) => partItem.name === focusedPart.name
			);
			if (index === -1) return;
			let part = procurementParts[index];
			if (part.quantity.toString() === "NaN") {
				setQuantityToPartProcurement(part.name, 1);
			}
		},
	});
	return (
		<MainContrainer>
			<Flex w={"100%"} flexDirection={"column"} my={"32px"} position={"relative"}>
				<Flex
					bg={"rgba(255,255,255,0.5)"}
					backdropFilter="auto"
					backdropBlur="4px"
					w={"1140px"}
					top={"-20px"}
					position={"fixed"}
					h={"calc(100vh + 20px)"}
					zIndex={1}
				/>
				<Flex
					flexDir={"column"}
					mx={"32px"}
					py={"32px"}
					bg={"rgba(255,255,255,0.9)"}
					boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
					rounded={"8px"}
					zIndex={"2"}
					px={"32px"}
					minH={"calc(100vh - 170px)"}
				>
					<Flex justifyContent={"space-between"} mb={"24px"}>
						<Text fontWeight={"bold"} fontSize={"3xl"} zIndex={2}>
							Parts
						</Text>
						<Flex position={"relative"} w={"200px"} h={"45px"} zIndex={"4"}>
							<Button
								w={"200px"}
								h={"45px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"xl"}
								position={"absolute"}
								onClick={() => {
									makeProcurement().then((isOk: boolean) => {
										if (isOk) {
											navigate("/");
										}
									});
								}}
							>
								{user?.role !== "ADMIN" ? "Finish order" : "Make procurement"}
							</Button>
						</Flex>
					</Flex>
					<Flex
						flexDirection={"column"}
						rounded={"8px"}
						overflow={"hidden"}
						zIndex={2}
						border={"2px"}
						borderColor={colorPallete.button}
					>
						{procurementParts.map((part: PartStoreItem, index) => (
							<Flex
								h={"200px"}
								w={"100%"}
								px={"32px"}
								py={"16px"}
								justifyContent={"space-between"}
								key={index}
								bg={
									index % 2 === 0
										? colorPallete.oddTableColor
										: colorPallete.evenTableColor
								}
								onClick={() => {
									setFocusedPart(part);
								}}
							>
								<Flex gap={"16px"} w={"400px"}>
									<Img
										src={part.image}
										w={"220px"}
										boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
										rounded={"4px"}
									/>
									<Flex flexDirection={"column"} justifyContent={"center"}>
										<Text fontWeight={"bold"} fontSize={"2xl"}>
											{part.name}
										</Text>
									</Flex>
								</Flex>

								<Flex gap={"24px"}>
									<Flex alignItems={"center"} gap={"12px"}>
										<Img
											src={minusImg}
											w={"25px"}
											h={"32px"}
											rounded={"4px"}
											cursor={"pointer"}
											onClick={() =>
												decreaseQuantityToPartProcurement(part.name)
											}
										/>
										<NumberInput
											borderColor={colorPallete.inputBorder}
											min={1}
											w={"80px"}
											textAlign={"center"}
											rounded={"8px"}
											value={part.quantity}
											onChange={(e) => {
												if (e === "NaN") return;
												setQuantityToPartProcurement(
													part.name,
													parseInt(e)
												);
											}}
											ref={ref}
										>
											<NumberInputField />
										</NumberInput>

										<Img
											src={plusImg}
											w={"25px"}
											h={"25px"}
											rounded={"4px"}
											cursor={"pointer"}
											onClick={() =>
												increaseQuantityToPartProcurement(part.name)
											}
										/>
									</Flex>
									<Flex alignItems={"center"} position={"relative"} w={"150px"}>
										<Button
											w={"150px"}
											h={"45px"}
											rounded={"4px"}
											overflow={"hidden"}
											bg={colorPallete.button}
											_hover={{
												bg: colorPallete.buttonHover,
												transform: "scale(1.05,1.05)",
												transition: "0.2s",
											}}
											fontSize={"xl"}
											position={"absolute"}
											onClick={() => {
												removeFromProcurement(part.name);
											}}
										>
											Remove
										</Button>
									</Flex>
								</Flex>
							</Flex>
						))}
					</Flex>
					{procurementParts.length === 0 && (
						<Center h={"100%"} flexGrow={"1"}>
							<Text mt={"8px"} fontSize={"4xl"}>
								Cart is empty!
							</Text>
						</Center>
					)}
				</Flex>
			</Flex>
		</MainContrainer>
	);
};
