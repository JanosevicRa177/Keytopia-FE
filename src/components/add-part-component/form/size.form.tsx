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
  SIZE_DEFAULT_VALUES,
  SIZE_VALIDATION_SCHEMA,
} from "../../../utils/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateSize } from "../../../hooks/part-data-hooks/create/size.create.hook";

export type SizeFormValues = {
  name: string;
  neededNumberOfKeys: number;
};

export const SizeForm = () => {
  const { createSize } = useCreateSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SizeFormValues>({
    defaultValues: SIZE_DEFAULT_VALUES,
    resolver: yupResolver(SIZE_VALIDATION_SCHEMA),
  });
  async function handleCreateSize(values: SizeFormValues) {
    createSize(values);
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
          Size
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
          <FormControl isInvalid={errors.neededNumberOfKeys != null}>
            <FormLabel fontWeight={"semibold"}>Needed Number Of Keys</FormLabel>
            <Input
              type="number"
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("neededNumberOfKeys")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            />
            {errors.neededNumberOfKeys ? (
              <FormErrorMessage ml={"8px"}>
                Needed number of keys is required and should be a positive
                number
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
            onClick={handleSubmit(handleCreateSize)}
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
            Create size
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
