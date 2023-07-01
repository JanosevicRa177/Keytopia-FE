import {
  Text,
  Center,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { colorPallete } from "../../style/color";
import { useApplicationStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  LOGIN_DEFAULT_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from "../../utils/auth.constants";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const login = useApplicationStore((state) => state.login);
  const navigate = useNavigate();
  function handleSwitchOnRegister() {
    props.setShowRegister(true);
    props.setShowLogin(false);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
  });
  async function handleLogin(values: FormValues) {
    console.log("login!");
    console.log(values);
    //await login(values);
    navigate("/");
  }
  return (
    <Flex
      bg={"rgba(255,255,255,1)"}
      color={"#000"}
      w={"100%"}
      mt="auto"
      backdropFilter="auto"
      backdropBlur="3px"
      flexDirection={"column"}
      h={"calc(0.8* (100vh - 17.5px))"}
    >
      <Flex
        h={"100%"}
        mx="32px"
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={"semibold"} textAlign={"center"} fontSize={"5xl"}>
          Login
        </Text>
        <FormControl mt={"16px"} isInvalid={errors.email != null}>
          <FormLabel fontWeight={"semibold"}>Email address</FormLabel>
          <Input
            type="text"
            rounded={"30px"}
            h={"45px"}
            borderColor={colorPallete.inputBorder}
            {...register("email")}
            _hover={{ borderColor: colorPallete.inputBorderHover }}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt={"16px"} isInvalid={errors.password != null}>
          <FormLabel mt={"8px"} fontWeight={"semibold"}>
            Password
          </FormLabel>
          <Input
            type="password"
            rounded={"30px"}
            h={"45px"}
            {...register("password")}
            borderColor={colorPallete.inputBorder}
            _hover={{ borderColor: colorPallete.inputBorderHover }}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Center h={"45px"} mt={"32px"} w={"auto"}>
          <Button
            w={"calc(100% - 64px)"}
            h={"45px"}
            rounded={"32px"}
            onClick={() => handleSubmit(handleLogin)}
            overflow={"hidden"}
            bg={colorPallete.button}
            _hover={{
              bg: colorPallete.buttonHover,
              w: "calc(1.03 * (100% - 64px))",
              h: "46.5px",
              transition: "0.2s",
            }}
            fontSize={"xl"}
            position={"absolute"}
          >
            Login
          </Button>
        </Center>
        <Flex
          h={"45px"}
          mt={"32px"}
          w={"auto"}
          justifyContent={"end"}
          alignContent={"center"}
        >
          <Text h={"45px"} fontSize={"xl"} mr={"8px"}>
            Dont have the account?
          </Text>
          <Text
            h={"50px"}
            onClick={() => handleSwitchOnRegister()}
            fontSize={"xl"}
            cursor={"pointer"}
            mr={"8px"}
            color={colorPallete.link}
          >
            Register
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
