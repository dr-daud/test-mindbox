import {
	Stack,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";

import type { TFilter } from "../types";

interface Props {
	remainingCount: number;
	filter: TFilter;
	setFilter: (filter: TFilter) => void;
	clearCompleted: () => void;
	totalTasks: number;
}

const TodoFooter = ({
	remainingCount,
	filter,
	setFilter,
	clearCompleted,
	totalTasks,
}: Props) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const completedCount = totalTasks - remainingCount;

	return (
		<Stack
			direction={isMobile ? "column" : "row"}
			justifyContent="space-between"
			alignItems={isMobile ? "stretch" : "center"}
			spacing={isMobile ? 2 : 0}
			mt={2}
		>
			<Typography align={isMobile ? "center" : "left"}>
				{remainingCount} items left
			</Typography>
			<Stack
				direction="row"
				spacing={1}
				justifyContent={isMobile ? "center" : "flex-start"}
				sx={{
					flexWrap: isMobile ? "wrap" : "nowrap",
					gap: isMobile ? 0.5 : 1,
				}}
			>
				<Button
					variant={filter === "all" ? "outlined" : "text"}
					onClick={() => setFilter("all")}
					size={isMobile ? "small" : "medium"}
				>
					All
				</Button>
				<Button
					variant={filter === "active" ? "outlined" : "text"}
					onClick={() => setFilter("active")}
					size={isMobile ? "small" : "medium"}
				>
					Active
				</Button>
				<Button
					variant={filter === "completed" ? "outlined" : "text"}
					onClick={() => setFilter("completed")}
					size={isMobile ? "small" : "medium"}
				>
					Completed
				</Button>
			</Stack>
			{completedCount > 0 && (
				<Button
					onClick={clearCompleted}
					size={isMobile ? "small" : "medium"}
					sx={{ alignSelf: isMobile ? "center" : "flex-end" }}
				>
					Clear completed
				</Button>
			)}
		</Stack>
	);
};

export default TodoFooter;
