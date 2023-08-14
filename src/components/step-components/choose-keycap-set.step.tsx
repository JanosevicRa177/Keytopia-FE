/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchKeycapSetPage } from "../../hooks/part-hooks/get-all/keycap-set.get-all-page.hook";

export const ChooseKeycapSet = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getKeycapSetPage, getKeycapSetPageRes } = useFetchKeycapSetPage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const sizeName = useApplicationStore((state) => state.sizeName);
	const color = useApplicationStore((state) => state.color);
	const setKeycapSet = useApplicationStore((state) => state.setKeycapSet);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMoreKeycapSet(part: PartData) {
		setPart(part);
	}
	async function chooseKeycapSet(keycapSet: PartData) {
		setKeycapSet(keycapSet);
	}
	async function fetchPage(page: number) {
		getKeycapSetPage(page, "", priceWeight, color, sizeName).then(() =>
			setCurrentPage(page + 1)
		);
	}
	function getKeycapSetName(): string {
		return keyboard.keycapSet?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose keycap set</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getKeycapSetPageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMoreKeycapSet}
						choosePart={chooseKeycapSet}
						choosenPartName={getKeycapSetName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getKeycapSetPageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
