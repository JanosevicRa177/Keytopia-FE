import {
  Flex,
  Text,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { colorPallete } from "../../style/color";
interface RegisterFormProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  function handleSwitchOnLogin() {
    props.setShowRegister(false);
    props.setShowLogin(true);
  }
  function handleRegister() {
    console.log("registracija!");
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
      h={"calc(0.8 * (100vh - 17.5px))"}
    >
      <Flex
        h={"100%"}
        mx="32px"
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={"semibold"} textAlign={"center"} fontSize={"5xl"}>
          Register
        </Text>
        <FormControl>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            Email address
          </FormLabel>
          <Input
            type="email"
            rounded={"30px"}
            h={"35px"}
            borderColor={colorPallete.inputBorder}
            _hover={{ borderColor: colorPallete.inputBorderHover }}
          />
          <Flex gap={"16px"} mt={"4px"}>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Name
              </FormLabel>
              <Input
                type="name"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Surname
              </FormLabel>
              <Input
                type="surname"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
          </Flex>
          <Flex gap={"16px"} mt={"4px"}>
            <Box w={"95%"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Street
              </FormLabel>
              <Input
                type="street"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
            <Box w={"35%"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Street Number
              </FormLabel>
              <Input
                type="streetNumber"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
          </Flex>
          <Flex gap={"16px"} mt={"4px"}>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                City
              </FormLabel>
              <Input
                type="city"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Zip code
              </FormLabel>
              <Input
                type="zipCode"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Country
              </FormLabel>
              <Input
                type="country"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
          </Flex>
          <Flex gap={"16px"} mt={"4px"}>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Password
              </FormLabel>
              <Input
                type="password"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
            <Box flexGrow={"1"}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                Confirm password
              </FormLabel>
              <Input
                type="password"
                rounded={"30px"}
                h={"35px"}
                borderColor={colorPallete.inputBorder}
                _hover={{ borderColor: colorPallete.inputBorderHover }}
              />
            </Box>
          </Flex>
        </FormControl>
        <Center h={"50px"} mt={"32px"} w={"auto"}>
          <Button
            w={"calc(100% - 64px)"}
            h={"45px"}
            rounded={"32px"}
            onClick={() => handleRegister()}
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
            Register
          </Button>
        </Center>
        <Flex
          h={"45px"}
          mt={"12px"}
          w={"auto"}
          justifyContent={"end"}
          alignContent={"center"}
        >
          <Text h={"45px"} fontSize={"large"} mr={"8px"}>
            Already have an account?
          </Text>
          <Text
            h={"50px"}
            onClick={() => handleSwitchOnLogin()}
            fontSize={"large"}
            cursor={"pointer"}
            mr={"8px"}
            color={colorPallete.link}
          >
            Login
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
