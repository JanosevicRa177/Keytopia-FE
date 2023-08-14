import { Box, Flex, Img } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { useApplicationStore } from "../../store/store";
import cartImage from "../../images/cart.png";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../header/link";

export const ProcurementCartComponent = () => {
	const navigate = useNavigate();
	const user = useApplicationStore((state) => state.user);
	const procurementParts = useApplicationStore((state) => state.procurementParts);
	return (
		<Flex alignItems={"center"} gap={"12px"}>
			<CustomLink
				link={"/cart"}
				text={user?.role !== "ADMIN" ? "Cart" : "Show procurement cart"}
			/>
			<Flex
				w={"40px"}
				h={"40px"}
				position={"relative"}
				bgColor={"rgba(255,255,255,0.9)"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"8px"}
				cursor={"pointer"}
				onClick={() => navigate("/cart")}
			>
				<Img src={cartImage} w={"40px"} h={"40px"} position={"absolute"} />
				<Flex alignItems={"end"}>
					<Box
						bg={colorPallete.deleteButton}
						rounded={"8px"}
						color={"white"}
						zIndex={"25"}
						fontSize={"2xs"}
						px={"4px"}
						ml={"8px"}
						mb={"4px"}
						boxShadow={"1px 1px 4px 0px rgba(0,0,0,0.7)"}
					>
						{procurementParts.length}
					</Box>
				</Flex>
			</Flex>
		</Flex>
	);
};
