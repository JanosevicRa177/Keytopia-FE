import { Box, Img, Text, Flex, Button } from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import { SectionContainer, SectionStyle } from "../components/page-component/section-container";
import { colorPallete } from "../styles/color";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
	const navigate = useNavigate();
	return (
		<MainContrainer>
			<Flex
				bg={"rgba(255,255,255,0.5)"}
				backdropFilter="auto"
				backdropBlur="4px"
				flexDirection={"column"}
			>
				<SectionContainer style={SectionStyle.right}>
					<Img src="key0.png" h={"100%"} w={"50%"} position={"absolute"} />
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"50px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								Welcome to Keytopia!
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								The ultimate destination for all your custom keyboard needs!
								<br />
								<br />
								Whether you're a seasoned enthusiast or new to the world of
								mechanical keyboards, we have something special for everyone.
							</Text>
						</Box>
					</Flex>
				</SectionContainer>
				<SectionContainer style={SectionStyle.left}>
					<Img
						src="key1.png"
						h={"100%"}
						w={"50%"}
						position={"absolute"}
						top="-50px"
						left="-30px"
					/>
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"25px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								Discover a world of endless possibilities!
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								As you explore our extensive collection of top-quality keyboard
								parts. From keycaps and switches to plates and stabilizers, we offer
								a wide range of components to cater to your customization desires.
								Our carefully curated selection features trusted brands and
								exclusive collaborations, ensuring you'll find the perfect parts to
								enhance your typing experience.
							</Text>
							<Flex justifyContent={"center"} mt={"24px"}>
								<Button
									w={"280px"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									onClick={() => {
										navigate("/shop-parts");
									}}
									bg={colorPallete.button}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
								>
									Shop now!
								</Button>
							</Flex>
						</Box>
					</Flex>
				</SectionContainer>
				<SectionContainer style={SectionStyle.right}>
					<Img
						src="key2.png"
						h={"100%"}
						w={"50%"}
						position={"absolute"}
						transform={"scale(1.1,1.1)"}
					/>
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"25px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								Become the master of your typing experience
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								With our wide selection of keycaps, switches, plates, and other
								essential components, you can mix and match to create a keyboard
								that is truly one-of-a-kind. Let your imagination run wild as you
								choose from an array of colors, materials, and designs to build a
								keyboard that is as unique as you are.
							</Text>
							<Flex justifyContent={"center"} mt={"24px"}>
								<Button
									w={"280px"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									onClick={() => {
										navigate("/custom-keyboard");
									}}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
								>
									Make your own keyboard
								</Button>
							</Flex>
						</Box>
					</Flex>
				</SectionContainer>
				<SectionContainer style={SectionStyle.left}>
					<Img
						src="key3.png"
						h={"100%"}
						position={"absolute"}
						top="-50px"
						left={"-125px"}
					/>
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"25px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								Looking for a hassle-free way to elevate your typing game?
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								Explore our selection of prebuilt custom keyboards. Each keyboard is
								expertly crafted with precision and attention to detail, ensuring a
								seamless typing experience right out of the box. Choose from a
								variety of stunning designs and layouts, all carefully selected to
								deliver exceptional performance and style.
							</Text>
							<Flex justifyContent={"center"} mt={"24px"}>
								<Button
									w={"250px"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									onClick={() => {
										navigate("/shop-keyboard");
									}}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
								>
									Shop custom keyboard
								</Button>
							</Flex>
						</Box>
					</Flex>
				</SectionContainer>
				<SectionContainer style={SectionStyle.right}>
					<Img
						src="key4.png"
						position={"absolute"}
						top="-20px"
						right="20px"
						transform={"scale(1.35,1.35)"}
					/>
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"25px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								Ready to dive into the world of keyboard DIY?
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								You've come to the right place. Browse through our extensive range
								of individual keyboard parts and unleash your creativity. Whether
								you're in search of unique keycaps, high-performance switches, we
								have everything you need to build a custom keyboard that perfectly
								reflects your personal style and preference.
							</Text>
							<Flex justifyContent={"center"} mt={"24px"}>
								<Button
									w={"250px"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									onClick={() => {
										navigate("/shop-parts");
									}}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
								>
									Shop parts
								</Button>
							</Flex>
						</Box>
					</Flex>
				</SectionContainer>
				<SectionContainer style={SectionStyle.left}>
					<Img
						src="key5.png"
						h={"100%"}
						position={"absolute"}
						left="-175px"
						transform={"scale(0.55,0.55);"}
					/>
					<Box h={"100%"} w={"50%"} />
					<Flex color={"black"} w={"50%"} p={"24px"} h={"100%"} flexDir={"column"}>
						<Box mt={"50px"}>
							<Text fontSize={"3xl"} mb={"12px"}>
								So, welcome to Keytopia!
							</Text>
							<Text fontSize={"xl"} textAlign={"justify"}>
								Where your keyboard dreams become a reality. Get ready to embark on
								a personalized typing adventure like no other. Start exploring our
								vast selection, unleash your creativity, and elevate your typing
								experience to new heights. We're honored to have you as part of our
								community, and we can't wait to see the masterpiece you'll create!
							</Text>
						</Box>
					</Flex>
				</SectionContainer>
				<Box height={"calc(100vh - 2815px)"} />
			</Flex>
		</MainContrainer>
	);
};
