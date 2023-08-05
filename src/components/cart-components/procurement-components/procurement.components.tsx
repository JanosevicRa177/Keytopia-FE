import { Box, Button, Flex, Img } from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";
import { useApplicationStore } from "../../../store/store";
import cartImage from "../../../images/cart.png";
import { useNavigate } from "react-router-dom";

export const ProcurementCartComponent = () => {
	const navigate = useNavigate();
	const procurementParts = useApplicationStore((state) => state.procurementParts);
	return (
		<Flex mx={"24px"} justifyContent={"end"} alignItems={"center"} gap={"12px"}>
			<Flex
				h={"55px"}
				bgColor={"rgba(255,255,255,0.9)"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"8px"}
				px={"24px"}
				alignItems={"center"}
			>
				<Flex w={"55px"} h={"55px"} position={"relative"}>
					<Img src={cartImage} w={"55px"} h={"55px"} position={"absolute"} />
					<Flex alignItems={"end"}>
						<Box
							bg={colorPallete.deleteButton}
							rounded={"8px"}
							color={"white"}
							zIndex={"25"}
							fontSize={"xs"}
							px={"4px"}
							ml={"12px"}
							mb={"8px"}
							boxShadow={"1px 1px 4px 0px rgba(0,0,0,0.7)"}
						>
							{procurementParts.length}
						</Box>
					</Flex>
				</Flex>
				<Button
					w={"230px"}
					h={"37px"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={colorPallete.button}
					_hover={{
						bg: colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"large"}
					onClick={() => {
						navigate("/current/procurement");
					}}
				>
					Show procurement cart
				</Button>
			</Flex>
		</Flex>
	);
};
