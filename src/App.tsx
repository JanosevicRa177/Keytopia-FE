import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { routes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Flex w="100%" h="100%" minH="100vh" direction="column">
        <Header></Header>
        <Routes>
          {routes.map((route, index) => {
            const { path, isProtected, requiredRole, element: Element } = route;
            if (isProtected && requiredRole) {
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <ProtectedRoute
                      key={index}
                      requiredRole={requiredRole}
                      element={Element}
                    />
                  }
                />
              );
            }
            return <Route key={index} path={path} element={Element} />;
          })}
        </Routes>
        <Footer></Footer>
        <ToastContainer position={"top-right"} />
      </Flex>
    </Router>
  );
}

export default App;
