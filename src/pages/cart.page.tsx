import {
	Button,
	Center,
	Flex,
	Img,
	NumberInput,
	NumberInputField,
	Text,
	useDisclosure,
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

import keyboardImg from "../images/keyboard.png";
import { toast } from "react-toastify";
import { OrderForm } from "../components/form/order-form/order.form";

export const CartPage = () => {
	const navigate = useNavigate();
	const [focusedPart, setFocusedPart] = useState<PartStoreItem>();
	const procurementParts = useApplicationStore((state) => state.procurementParts);
	const removeFromCart = useApplicationStore((state) => state.removeFromCart);
	const showLogin = useApplicationStore((state) => state.showLogin);
	const completePrice = useApplicationStore((state) => state.completePrice);
	const user = useApplicationStore((state) => state.user);
	const { isOpen, onClose, onOpen } = useDisclosure();
	const increaseQuantityToPartCart = useApplicationStore(
		(state) => state.increaseQuantityToPartCart
	);
	const setQuantityToPartCart = useApplicationStore((state) => state.setQuantityToPartCart);
	const decreaseQuantityToPartCart = useApplicationStore(
		(state) => state.decreaseQuantityToPartCart
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
				setQuantityToPartCart(part.name, 1);
			}
		},
	});
	async function handleShowMoreKeyboard(keyboardName: string) {
		navigate(`/keyboard/${keyboardName}`);
	}
	async function handleSubmit() {
		if (user?.role === "ADMIN")
			makeProcurement().then((isOk: boolean) => {
				if (isOk) {
					navigate("/");
				}
			});
		else if (user?.role === "BUYER") {
			onOpen();
		} else {
			toast.warn("You should login first!");
			showLogin().then(() => {
				navigate("/authorization");
			});
		}
	}
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
						<Flex
							position={"relative"}
							h={"45px"}
							justifyContent={"end"}
							alignItems={"center"}
							zIndex={"4"}
							gap={"16px"}
						>
							{user?.role !== "ADMIN" && (
								<Text textAlign={"center"} fontSize={"2xl"} fontWeight={"700"}>
									Full price: {completePrice} $
								</Text>
							)}
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
								onClick={() => handleSubmit()}
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
						{procurementParts.map((part: PartStoreItem, index: number) => (
							<Flex
								h={"200px"}
								w={"100%"}
								px={"32px"}
								py={"16px"}
								justifyContent={"space-between"}
								key={index}
								bg={index % 2 === 0 ? colorPallete.oddTableColor : colorPallete.evenTableColor}
								onClick={() => {
									setFocusedPart(part);
								}}
							>
								<Flex gap={"16px"} w={"400px"}>
									{part.image == null && part.generatedByBuyer ? (
										<Center position={"relative"} w={"220px"} h={"100%"}>
											<Img
												src={keyboardImg}
												position={"absolute"}
												w={"220px"}
												h={"100%"}
												boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
												rounded={"4px"}
											/>
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
												onClick={() => handleShowMoreKeyboard(part.name)}
											>
												Show more
											</Button>
										</Center>
									) : (
										<Img
											src={part.image ?? ""}
											w={"220px"}
											boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
											rounded={"4px"}
										/>
									)}
									<Flex flexDirection={"column"} justifyContent={"center"}>
										<Text fontWeight={"bold"} fontSize={"xl"} maxW={"162px"}>
											{part.generatedByBuyer ? (
												<Flex flexDir={"column"}>
													<Text whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
														{part.name}
													</Text>
													<Text>(Your custom keyboard)</Text>
												</Flex>
											) : (
												part.name
											)}
										</Text>
									</Flex>
								</Flex>
								{user?.role !== "ADMIN" && (
									<Center fontWeight={"700"} fontSize={"large"}>
										{part.price.toFixed(2)} $ x {part.quantity} ={" "}
										{(part.price * part.quantity).toFixed(2)} $
									</Center>
								)}

								<Flex gap={"24px"}>
									<Flex alignItems={"center"} gap={"12px"}>
										<Img
											src={minusImg}
											w={"25px"}
											h={"32px"}
											rounded={"4px"}
											cursor={"pointer"}
											onClick={() => decreaseQuantityToPartCart(part.name)}
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
												setQuantityToPartCart(part.name, parseInt(e));
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
											onClick={() => increaseQuantityToPartCart(part.name)}
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
												removeFromCart(part.name);
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
			{user?.role === "BUYER" && <OrderForm isOpen={isOpen} onClose={onClose} />}
		</MainContrainer>
	);
};
