import { Box, Img, SlideFade } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const ImgComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	let location = useLocation();
	useEffect(() => {
		setIsOpen(Boolean(location.pathname.match("/authorization")));
	}, [location]);
	return (
		<Box w={"100vw"} h={"100vh"} position={"fixed"} zIndex={"0"}>
			<SlideFade in={isOpen} offsetY="20px">
				<Img src="background.png" w={"100vw"} h={"100vh"} />
			</SlideFade>
		</Box>
	);
};
