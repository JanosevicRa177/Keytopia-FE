/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
	Cable,
	Case,
	Keycap,
	KeycapSet,
	PCB,
	Part,
	PartWithData,
	Plate,
	Stabilizers,
	SwitchSet,
} from "../../model/part.model";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalView } from "./part-modal.view";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useGetOneCable } from "../../hooks/part-hooks/get-one/cable.get-one.hook";
import { PartType } from "../../utils/enum";
import { useGetOneCase } from "../../hooks/part-hooks/get-one/case.get-one.hook";
import { useGetOneKeycap } from "../../hooks/part-hooks/get-one/keycap.get-one.hook";
import { useGetOneKeycapSet } from "../../hooks/part-hooks/get-one/keycap-set.get-one.hook";
import { useGetOneSwitchSet } from "../../hooks/part-hooks/get-one/switch-set.get-one.hook";
import { useGetOnePCB } from "../../hooks/part-hooks/get-one/pcb.get-one.hook";
import { useGetOnePlate } from "../../hooks/part-hooks/get-one/plate.get-one.hook";
import { useGetOneStabilizers } from "../../hooks/part-hooks/get-one/stabilizers.get-one.hook";
import { handlePartVariables } from "../../utils/string.converter";
import { useDisclosure } from "@chakra-ui/react";

interface PartModalControlProps {
	partData?: PartData;
	setPartData: React.Dispatch<React.SetStateAction<PartData | undefined>>;
}

export const PartModalControl = ({ partData, setPartData }: PartModalControlProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getCable } = useGetOneCable();
	const { getCase } = useGetOneCase();
	const { getKeycap } = useGetOneKeycap();
	const { getKeycapSet } = useGetOneKeycapSet();
	const { getSwitchSet } = useGetOneSwitchSet();
	const { getPCB } = useGetOnePCB();
	const { getPlate } = useGetOnePlate();
	const { getStabilizers } = useGetOneStabilizers();
	useEffect(() => {
		if (partData === undefined) return;
		handleShowMorePart(partData);
	}, [partData]);
	function onCloseModal() {
		setPartData(undefined);
		onClose();
	}
	async function handleShowMorePart(part: PartData) {
		if (part.partType === PartType.CABLE)
			await getCable(part.name).then((cable: ApiResponse<Cable | null>) => {
				handlePartVariables(cable.data as unknown as Part, setPart, PartType.CABLE);
				onOpen();
			});
		else if (part.partType === PartType.CASE)
			await getCase(part.name).then((aCase: ApiResponse<Case | null>) => {
				handlePartVariables(aCase.data as unknown as Part, setPart, PartType.CASE);
				onOpen();
			});
		else if (part.partType === PartType.PLATE)
			await getPlate(part.name).then((plate: ApiResponse<Plate | null>) => {
				handlePartVariables(plate.data as unknown as Part, setPart, PartType.PLATE);
				onOpen();
			});
		else if (part.partType === PartType.SWITCH_SET)
			await getSwitchSet(part.name).then((switchSet: ApiResponse<SwitchSet | null>) => {
				handlePartVariables(switchSet.data as unknown as Part, setPart, PartType.SWITCH_SET);
				onOpen();
			});
		else if (part.partType === PartType.PCB)
			await getPCB(part.name).then((pcb: ApiResponse<PCB | null>) => {
				handlePartVariables(pcb.data as unknown as Part, setPart, PartType.PCB);
				onOpen();
			});
		else if (part.partType === PartType.STABILIZER)
			await getStabilizers(part.name).then((stabilizers: ApiResponse<Stabilizers | null>) => {
				handlePartVariables(stabilizers.data as unknown as Part, setPart, PartType.STABILIZER);
				onOpen();
			});
		else if (part.partType === PartType.KEYCAP)
			await getKeycap(part.name).then((keycap: ApiResponse<Keycap | null>) => {
				handlePartVariables(keycap.data as unknown as Part, setPart, PartType.KEYCAP);
				onOpen();
			});
		else if (part.partType === PartType.KEYCAP_SET)
			await getKeycapSet(part.name).then((keycapSet: ApiResponse<KeycapSet | null>) => {
				handlePartVariables(keycapSet.data as unknown as Part, setPart, PartType.KEYCAP_SET);
				onOpen();
			});
	}
	return <PartModalView isOpen={isOpen} onClose={onCloseModal} part={part} />;
};
