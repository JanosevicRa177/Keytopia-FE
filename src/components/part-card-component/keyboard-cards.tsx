import { Flex } from "@chakra-ui/react";
import { useApplicationStore } from "../../store/store";
import { useEffect, useState } from "react";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import { PartType } from "../../utils/enum";
import { SmallPartCard } from "./small-part-card";

export const KeyboardCards = () => {
	const [keyboardParts, setKeyboardParts] = useState<PartData[]>([]);
	const keyboard = useApplicationStore((store) => store.keyboard);
	useEffect(() => {
		let tempParts: PartData[] = [];
		tempParts.push({
			name: keyboard.caseEntity?.name ?? "",
			imageUrl: keyboard.caseEntity?.imageUrl ?? "",
			partType: PartType.CASE,
			price: keyboard.caseEntity?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.pcb?.name ?? "",
			imageUrl: keyboard.pcb?.imageUrl ?? "",
			partType: PartType.PCB,
			price: keyboard.pcb?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.plate?.name ?? "",
			imageUrl: keyboard.plate?.imageUrl ?? "",
			partType: PartType.PLATE,
			price: keyboard.plate?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.cable?.name ?? "",
			imageUrl: keyboard.cable?.imageUrl ?? "",
			partType: PartType.CABLE,
			price: keyboard.cable?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.switchSet?.name ?? "",
			imageUrl: keyboard.switchSet?.imageUrl ?? "",
			partType: PartType.SWITCH_SET,
			price: keyboard.switchSet?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.stabilizers?.name ?? "",
			imageUrl: keyboard.stabilizers?.imageUrl ?? "",
			partType: PartType.STABILIZER,
			price: keyboard.stabilizers?.price ?? 0,
		});
		tempParts.push({
			name: keyboard.keycapSet?.name ?? "",
			imageUrl: keyboard.keycapSet?.imageUrl ?? "",
			partType: PartType.KEYCAP_SET,
			price: keyboard.keycapSet?.price ?? 0,
		});
		setKeyboardParts(tempParts);
	}, [keyboard]);
	return (
		<Flex gap={"12px"}>
			{keyboardParts.map((part, index) => (
				<SmallPartCard part={part} key={index} />
			))}
		</Flex>
	);
};
