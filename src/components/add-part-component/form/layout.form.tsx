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
import { colorPallete } from "../../../styles/color";
import {
  LAYOUT_DEFAULT_VALUES,
  LAYOUT_VALIDATION_SCHEMA,
} from "../../../utils/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateLayout } from "../../../hooks/part-data-hooks/create/layout.create.hook";

export type LayoutFormValues = {
  name: string;
  localization: string;
};

export const LayoutForm = () => {
  const { createLayout } = useCreateLayout();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LayoutFormValues>({
    defaultValues: LAYOUT_DEFAULT_VALUES,
    resolver: yupResolver(LAYOUT_VALIDATION_SCHEMA),
  });
  async function handleCreateLayout(values: LayoutFormValues) {
    createLayout(values);
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
          Layout
        </Text>
        <Flex gap={"16px"}>
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
          <FormControl isInvalid={errors.localization != null}>
            <FormLabel fontWeight={"semibold"}>Localization</FormLabel>
            <Input
              type="text"
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("localization")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            />
            {errors.localization ? (
              <FormErrorMessage ml={"8px"}>
                {errors.localization.message}
              </FormErrorMessage>
            ) : (
              <Box h={"25px"} w="100%" ml={"8px"}></Box>
            )}
          </FormControl>
        </Flex>
        <Center h={"45px"} mt={"16px"} w={"auto"}>
          <Button
            w={"calc(100% - 64px)"}
            h={"45px"}
            rounded={"32px"}
            onClick={handleSubmit(handleCreateLayout)}
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
            Create layout
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
