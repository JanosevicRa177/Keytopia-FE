export type ApiResponse<T> = {
	error: string | null;
	data: T;
	status: "IDLE" | "SUCCESS" | "ERROR";
};
