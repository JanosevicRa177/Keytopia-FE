import { Checkbox, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useApplicationStore } from "../../store/store";
import { colorPallete } from "../../styles/color";

export const FinalStep = () => {
	const setName = useApplicationStore((state) => state.setName);
	const keyboard = useApplicationStore((state) => state.keyboard);
	const user = useApplicationStore((state) => state.user);
	const setImage = useApplicationStore((state) => state.setImage);
	const setAssembleKeyboard = useApplicationStore((state) => state.setAssembleKeyboard);
	const setLubeSwithces = useApplicationStore((state) => state.setLubeSwithces);
	function calculatePrice(): number {
		return (
			(keyboard.cable?.price ?? 0) +
			(keyboard.caseEntity?.price ?? 0) +
			(keyboard.keycapSet?.price ?? 0) +
			(keyboard.plate?.price ?? 0) +
			(keyboard.switchSet?.price ?? 0) +
			(keyboard.stabilizers?.price ?? 0) +
			(keyboard.pcb?.price ?? 0) +
			(keyboard.isAssembled ? 20 : 0) +
			(keyboard.switchesLubed ? 25 : 0)
		);
	}
	return (
		<Flex gap={"32px"} alignItems={"center"} flexDir={"column"} minH={"500px"}>
			<Text fontSize={"4xl"}>Final step!</Text>
			<Flex flexDir={"column"} minW={"450px"}>
				<Flex flexDir={"column"} alignItems={"center"}>
					{user?.role === "ADMIN" && (
						<>
							<FormLabel w={"350px"} mr={0} fontWeight={"semibold"}>
								Keyboard name
							</FormLabel>
							<Input
								type="text"
								rounded={"4px"}
								h={"45px"}
								w={"350px"}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
								onChange={(e) => setName(e.target.value)}
							/>
							<FormLabel mb={"8px"} mr={0} w={"350px"}>
								Image
							</FormLabel>
							<Input
								id="image"
								maxW={"350px"}
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								onChange={(e) => {
									if (e.target.files) {
										setImage(e.target.files[0]);
									}
								}}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
								type="file"
								width={"80%"}
							/>
						</>
					)}
					<Text w={"350px"} fontSize={"2xl"} mt={"24px"}>
						Price: {calculatePrice().toFixed(2)} $
					</Text>
				</Flex>
				<Flex gap={"20px"}>
					<Flex justifyContent={"center"} minH={"100%"} mt={"25px"} minW={"calc(33% - 8px)"}>
						<FormLabel fontWeight={"semibold"} h={"25px"} textAlign={"center"} my={"auto"}>
							Assemble keyboard (+20 $)
						</FormLabel>
						<Checkbox
							rounded={"4px"}
							h={"45px"}
							colorScheme={"purple"}
							my={"auto"}
							borderColor={colorPallete.inputBorder}
							_hover={{
								borderColor: colorPallete.buttonHover,
							}}
							onChange={(e) => {
								setAssembleKeyboard(e.target.checked);
							}}
							defaultChecked={keyboard.isAssembled}
						/>
					</Flex>
					{keyboard.switchSet != null && (
						<Flex justifyContent={"center"} minH={"100%"} mt={"25px"} minW={"calc(33% - 8px)"}>
							<FormLabel fontWeight={"semibold"} h={"25px"} textAlign={"center"} my={"auto"}>
								Lube switches and stabilizers with krytox 205g0 (+25 $)
							</FormLabel>
							<Checkbox
								rounded={"4px"}
								h={"45px"}
								colorScheme={"purple"}
								my={"auto"}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.buttonHover,
								}}
								onChange={(e) => {
									setLubeSwithces(e.target.checked);
								}}
								defaultChecked={keyboard.switchesLubed}
							/>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};
