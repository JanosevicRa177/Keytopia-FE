import {
  Box,
  Flex,
  Text,
  Center,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { colorPallete } from "../../style/color";
import {
  KEYCAP_PROFILE_DEFAULT_VALUES,
  KEYCAP_PROFILE_VALIDATION_SCHEMA,
} from "../../utils/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateKeycapProfile } from "../../hooks/part-data-hooks/keycap-profile.hook";

export type KeycapProfileFormValues = {
  name: string;
};

export const KeycapProfileForm = () => {
  const { createKeycapProfile } = useCreateKeycapProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KeycapProfileFormValues>({
    defaultValues: KEYCAP_PROFILE_DEFAULT_VALUES,
    resolver: yupResolver(KEYCAP_PROFILE_VALIDATION_SCHEMA),
  });
  async function handleCreateKeycapProfile(values: KeycapProfileFormValues) {
    createKeycapProfile(values);
  }
  return (
    <Box height={"calc(100vh - 215px)"} w={"100%"}>
      <Flex
        color={"#343434"}
        bgColor={"rgba(255,255,255,0.6)"}
        mx={"auto"}
        mb={"32px"}
        px={"32px"}
        py={"48px"}
        rounded={"16px"}
        position={"relative"}
        fontWeight={"bold"}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
        w={"40%"}
      >
        <Text
          fontWeight={"semibold"}
          textAlign={"center"}
          fontSize={"3xl"}
          mb={"16px"}
        >
          Keycap Profile
        </Text>
        <FormControl isInvalid={errors.name != null}>
          <FormLabel fontWeight={"semibold"}>Name</FormLabel>
          <Input
            type="text"
            rounded={"30px"}
            h={"45px"}
            borderColor={colorPallete.inputBorder}
            {...register("name")}
            _hover={{ borderColor: colorPallete.inputBorderHover }}
          />
          {errors.name ? (
            <FormErrorMessage ml={"8px"}>
              {errors.name.message}
            </FormErrorMessage>
          ) : (
            <Box h={"25px"} w="100%" ml={"8px"}></Box>
          )}
        </FormControl>
        <Center h={"45px"} mt={"16px"} w={"auto"}>
          <Button
            w={"calc(100% - 64px)"}
            h={"45px"}
            rounded={"32px"}
            onClick={handleSubmit(handleCreateKeycapProfile)}
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
            Create keycap profile
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
