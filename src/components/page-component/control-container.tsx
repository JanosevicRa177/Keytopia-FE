import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ControlContainer: React.FC<{
	children: React.ReactNode;
}> = (props) => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		if (window.scrollY === 0) return;
		setScrollPosition(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Flex
			color={"#343434"}
			mx={"16px"}
			fontWeight={"bold"}
			columnGap={"12px"}
			rowGap={"12px"}
			flexWrap={"wrap"}
			flexDirection={"column"}
			mt={scrollPosition + 16}
			transition={"0.3s ease-in-out"}
		>
			{props.children}
		</Flex>
	);
};
