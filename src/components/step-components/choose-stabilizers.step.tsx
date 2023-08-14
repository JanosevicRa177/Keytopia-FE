/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react";
import { PartCard } from "../part-card-component/part-card";
import { Pagination } from "../paging/pagination/pagination";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/store";
import {
	PartData,
	PartDataWithStabilizerType,
} from "../../store/keyboard-store/types/keyboard.type";
import { PartModalControl } from "../single-view/part-modal.control";
import { useFetchStabilizersPage } from "../../hooks/part-hooks/get-all/stabilizers.get-all-page.hook";

export const ChooseStabilizers = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getStabilizersPage, getStabilizersPageRes } = useFetchStabilizersPage();
	const priceWeight = useApplicationStore((state) => state.priceWeight);
	const keyboard = useApplicationStore((state) => state.keyboard);
	const setStabilizers = useApplicationStore((state) => state.setStabilizers);

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleShowMoreStabilizers(part: PartData) {
		setPart(part);
	}
	async function chooseStabilizers(stabilizers: PartDataWithStabilizerType) {
		setStabilizers(stabilizers);
	}
	async function fetchPage(page: number) {
		getStabilizersPage(page, "", keyboard.pcb?.stabilizerType, priceWeight).then(() =>
			setCurrentPage(page + 1)
		);
	}
	function getStabilizersName(): string {
		return keyboard.stabilizers?.name ?? "";
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			backdropFilter="auto"
			backdropBlur="4px"
			flexDir={"column"}
		>
			<Text fontSize={"4xl"}>Choose stabilizers</Text>
			<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"16px"} w={"100%"}>
				{getStabilizersPageRes.data.content.map((part: PartData) => (
					<PartCard
						key={part.name}
						part={part}
						showMore={handleShowMoreStabilizers}
						choosePart={chooseStabilizers}
						choosenPartName={getStabilizersName()}
					/>
				))}
			</Flex>
			<Pagination
				currentPage={currentPage}
				lastPage={getStabilizersPageRes.data.totalPages}
				maxLength={5}
				setCurrentPage={setCurrentPage}
				getPage={fetchPage}
			/>
			<PartModalControl partData={part} setPartData={setPart} />
		</Flex>
	);
};
