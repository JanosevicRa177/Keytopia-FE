/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@chakra-ui/react";
import { CableForm } from "./cable.form";
import { useEffect, useState } from "react";
import { PartType } from "../../../utils/enum";
import { ChoosePartModal } from "./choose-part-modal";
import { CaseForm } from "./case.form";
import { PlateForm } from "./plate.form";
import { PCBForm } from "./pcb.form";
import { StabilizersForm } from "./stabilizers.form";
import { KeycapForm } from "./keycap.form";
import { KeycapSetForm } from "./keycap-set.form";
import { SwitchSetForm } from "./switch-set.form";

interface PartFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	fetchPage: (pageNumber: number) => Promise<void>;
}

export const PartFormContainer = ({ isOpen, onClose, fetchPage }: PartFormContainerProps) => {
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	const [partType, setPartType] = useState<PartType>();
	useEffect(() => {
		onClose();
		onOpenForm();
	}, [partType]);
	useEffect(() => {
		setPartType(undefined);
	}, [isOpenForm]);
	return (
		<>
			<ChoosePartModal isOpen={isOpen} onClose={onClose} setPartType={setPartType} />
			{partType === PartType.CABLE && (
				<CableForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.CASE && (
				<CaseForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.PLATE && (
				<PlateForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.PCB && (
				<PCBForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.STABILIZER && (
				<StabilizersForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.KEYCAP && (
				<KeycapForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.KEYCAP_SET && (
				<KeycapSetForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
			{partType === PartType.SWITCH_SET && (
				<SwitchSetForm isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			)}
		</>
	);
};
