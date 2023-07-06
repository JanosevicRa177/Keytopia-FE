/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUserActivation } from "../hooks/auth-hooks/activate-user-hook";
import { colorPallete } from "../style/color";
import { ApiResponse } from "../store/auth-store/types/response.type";
import { useApplicationStore } from "../store/store";

export const ActivateRedirectPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const showLogin = useApplicationStore((state) => state.showLogin);
  const { userActivation } = useUserActivation();
  useEffect(() => {
    handleUserActivation();
    navigate("/authorization");
  }, []);
  const handleUserActivation = async () => {
    if (token === undefined) return;
    await userActivation(token).then(async (res: ApiResponse<null>) => {
      if (res.status === "SUCCESS") {
        await showLogin().then(() => {
          navigate("/authorization");
        });
      } else navigate("/");
    });
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"calc(100vh - 105px)"}
    >
      <Spinner boxSize={36} thickness="10px" color={colorPallete.header} />
    </Flex>
  );
};
