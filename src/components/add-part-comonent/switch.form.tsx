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
  Select,
} from "@chakra-ui/react";
import { colorPallete } from "../../style/color";
import {
  SWTICH_DEFAULT_VALUES,
  SWTICH_VALIDATION_SCHEMA,
} from "../../utils/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PinType, SwitchType } from "../../utils/enum";
import { useCreateSwitch } from "../../hooks/part-data-hooks/switch.hook";

export type SwitchFormValues = {
  name: string;
  actuationForce: number;
  actuationPoint: number;
  switchType: SwitchType;
  pinType: PinType;
};

export const SwitchForm = () => {
  const { createSwitch } = useCreateSwitch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SwitchFormValues>({
    defaultValues: SWTICH_DEFAULT_VALUES,
    resolver: yupResolver(SWTICH_VALIDATION_SCHEMA),
  });
  async function handleCreateSize(values: SwitchFormValues) {
    createSwitch(values);
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
          Switch
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
        <Flex gap={"16px"}>
          <FormControl isInvalid={errors.actuationForce != null}>
            <FormLabel fontWeight={"semibold"}>Actuation force</FormLabel>
            <Input
              type="number"
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("actuationForce")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            />
            {errors.actuationForce ? (
              <FormErrorMessage ml={"8px"}>
                Actuation force is required
              </FormErrorMessage>
            ) : (
              <Box h={"25px"} w="100%" ml={"8px"}></Box>
            )}
          </FormControl>
          <FormControl isInvalid={errors.actuationPoint != null}>
            <FormLabel fontWeight={"semibold"}>Actuation point</FormLabel>
            <Input
              type="number"
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("actuationPoint")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            />
            {errors.actuationPoint ? (
              <FormErrorMessage ml={"8px"}>
                Actuation point is required
              </FormErrorMessage>
            ) : (
              <Box h={"25px"} w="100%" ml={"8px"}></Box>
            )}
          </FormControl>
        </Flex>
        <Flex gap={"16px"}>
          <FormControl isInvalid={errors.switchType != null}>
            <FormLabel fontWeight={"semibold"}>Switch type</FormLabel>
            <Select
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("switchType")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            >
              <option value={SwitchType.TACTILE} selected>
                Tactile
              </option>
              <option value={SwitchType.LINEAR}>Linear</option>
              <option value={SwitchType.CLICKY}>Clicky</option>
            </Select>
            {errors.switchType ? (
              <FormErrorMessage ml={"8px"}>
                Switch type is required
              </FormErrorMessage>
            ) : (
              <Box h={"25px"} w="100%" ml={"8px"}></Box>
            )}
          </FormControl>
          <FormControl isInvalid={errors.pinType != null}>
            <FormLabel fontWeight={"semibold"}>Pin type</FormLabel>
            <Select
              rounded={"30px"}
              h={"45px"}
              borderColor={colorPallete.inputBorder}
              {...register("pinType")}
              _hover={{ borderColor: colorPallete.inputBorderHover }}
            >
              <option value={PinType.PIN5} selected>
                5 pin
              </option>
              <option value={PinType.PIN3}>3 pin</option>
            </Select>
            {errors.pinType ? (
              <FormErrorMessage ml={"8px"}>
                Pin type is required
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
            Create switch
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
