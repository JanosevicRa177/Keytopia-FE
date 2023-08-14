/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import { PartData, PartPcbData } from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchPCBPage } from "../../hooks/part-hooks/get-all/pcb.get-all-page.hook";

export const ChoosePCB = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getPCBPage, getPCBPageRes } = useFetchPCBPage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const sizeName = useApplicationStore((state) => state.sizeName);
	const setPCB = useApplicationStore((state) => state.setPCB);
	const keyboard = useApplicationStore((store) => store.keyboard);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMorePCB(part: PartData) {
		setPart(part);
	}
	async function choosePCB(pcb: PartPcbData) {
		setPCB(pcb);
	}
	async function fetchPage(page: number) {
		getPCBPage(page, "", sizeName, priceWeight).then(() => setCurrentPage(page + 1));
	}
	function getPcbName(): string {
		return keyboard.pcb?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose PCB</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getPCBPageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMorePCB}
						choosePart={choosePCB}
						choosenPartName={getPcbName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getPCBPageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
