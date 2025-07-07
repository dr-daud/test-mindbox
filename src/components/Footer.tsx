import { Stack, Button, Typography } from "@mui/material";

interface Props {
	remainingCount: number;
	filter: "all" | "active" | "completed";
	setFilter: (filter: "all" | "active" | "completed") => void;
	clearCompleted: () => void;
}

const TodoFooter = ({
	remainingCount,
	filter,
	setFilter,
	clearCompleted,
}: Props) => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			mt={2}
		>
			<Typography>{remainingCount} items left</Typography>
			<Stack direction="row" spacing={1}>
				<Button
					variant={filter === "all" ? "outlined" : "text"}
					onClick={() => setFilter("all")}
				>
					All
				</Button>
				<Button
					variant={filter === "active" ? "outlined" : "text"}
					onClick={() => setFilter("active")}
				>
					Active
				</Button>
				<Button
					variant={filter === "completed" ? "outlined" : "text"}
					onClick={() => setFilter("completed")}
				>
					Completed
				</Button>
			</Stack>
			<Button onClick={clearCompleted}>Clear completed</Button>
		</Stack>
	);
};

export default TodoFooter;
