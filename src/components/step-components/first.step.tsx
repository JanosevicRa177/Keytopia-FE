/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, FormLabel, Img, Input, Select, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFetchSizes } from "../../hooks/part-data-hooks/get-all/size.get-all.hook";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { colorPallete } from "../../styles/color";
import { PriceWeight, SwitchType } from "../../utils/enum";
import { useApplicationStore } from "../../store/store";

import soundImg from "../../images/sound.png";
import keyboardSizes from "../../images/keyboardSizes.png";
import lienar from "../../sounds/linear.wav";
import clicky from "../../sounds/clicky.wav";
import tactile from "../../sounds/tactile.wav";

export const FirstStep = () => {
	const setColor = useApplicationStore((state) => state.setColor);
	const setSizeName = useApplicationStore((state) => state.setSizeName);
	const setSwitchType = useApplicationStore((state) => state.setSwitchType);
	const setPriceWeight = useApplicationStore((state) => state.setPriceWeight);
	const { getSizes } = useFetchSizes();
	const [sizeNames, setSizeNames] = useState<string[]>([]);
	useEffect(() => {
		getSizes().then((res: ApiResponse<string[] | null>) => {
			if (res.data == null) {
				toast.error("Something wrong with fetching sizes!");
				return;
			}
			setSizeNames(res.data);
			setSizeName(res.data[0]);
			setPriceWeight(PriceWeight.MEDIUM);
			setColor("");
			setSwitchType(SwitchType.TACTILE);
		});
	}, []);
	return (
		<Flex gap={"32px"}>
			<Flex w={"50%"}>
				<Img src={keyboardSizes} rounded={"16px"} w={"100%"} />
			</Flex>
			<Flex flexDir={"column"} w={"50%"} justifyContent={"center"}>
				<Text textAlign={"center"} mb={"28px"} fontSize={"3xl"} fontWeight={"bold"}>
					Choose what kind of keyboard you want
				</Text>

				<FormLabel fontWeight={"semibold"}>Color</FormLabel>
				<Input
					type="text"
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
					onChange={(e) => setColor(e.target.value)}
				/>
				<FormLabel fontWeight={"semibold"} mt={"16px"}>
					Size
				</FormLabel>
				<Select
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
					defaultValue={sizeNames[0]}
					onChange={(e) => setSizeName(e.target.value)}
				>
					{sizeNames.map((size, index) => (
						<option value={size} key={index}>
							{size}
						</option>
					))}
				</Select>
				<FormLabel fontWeight={"semibold"} mt={"16px"}>
					Switch type
				</FormLabel>
				<Select
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
					onChange={(e) => setSwitchType(e.target.value as SwitchType)}
					defaultValue={SwitchType.TACTILE}
				>
					<option value={SwitchType.TACTILE}>Tactile</option>
					<option value={SwitchType.LINEAR}>Linear</option>
					<option value={SwitchType.CLICKY}>Clicky</option>
				</Select>
				<FormLabel fontWeight={"semibold"} mt={"16px"}>
					How much money you want to spend?
				</FormLabel>
				<Select
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
					defaultValue={PriceWeight.MEDIUM}
					onChange={(e) => setPriceWeight(e.target.value as PriceWeight)}
				>
					<option value={PriceWeight.LIGHT}>Just give me as cheap as possible</option>
					<option value={PriceWeight.MEDIUM}>I have some money</option>
					<option value={PriceWeight.HEAVY}>Give me the best!</option>
				</Select>
				<Flex gap={"12px"} justifyContent={"center"} mt={"24px"}>
					<Flex flexDir={"column"} gap={"8px"} alignItems={"center"}>
						<Text textAlign={"center"}>Checkout clicky switch sound!</Text>
						<Img
							src={soundImg}
							cursor={"pointer"}
							w={"50px"}
							h={"50px"}
							rounded={"48px"}
							shadow={"2px 2px 12px 2px rgba(0,0,0,0.6)"}
							onClick={() => new Audio(clicky).play()}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"8px"} alignItems={"center"}>
						<Text textAlign={"center"}>Checkout linear switch sound!</Text>
						<Img
							src={soundImg}
							cursor={"pointer"}
							w={"50px"}
							h={"50px"}
							rounded={"48px"}
							shadow={"2px 2px 12px 2px rgba(0,0,0,0.6)"}
							onClick={() => new Audio(lienar).play()}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"8px"} alignItems={"center"}>
						<Text textAlign={"center"}>Checkout tactile switch sound!</Text>
						<Img
							src={soundImg}
							cursor={"pointer"}
							w={"50px"}
							h={"50px"}
							rounded={"48px"}
							shadow={"2px 2px 12px 2px rgba(0,0,0,0.6)"}
							onClick={() => new Audio(tactile).play()}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
