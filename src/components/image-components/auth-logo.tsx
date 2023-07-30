import { Box, Center, Img } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { colorPallete } from "../../styles/color";

import logo from "../../images/logo.png";

export const AuthLogo = () => {
	const navigate = useNavigate();
	return (
		<Center w={"100vw"} h={"calc(100vh - 35px)"} position={"absolute"} overflow={"hidden"}>
			<Box w={"55%"} h={"80%"} position={"relative"}>
				<Box
					position={"absolute"}
					w={"110px"}
					h={"110px"}
					p={"8px"}
					bg={colorPallete.logoBackground}
					boxShadow={"4px 4px 16px 0px rgba(0,0,0,0.4)"}
					top={"-55px"}
					left={"calc(50% - 55px)"}
					rounded={"8px"}
					cursor={"pointer"}
					onClick={() => navigate("/")}
					zIndex={"100"}
				>
					<Img
						src={logo}
						w={"110px"}
						h={"110px"}
						position={"absolute"}
						top={"0px"}
						left={"0px"}
					/>
				</Box>
			</Box>
		</Center>
	);
};
