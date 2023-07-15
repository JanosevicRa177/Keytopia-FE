/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Center, Text, Box, Img } from "@chakra-ui/react";
import { useState } from "react";
import { MultiselectOption } from "../../utils/types";
import { colorPallete } from "../../styles/color";

import xIcon from "../../images/xIcon.png";
import downArrow from "../../images/downArrow.png";
import checkmark from "../../images/checkmark.png";

interface MultiselectProps {
	values: MultiselectOption[];
	onChange: Function;
	multiselectName: string;
	isError: boolean;
}

export const Multiselect = (props: MultiselectProps) => {
	const [chosenItems, setChosenItems] = useState<MultiselectOption[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	function removeValue(value: MultiselectOption) {
		setChosenItems(chosenItems.filter((val) => val !== value));
		props.onChange(
			"brands",
			chosenItems
				.filter((val) => val !== value)
				.map((value) => value.value)
		);
	}
	function addValue(value: MultiselectOption) {
		setChosenItems((chosenItems) => [value, ...chosenItems]);
		props.onChange(
			"brands",
			[value, ...chosenItems].map((value) => value.value)
		);
	}
	function handleChange(value: MultiselectOption) {
		if (isPresent(value)) removeValue(value);
		else addValue(value);
	}
	function isPresent(value: MultiselectOption): boolean {
		return chosenItems.filter((val) => val === value).length !== 0;
	}
	return (
		<Flex w={"100%"} h={"45px"} position={"relative"}>
			<Flex
				bg={"white"}
				roundedTop={"22.5px"}
				roundedBottom={isOpen ? "8px" : "22.5px"}
				w={"100%"}
				border={props.isError ? "2px" : "2px"}
				h={isOpen ? "225px" : "45px"}
				zIndex={"20"}
				borderColor={
					props.isError ? "red.500" : colorPallete.inputBorder
				}
				transition={"0.3s ease"}
				overflow={"hidden"}
			>
				<Flex flexDirection={"column"} h={"225px"} w={"100%"}>
					<Flex
						zIndex={"20"}
						roundedTop={"22.5px"}
						overflow={"hidden"}
						roundedBottom={"22.5px"}
						columnGap={"4px"}
					>
						<Flex
							gap={"4px"}
							h={"45px"}
							minHeight={"45px"}
							px={"4px"}
							w={"290px"}
							overflow={"hidden"}
						>
							<Center gap={"8px"} color={"white"}>
								{chosenItems.map((value) => (
									<Flex
										key={value.value}
										bg={colorPallete.button}
										px={"16px"}
										py={"2px"}
										rounded={"12px"}
										gap={"8px"}
										alignItems={"center"}
										justifyContent={"center"}
									>
										<Text h={"24px"} userSelect={"none"}>
											{value.text}
										</Text>
										<Img
											src={xIcon}
											w={"12px"}
											h={"12px"}
											cursor={"pointer"}
											onClick={() => {
												removeValue(value);
											}}
										/>
									</Flex>
								))}
							</Center>
						</Flex>
						<Center
							w={"45px"}
							h={"45px"}
							onClick={() => setIsOpen(!isOpen)}
						>
							<Img src={downArrow} w={"15px"} h={"15px"} />
						</Center>
					</Flex>
					<Box
						w={"calc(100% - 8px)"}
						bg={colorPallete.inputBorder}
						h={"1px"}
						mx={"4px"}
					></Box>
					<Flex flexDir={"column"} mx={"16px"} cursor={"pointer"}>
						{props.values.map((value) => (
							<Flex>
								<Text
									w={"calc(100% - 45px)"}
									onClick={(e) => {
										handleChange(value);
									}}
								>
									{value.text}
								</Text>
								{isPresent(value) && (
									<Center h={"100%"}>
										<Img
											src={checkmark}
											w={"10px"}
											h={"10px"}
										/>
									</Center>
								)}
							</Flex>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
