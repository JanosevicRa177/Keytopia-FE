import { Box, Img, SlideFade, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImg from "../../images/keycapBackground.png";

export const ImgComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	let location = useLocation();
	useEffect(() => {
		setIsOpen(!Boolean(location.pathname.match("/authorization")));
	}, [location]);
	return (
		<Box w={"100vw"} minH={"100vh"} h={"100vh"} position={"fixed"} zIndex={"0"}>
			<SlideFade in={isOpen} offsetY="20px">
				<Flex justifyContent={"space-between"} position={"relative"}>
					<Flex w={"20%"} position={"relative"} h={"100%"}>
						<Img
							src={backgroundImg}
							position={"absolute"}
							top={"30vh"}
							transform={"rotate(-90deg) scale(3,3)"}
							w={"100%"}
						/>
					</Flex>
					<Box w={"60%"} h={"100%"} />
					<Flex w={"20%"} h={"100%"} position={"relative"}>
						<Img
							src={backgroundImg}
							position={"absolute"}
							top={"55vh"}
							transform={"rotate(90deg) scale(3,3)"}
							w={"100%"}
						/>
					</Flex>
				</Flex>
			</SlideFade>
		</Box>
	);
};
