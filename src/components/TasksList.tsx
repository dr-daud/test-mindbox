import { Typography, Box, Stack } from "@mui/material";
import TaskItem from "./TaskItem";

export type TTask = {
	id: number;
	text: string;
	completed: boolean;
};

export type TToggleTask = (id: number) => void;

interface Props {
	filteredTasks: TTask[];
	toggleTask: TToggleTask;
	deleteTask: (id: number) => void;
	filter: "all" | "active" | "completed";
}

const TasksList = ({ filteredTasks, toggleTask, deleteTask, filter }: Props) => {
	if (filteredTasks.length === 0) {
		const getEmptyMessage = () => {
			switch (filter) {
				case "active":
					return "No active tasks";
				case "completed":
					return "No completed tasks";
				case "all":
				default:
					return "No tasks";
			}
		};

		return (
			<Box sx={{ py: 4, textAlign: "center" }}>
				<Typography variant="body1" color="text.secondary">
					{getEmptyMessage()}
				</Typography>
			</Box>
		);
	}

	return (
		<Stack spacing={1} sx={{ mt: 2 }}>
			{filteredTasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					toggleTask={toggleTask}
					deleteTask={deleteTask}
				/>
			))}
		</Stack>
	);
};

export default TasksList;
