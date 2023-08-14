/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData, PartWithPinType } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchSwitchSetPage } from "../../hooks/part-hooks/get-all/switch-set.get-all-page";

export const ChooseSwitchSet = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getSwitchSetPage, getSwitchSetPageRes } = useFetchSwitchSetPage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const sizeName = useApplicationStore((state) => state.sizeName);
	const switchType = useApplicationStore((state) => state.switchType);
	const setSwitchSet = useApplicationStore((state) => state.setSwitchSet);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMoreSwitchSet(part: PartData) {
		setPart(part);
	}
	async function chooseSwitchSet(switchSet: PartWithPinType) {
		setSwitchSet(switchSet);
	}
	async function fetchPage(page: number) {
		getSwitchSetPage(page, "", priceWeight, keyboard.pcb?.pinType, switchType, sizeName).then(
			() => setCurrentPage(page + 1)
		);
	}
	function getSwitchSetName(): string {
		return keyboard.switchSet?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose switch set</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getSwitchSetPageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMoreSwitchSet}
						choosePart={chooseSwitchSet}
						choosenPartName={getSwitchSetName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getSwitchSetPageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
