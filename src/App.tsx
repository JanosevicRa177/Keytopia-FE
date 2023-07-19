import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/footer/footer";
import { routes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/header/header";
import { colors } from "./styles/color";
import { ImgComponent } from "./components/util-components/img-component";

function App() {
	return (
		<Router>
			<Flex w="100%" h="100%" minH="100vh" direction="column">
				<Header />
				<ImgComponent />
				<Box
					bgGradient={colors.background}
					position={"fixed"}
					w={"100vw"}
					h={"100vh"}
					zIndex={"-1"}
				/>
				<Routes>
					{routes.map((route, index) => {
						const {
							path,
							needAuth,
							requiredRole,
							element: Element,
						} = route;
						if (needAuth && requiredRole) {
							return (
								<Route
									key={index}
									path={path}
									element={
										<ProtectedRoute
											key={index}
											requiredRole={requiredRole}
											element={Element}
											needAuthorization={needAuth}
										/>
									}
								/>
							);
						}
						return (
							<Route key={index} path={path} element={Element} />
						);
					})}
				</Routes>
				<Footer></Footer>
				<ToastContainer position={"top-right"} theme={"colored"} />
			</Flex>
		</Router>
	);
}

export default App;
