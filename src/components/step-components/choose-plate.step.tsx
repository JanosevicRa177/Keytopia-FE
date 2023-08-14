/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData, PartDataWithSize } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchPlatePage } from "../../hooks/part-hooks/get-all/plate.get-all-page.hook";

export const ChoosePlate = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getPlatePage, getPlatePageRes } = useFetchPlatePage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const sizeName = useApplicationStore((state) => state.sizeName);
	const color = useApplicationStore((state) => state.color);
	const setPlate = useApplicationStore((state) => state.setPlate);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMorePlate(part: PartData) {
		setPart(part);
	}
	async function choosePlate(aCase: PartDataWithSize) {
		setPlate(aCase);
	}
	async function fetchPage(page: number) {
		getPlatePage(page, "", color, sizeName, priceWeight).then(() => setCurrentPage(page + 1));
	}
	function getPlateName(): string {
		return keyboard.plate?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose plate</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getPlatePageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMorePlate}
						choosePart={choosePlate}
						choosenPartName={getPlateName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getPlatePageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
