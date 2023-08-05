import { Box, Flex, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/store";
import { colorPallete, colors } from "../../styles/color";
import { useEffect, useState } from "react";
import { CustomLink } from "./link";
import { UserControlComponent } from "../util-components/user-control.component";
import { RegisterAdminForm } from "../form/auth-form/register-admin.form";
import downArrow from "../../images/downArrowWhite.png";
import userImg from "../../images/user.png";
import logo from "../../images/logo.png";

export const Header = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenControl, setIsOpenControl] = useState(false);
	const user = useApplicationStore((state) => state.user);
	const logout = useApplicationStore((state) => state.logout);
	const showLogin = useApplicationStore((state) => state.showLogin);
	const showRegister = useApplicationStore((state) => state.showRegister);
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	let location = useLocation();
	function handleLogout() {
		setIsOpenControl(false);
		logout();
		navigate("/");
	}
	function handleUserProfile() {
		setIsOpenControl(false);
		navigate("/user");
	}
	async function handleLogin() {
		showLogin().then(() => {
			navigate("/authorization");
		});
	}
	async function handleRegister() {
		showRegister().then(() => {
			navigate("/authorization");
		});
	}
	useEffect(() => {
		setIsOpen(Boolean(!location.pathname.match("/authorization")));
	}, [location]);

	return (
		<header>
			<Box
				position={"relative"}
				top={isOpen ? "0px" : "-70px"}
				transition={"0.2s ease"}
				w={"100%"}
				zIndex={"100"}
			>
				<Box
					p={"15px 25px"}
					position="fixed"
					w={"100%"}
					bgGradient={colors.component}
					backdropFilter="auto"
					backdropBlur="4px"
				>
					<Box w={"1140px"} mx={"auto"}>
						<Flex
							w={"100%"}
							h={"40px"}
							alignItems={"center"}
							justifyContent="space-between"
						>
							<Flex gap={"16px"} position={"relative"}>
								<Box
									position={"absolute"}
									w={"60px"}
									h={"60px"}
									p={"8px"}
									bg={colorPallete.logoBackground}
									top={"-18px"}
									rounded={"8px"}
									boxShadow={"4px 4px 16px 0px rgba(0,0,0,0.3)"}
									cursor={"pointer"}
									onClick={() => navigate("/")}
								>
									<Img
										src={logo}
										w={"60px"}
										h={"60px"}
										position={"absolute"}
										top={"0px"}
										left={"0px"}
									/>
								</Box>
								<Box w={"60px"} mr={"8px"}></Box>
								{user?.role !== "ADMIN" ? (
									<>
										<CustomLink link={"/shop-parts"} text={"Shop parts"} />
										<CustomLink
											link={"/shop-keyboard"}
											text={"Shop custom keyboard"}
										/>
										<CustomLink
											link={"/user/make-keyboard"}
											text={"Make your own keyboard"}
										/>
									</>
								) : (
									<>
										<CustomLink
											link={"/manage/parts/part"}
											text={"Manage parts"}
										/>
										<CustomLink
											link={"/current/procurement"}
											text={"Current procurement"}
										/>
										<CustomLink link={"/procurements"} text={"Procurements"} />
										<CustomLink
											link={"/admin/make-keyboard"}
											text={"Make keyboard"}
										/>
									</>
								)}
							</Flex>
							<Flex gap="15px">
								{user ? (
									<Flex cursor={"pointer"} gap={"12px"}>
										<Flex
											gap={"4px"}
											cursor={"pointer"}
											onClick={() => handleUserProfile()}
										>
											<Text>{user.name}</Text>
											<Text>{user.surname}</Text>
											<Img src={userImg} w={"30px"} h={"30px"} ml={"4px"} />
										</Flex>
										<Flex
											flexDirection={"column"}
											alignItems={"center"}
											justifyContent={"center"}
										>
											<Img
												src={downArrow}
												onClick={() => setIsOpenControl(!isOpenControl)}
												w={"15px"}
												h={"15px"}
												cursor={"pointer"}
											/>
											<Flex position={"relative"}>
												<UserControlComponent isOpen={isOpenControl}>
													{user?.role === "ADMIN" && (
														<Text
															cursor={"pointer"}
															onClick={() => onOpenForm()}
															fontWeight={"bold"}
														>
															Register admin
														</Text>
													)}
													<Text
														cursor={"pointer"}
														onClick={handleLogout}
														fontWeight={"bold"}
													>
														Logout
													</Text>
												</UserControlComponent>
											</Flex>
										</Flex>
									</Flex>
								) : (
									<Flex gap="15px" color={"white"}>
										<Text onClick={() => handleLogin()} fontWeight={"bold"}>
											Login
										</Text>
										<Text onClick={() => handleRegister()} fontWeight={"bold"}>
											Register
										</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
					</Box>
				</Box>
			</Box>
			<Box height={"70px"}></Box>
			<RegisterAdminForm isOpen={isOpenForm} onClose={onCloseForm} />
		</header>
	);
};
