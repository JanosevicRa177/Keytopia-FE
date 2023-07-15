export type Page<T> = {
	content: T[];
	totalPages: number;
};

export type MultiselectOption = {
	text: string;
	value: string;
};
