import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { colorPallete, colors } from "../styles/color";
import { useApplicationStore } from "../store/store";
import { AuthLogo } from "../components/image-components/auth-logo";
import { LoginForm } from "../components/form/auth-form/login.form";
import { RegisterForm } from "../components/form/auth-form/register-buyer.form";
import { KeycapsImages } from "../components/image-components/keycaps-images";

export const AuthPage = () => {
	const formState = useApplicationStore((state) => state.formState);
	return (
		<Center
			w={"calc(100vw - 32px)"}
			h={"calc(100vh - 105px)"}
			top={"-35px"}
			position={"relative"}
		>
			<KeycapsImages />
			<AuthLogo />
			<Flex
				bgGradient={colors.component}
				w={"65%"}
				h={"calc(80% + 70px)"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"8px"}
				backdropFilter="auto"
				backdropBlur="8px"
				overflow={"hidden"}
				justifyContent={"space-between"}
			>
				<Box w={"100%"} flexGrow={"1"}>
					<Flex
						zIndex={"-2"}
						position={"absolute"}
						w={"calc(50% - 64px)"}
						flexDirection={"column"}
						opacity={formState.state === "LOGIN" ? "0" : "1"}
						transition={"0.2s"}
						transitionDelay={"0.3s"}
						mx={"32px"}
						justifyContent={"center"}
						alignContent={"center"}
						h={"calc(0.8 * (100vh - 35px))"}
						textAlign={"justify"}
						fontSize={"large"}
						color={colorPallete.text}
					>
						<Text textAlign={"center"} mb={"8px"} fontSize={"4xl"} fontWeight={"bold"}>
							Welcome to Keytopia!
						</Text>{" "}
						Your ultimate destination for custom keyboard parts! We're thrilled to have
						you join our vibrant community of keyboard enthusiasts.
						<br /> <br />
						Whether you're a seasoned mechanical keyboard aficionado or just beginning
						your journey, Keytopia is here to cater to all your customization needs.
					</Flex>
					<Box
						position={"relative"}
						left={formState.state === "LOGIN" ? "0px" : "-101%"}
						transition={"0.3s ease"}
					>
						<LoginForm />
					</Box>
				</Box>
				<Box w={"100%"} flexGrow={"1"}>
					<Flex
						zIndex={"-2"}
						position={"absolute"}
						w={"calc(50% - 64px)"}
						flexDirection={"column"}
						opacity={formState.state === "REGISTER" ? "0" : "1"}
						transition={"0.2s"}
						transitionDelay={"0.3s"}
						mx={"32px"}
						justifyContent={"center"}
						alignContent={"center"}
						h={"calc(0.8 * (100vh - 35px))"}
						textAlign={"justify"}
						fontSize={"large"}
					>
						<Text textAlign={"center"} mb={"8px"} fontSize={"4xl"} fontWeight={"bold"}>
							Welcome to Keytopia!
						</Text>{" "}
						Unlock a world of endless possibilities as you explore our vast collection
						of high-quality keyboard components. From keycaps to switches, plates to
						stabilizers, we have everything you need to create a truly unique typing
						experience that matches your style and preference.
						<br /> <br />
						Our carefully curated selection features top brands and exclusive
						collaborations, ensuring that you'll find the perfect parts to bring your
						dream keyboard to life.
					</Flex>
					<Box
						left={formState.state === "REGISTER" ? "0px" : "100%"}
						position={"relative"}
						transition={"0.3s ease"}
						h={"100%"}
						overflowY={"auto"}
						bg={"rgba(255,255,255,1)"}
					>
						<RegisterForm />
					</Box>
				</Box>
			</Flex>
		</Center>
	);
};
