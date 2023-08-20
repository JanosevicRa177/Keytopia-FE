/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Keyboard } from "../model/part.model";
import { Button, Center, Flex, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useGetOneKeyboard } from "../hooks/keyboard-hooks/keyboard.get-one.hook";
import { KeyboardPartCard } from "../components/single-view/keyboard-part.card";
import { PartType } from "../utils/enum";
import { ApiResponse } from "../store/auth-store/types/response.type";
import { MainContrainer } from "../components/page-component/main-container";
import { useNavigate, useParams } from "react-router-dom";
import { PartModalControl } from "../components/single-view/part-modal.control";
import { PartData } from "../store/keyboard-store/types/keyboard.type";
import { colorPallete } from "../styles/color";
import { toast } from "react-toastify";
import { useApplicationStore } from "../store/store";
import { MakeKeyboardForm } from "../components/form/keyboard-form/keyboard.make.form";
import checkmark from "../images/checkmark.png";
import keyboardImg from "../images/keyboard.png";
import { CommercializeKeyboardForm } from "../components/form/keyboard-form/keyboard.commercialize.form";

export const KeyboardPage = () => {
	const [part, setPart] = useState<PartData>();
	const { name } = useParams();
	const navigate = useNavigate();
	const user = useApplicationStore((state) => state.user);
	const [keyboard, setKeyboard] = useState<Keyboard>();
	const { getKeyboard } = useGetOneKeyboard();
	const { isOpen: isOpenMake, onClose: onCloseMake, onOpen: onOpenMake } = useDisclosure();
	const {
		isOpen: isOpenCommercialize,
		onClose: onCloseCommercialize,
		onOpen: onOpenCommercialize,
	} = useDisclosure();
	const addToCart = useApplicationStore((state) => state.addToCart);
	useEffect(() => {
		getKeyboardFunc();
	}, []);
	function getKeyboardFunc() {
		getKeyboard(name ?? "").then((res: ApiResponse<Keyboard | null>) => {
			if (res.data !== null) {
				setKeyboard(res.data);
			} else navigate("/part/keyboard");
		});
	}
	function handleAddToCart() {
		addToCart({
			name: keyboard?.name ?? "",
			price: keyboard?.price ?? 0,
			quantity: 1,
			image: keyboard?.imageUrl != null ? keyboard?.imageUrl.toString() : "",
		});
		toast.success("1 instance of " + keyboard?.name + " added procurement");
	}
	async function handleShowMorePart(part: PartData, partType: PartType) {
		setPart({ name: part.name, partType: partType } as PartData);
	}
	return (
		<MainContrainer>
			<Flex w={"100%"} my={"32px"} position={"relative"} flexDir={"column"}>
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
					bg={"rgba(255,255,255,0.9)"}
					zIndex={"2"}
					px={"32px"}
					mx={"32px"}
					py={"32px"}
					boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
					rounded={"8px"}
					gap={"24px"}
					minH={"calc(100vh - 185px)"}
					maxH={"calc(100vh - 185px)"}
				>
					<Flex minW={"30%"} alignItems={"center"} fontSize={"2xl"} fontWeight={"700"}>
						<Flex flexDir={"column"} gap={"12px"}>
							<Img
								src={keyboard?.imageUrl == null ? keyboardImg : keyboard?.imageUrl}
								rounded={"6px"}
								minH={"230px"}
								maxH={"230px"}
								w={"100%"}
								boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
							/>
							<Text>{keyboard?.name}</Text>
							<Flex textAlign={"end"} mr={"12px"} justifyContent={"space-between"}>
								<Text>Price: </Text>
								<Text>{keyboard?.price} $ </Text>
							</Flex>
							{keyboard?.quantity !== null && (
								<Flex
									textAlign={"end"}
									mr={"12px"}
									justifyContent={"space-between"}
								>
									<Text>Quantity: </Text>
									<Text>{keyboard?.quantity} </Text>
								</Flex>
							)}
							<Flex textAlign={"end"} mr={"12px"} justifyContent={"space-between"}>
								<Text>Keyboard assembled: </Text>
								{keyboard?.assembled === true ? (
									<Center>
										<Img src={checkmark} w={"20px"} h={"20px"} />
									</Center>
								) : (
									<></>
								)}
							</Flex>
							{keyboard?.switchSetDto != null && (
								<Flex
									textAlign={"end"}
									mr={"12px"}
									justifyContent={"space-between"}
								>
									<Text>Switches lubed: </Text>
									{keyboard?.switchesLubed === true ? (
										<Center>
											<Img src={checkmark} w={"20px"} h={"20px"} />
										</Center>
									) : (
										<></>
									)}
								</Flex>
							)}
							{user?.role === "BUYER" ? (
								<Button
									rounded={"4px"}
									overflow={"hidden"}
									w={"100%"}
									fontSize={"2xl"}
									minH={"55px"}
									bg={colorPallete.button}
									color={"#343434"}
									onClick={() => {
										handleAddToCart();
									}}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
								>
									Add to cart
								</Button>
							) : (
								<Flex gap={"14px"}>
									<Button
										rounded={"4px"}
										overflow={"hidden"}
										w={"calc(50% - 8px)"}
										fontSize={"large"}
										minH={"55px"}
										bg={
											!keyboard?.generatedByAdmin
												? colorPallete.disabledButton
												: colorPallete.button
										}
										color={!keyboard?.generatedByAdmin ? "white" : "#343434"}
										onClick={() => {
											onOpenMake();
										}}
										_hover={{
											bg: !keyboard?.generatedByAdmin
												? colorPallete.disabledButton
												: colorPallete.buttonHover,
											transform: "scale(1.05,1.05)",
											transition: "0.2s",
										}}
										isDisabled={!keyboard?.generatedByAdmin}
									>
										Make keyboard
									</Button>
									<Button
										rounded={"4px"}
										overflow={"hidden"}
										w={"calc(50% - 8px)"}
										fontSize={"large"}
										minH={"55px"}
										bg={
											keyboard?.generatedByAdmin
												? colorPallete.disabledButton
												: colorPallete.button
										}
										color={keyboard?.generatedByAdmin ? "white" : "#343434"}
										onClick={() => {
											onOpenCommercialize();
										}}
										_hover={{
											bg: keyboard?.generatedByAdmin
												? colorPallete.disabledButton
												: colorPallete.buttonHover,
											transform: "scale(1.05,1.05)",
											transition: "0.2s",
										}}
										isDisabled={keyboard?.generatedByAdmin}
									>
										Commercialize
										<br /> keyboard
									</Button>
								</Flex>
							)}
						</Flex>
					</Flex>
					<Flex fontSize={"md"} my={"12px"} flexDir={"column"} justifyContent={"center"}>
						<Flex
							flexWrap={"wrap"}
							justifyContent={"center"}
							rowGap={"24px"}
							columnGap={"24px"}
						>
							<KeyboardPartCard
								part={keyboard?.caseDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.CASE}
							/>
							<KeyboardPartCard
								part={keyboard?.pcbDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.PCB}
							/>
							<KeyboardPartCard
								part={keyboard?.stabilizersDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.STABILIZER}
							/>
							<KeyboardPartCard
								part={keyboard?.plateDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.PLATE}
							/>
							<KeyboardPartCard
								part={keyboard?.cableDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.CABLE}
							/>
							<KeyboardPartCard
								part={keyboard?.keycapSetDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.KEYCAP_SET}
							/>
							<KeyboardPartCard
								part={keyboard?.switchSetDto as PartData}
								showMore={handleShowMorePart}
								partType={PartType.SWITCH_SET}
							/>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<PartModalControl partData={part} setPartData={setPart} />
			<MakeKeyboardForm
				keyboardName={keyboard?.name ?? ""}
				isOpen={isOpenMake}
				onClose={onCloseMake}
				getKeyboard={getKeyboardFunc}
			/>
			<CommercializeKeyboardForm
				keyboardName={keyboard?.name ?? ""}
				isOpen={isOpenCommercialize}
				onClose={onCloseCommercialize}
				getKeyboard={getKeyboardFunc}
			/>
		</MainContrainer>
	);
};
