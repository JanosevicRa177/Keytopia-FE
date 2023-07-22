import {
	Center,
	Flex,
	Text,
	Img,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import {
	SectionContainer,
	SectionStyle,
} from "../components/page-component/section-container";
import { useApplicationStore } from "../store/store";
import userImg from "../images/user.png";
import { colorPallete } from "../styles/color";
import { ChangePasswordForm } from "../components/form/auth-form/change-password.form";
import { UpdateAccountForm } from "../components/form/auth-form/update-account.form";

export const UserPage = () => {
	const user = useApplicationStore((state) => state.user);
	const {
		isOpen: isOpenChangePasswordForm,
		onClose: onCloseChangePasswordForm,
		onOpen: onOpenChangePasswordForm,
	} = useDisclosure();
	const {
		isOpen: isOpenUpdateAccountForm,
		onClose: onCloseUpdateAccountForm,
		onOpen: onOpenUpdateAccountForm,
	} = useDisclosure();
	return (
		<MainContrainer>
			<Center h={"calc(100vh - 105px)"} w={"100%"} px={"8px"}>
				<SectionContainer style={SectionStyle.left}>
					<Flex
						my={"32px"}
						mx={"32px"}
						flexDirection={"column"}
						gap={"8px"}
						justifyContent={"center"}
						fontSize={"2xl"}
					>
						<Flex gap={"4px"}>
							<Text fontWeight={"bold"}>Email:</Text>
							<Text>{user?.email}</Text>
						</Flex>
						<Flex gap={"4px"}>
							<Text fontWeight={"bold"}>Phone:</Text>
							<Text>{user?.phone}</Text>
						</Flex>
						<Flex gap={"4px"}>
							<Text fontWeight={"bold"}>Address:</Text>
							<Text>
								{" "}
								{user?.address.street}{" "}
								{user?.address.streetNumber},{" "}
								{user?.address.zipCode} {user?.address.city},{" "}
								{user?.address.country}
							</Text>
						</Flex>
						<Flex gap={"16px"} mt={"16px"}>
							<Flex
								justifyContent={"center"}
								position={"relative"}
								flexGrow={"1"}
							>
								<Button
									w={"100%"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
									onClick={() => {
										onOpenChangePasswordForm();
									}}
								>
									Change password
								</Button>
							</Flex>
							<Flex
								justifyContent={"center"}
								position={"relative"}
								flexGrow={"1"}
							>
								<Button
									w={"100%"}
									h={"45px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"xl"}
									position={"absolute"}
									onClick={() => {
										onOpenUpdateAccountForm();
									}}
								>
									Update account
								</Button>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						my={"32px"}
						mx={"32px"}
						flexDirection={"column"}
						gap={"8px"}
						justifyContent={"center"}
						alignItems={"center"}
						fontSize={"2xl"}
						flexGrow={"1"}
					>
						<Img src={userImg} w={"200px"} h={"200px"} />
						<Text fontSize={"4xl"}>
							{user?.name} {user?.surname}
						</Text>
					</Flex>
				</SectionContainer>
			</Center>
			<ChangePasswordForm
				isOpen={isOpenChangePasswordForm}
				onClose={onCloseChangePasswordForm}
			/>
			<UpdateAccountForm
				isOpen={isOpenUpdateAccountForm}
				onClose={onCloseUpdateAccountForm}
			/>
		</MainContrainer>
	);
};