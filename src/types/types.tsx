export type TFilter = "all" | "active" | "completed";

export type TTask = {
	id: number;
	text: string;
	completed: boolean;
};

export type TToggleTask = (id: number) => void;
