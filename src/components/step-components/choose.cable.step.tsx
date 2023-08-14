/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchCablePage } from "../../hooks/part-hooks/get-all/cable.get-all-page.hook";

export const ChooseCable = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getCablePage, getCablePageRes } = useFetchCablePage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const color = useApplicationStore((state) => state.color);
	const setCable = useApplicationStore((state) => state.setCable);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMoreCable(part: PartData) {
		setPart(part);
	}
	async function chooseCable(cable: PartData) {
		setCable(cable);
	}
	async function fetchPage(page: number) {
		getCablePage(page, "", color, priceWeight).then(() => setCurrentPage(page + 1));
	}
	function getCableName(): string {
		return keyboard.cable?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose cable</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getCablePageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMoreCable}
						choosePart={chooseCable}
						choosenPartName={getCableName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getCablePageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
