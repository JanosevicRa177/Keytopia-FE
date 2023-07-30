/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Box, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const KeycapsImages = () => {
	const [position, setPosition] = useState(false);
	async function startAnimation() {
		await sleep(2000);
		if (position) {
			setPosition(false);
			return;
		}
		setPosition(true);
	}
	useEffect(() => {
		startAnimation();
	}, [position]);
	return (
		<Center w={"100vw"} h={"calc(100vh - 35px)"} position={"absolute"} overflow={"hidden"}>
			<Box w={"55%"} h={"80%"} position={"relative"}>
				<Img
					src="keycaps.png"
					left={"-27%"}
					top={position ? "41%" : "36%"}
					transition={"0.5s ease"}
					position={"absolute"}
					transform={"rotate(-160deg)"}
					w={"60%"}
				/>
				<Img
					src="keycaps.png"
					left={"-27%"}
					top={position ? "-28%" : "-33%"}
					transition={"0.5s ease"}
					position={"absolute"}
					transform={"rotate(-30deg)"}
					w={"60%"}
				/>
				<Img
					src="keycaps.png"
					right={"-27%"}
					top={position ? "41%" : "36%"}
					transition={"0.5s ease"}
					position={"absolute"}
					transform={"rotate(-230deg)"}
					w={"68%"}
				/>
				<Img
					src="keycaps.png"
					right={"-27%"}
					top={position ? "-28%" : "-33%"}
					transition={"0.5s ease"}
					position={"absolute"}
					transform={"rotate(-20deg)"}
					w={"60%"}
				/>
			</Box>
		</Center>
	);
};
