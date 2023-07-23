import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import { useApplicationStore } from "../store/store";
import { PartStoreItem } from "../store/part-store/types/part.type";
import { colorPallete } from "../styles/color";

import plusImg from "../images/plus.png";
import minusImg from "../images/minus.png";

export const ProcurementPage = () => {
	const procurementParts = useApplicationStore(
		(state) => state.procurementParts
	);
	const removeFromProcurement = useApplicationStore(
		(state) => state.removeFromProcurement
	);
	const increaseQuantityToPartProcurement = useApplicationStore(
		(state) => state.increaseQuantityToPartProcurement
	);
	const decreaseQuantityToPartProcurement = useApplicationStore(
		(state) => state.decreaseQuantityToPartProcurement
	);
	return (
		<MainContrainer>
			<Flex
				w={"100%"}
				flexDirection={"column"}
				my={"32px"}
				position={"relative"}
			>
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
				<Text
					mb={"12px"}
					mx={"32px"}
					fontWeight={"bold"}
					fontSize={"3xl"}
					zIndex={2}
				>
					Parts
				</Text>
				<Flex
					flexDirection={"column"}
					mx={"32px"}
					rounded={"8px"}
					overflow={"hidden"}
					zIndex={2}
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
						>
							<Flex gap={"16px"} w={"400px"}>
								<Img
									src={part.image}
									w={"220px"}
									boxShadow={
										"4px 4px 12px 0px rgba(0,0,0,0.3)"
									}
									rounded={"4px"}
								/>
								<Flex
									flexDirection={"column"}
									justifyContent={"center"}
								>
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
											decreaseQuantityToPartProcurement(
												part.name
											)
										}
									/>
									<Text
										border={"2px"}
										borderColor={colorPallete.inputBorder}
										w={"50px"}
										textAlign={"center"}
										rounded={"8px"}
									>
										{part.quantity}
									</Text>
									<Img
										src={plusImg}
										w={"25px"}
										h={"25px"}
										rounded={"4px"}
										cursor={"pointer"}
										onClick={() =>
											increaseQuantityToPartProcurement(
												part.name
											)
										}
									/>
								</Flex>
								<Flex
									alignItems={"center"}
									position={"relative"}
									w={"150px"}
								>
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
			</Flex>
		</MainContrainer>
	);
};
