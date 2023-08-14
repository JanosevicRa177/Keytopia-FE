/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useFetchCasePage } from "../../hooks/part-hooks/get-all/case.get-all-page.hook";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData, PartDataWithSize } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";

export const ChooseCase = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getCasePage, getCasePageRes } = useFetchCasePage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const sizeName = useApplicationStore((state) => state.sizeName);
	const color = useApplicationStore((state) => state.color);
	const setCase = useApplicationStore((state) => state.setCase);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMoreCase(part: PartData) {
		setPart(part);
	}
	async function chooseCase(aCase: PartDataWithSize) {
		setCase(aCase);
	}
	async function fetchPage(page: number) {
		getCasePage(page, "", sizeName, priceWeight, color).then(() => setCurrentPage(page + 1));
	}
	function getCaseName(): string {
		return keyboard.caseEntity?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose case</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getCasePageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMoreCase}
						choosePart={chooseCase}
						choosenPartName={getCaseName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getCasePageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
