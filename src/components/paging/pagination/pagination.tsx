/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { PageLink } from "../page-link/page-link";

export type PaginationProps = {
	currentPage: number;
	lastPage: number;
	maxLength: number;
	sortBy?: string;
	sortDirection?: string;
	getPage: (page: number, sortBy: string, sortDirection: string) => void;
	setCurrentPage: (page: number) => void;
};
export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	lastPage,
	maxLength,
	setCurrentPage,
	getPage,
	sortBy = "",
	sortDirection = "",
}) => {
	const [pageNums, setPageNums] = useState<Array<number>>();
	useEffect(() => {
		setPageNums(getPaginationItems(currentPage, lastPage, maxLength));
	}, [currentPage, lastPage]);
	return (
		<Flex mx={"auto"} gap={"8px"} my={"16px"}>
			<PageLink
				notNumber={true}
				disabled={currentPage === 1}
				onClick={() => {
					setCurrentPage(currentPage - 1);
					getPage(currentPage - 1 - 1, sortBy, sortDirection);
				}}
			>
				Previous
			</PageLink>
			{pageNums?.map((pageNum, idx) => (
				<PageLink
					notNumber={false}
					key={idx}
					active={currentPage === pageNum}
					disabled={isNaN(pageNum)}
					onClick={() => {
						setCurrentPage(pageNum);
						getPage(pageNum - 1, sortBy, sortDirection);
					}}
				>
					{!isNaN(pageNum) ? pageNum : "..."}
				</PageLink>
			))}
			<PageLink
				notNumber={true}
				disabled={currentPage === lastPage}
				onClick={() => {
					setCurrentPage(currentPage + 1);
					getPage(currentPage - 1 + 1, sortBy, sortDirection);
				}}
			>
				Next
			</PageLink>
		</Flex>
	);
};

export function getPaginationItems(
	currentPage: number,
	lastPage: number,
	maxLength: number
) {
	const res: Array<number> = [];

	if (lastPage <= maxLength) {
		for (let i = 1; i <= lastPage; i++) {
			res.push(i);
		}
	} else {
		const firstPage = 0;
		const confirmedPagesCount = 3;
		const deductedMaxLength = maxLength - confirmedPagesCount;
		const sideLength = deductedMaxLength / 2;

		if (
			currentPage - firstPage < sideLength ||
			lastPage - currentPage < sideLength
		) {
			for (let j = 1; j <= sideLength + firstPage; j++) {
				res.push(j);
			}
			res.push(NaN);

			for (let k = lastPage - sideLength; k <= lastPage; k++) {
				res.push(k);
			}
		} else if (
			currentPage - firstPage >= deductedMaxLength &&
			lastPage - currentPage >= deductedMaxLength
		) {
			const deductedSideLength = sideLength - 1;
			res.push(1);
			res.push(NaN);

			for (
				let l = currentPage - deductedSideLength;
				l <= currentPage + deductedSideLength;
				l++
			) {
				res.push(l);
			}

			res.push(NaN);
			res.push(lastPage);
		} else {
			const isNearFirstPage =
				currentPage - firstPage < lastPage - currentPage;
			let remainingLength = maxLength;

			if (isNearFirstPage) {
				for (let m = 1; m <= currentPage + 1; m++) {
					res.push(m);
					remainingLength -= 1;
				}

				res.push(NaN);
				remainingLength -= 1;

				for (
					let n = lastPage - (remainingLength - 1);
					n <= lastPage;
					n++
				) {
					res.push(n);
				}
			} else {
				for (let o = lastPage; o >= currentPage - 1; o--) {
					res.unshift(o);
					remainingLength -= 1;
				}

				res.unshift(NaN);
				remainingLength -= 1;

				for (let p = remainingLength; p >= 1; p--) {
					res.unshift(p);
				}
			}
		}
	}
	return res;
}
