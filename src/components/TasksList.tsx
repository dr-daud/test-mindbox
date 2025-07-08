import { Typography, Box, Stack } from "@mui/material";

import TaskItem from "./TaskItem";
import type { TFilter, TTask, TToggleTask } from "../types/types";

interface Props {
	filteredTasks: TTask[];
	toggleTask: TToggleTask;
	deleteTask: (id: number) => void;
	filter: TFilter;
}

const emptyMessageConfig = {
	active: "No active tasks",
	completed: "No completed tasks",
	all: "No tasks",
};

const TasksList = ({
	filteredTasks,
	toggleTask,
	deleteTask,
	filter,
}: Props) => {
	if (filteredTasks.length === 0) {
		return (
			<Box sx={{ py: 4, textAlign: "center" }}>
				<Typography variant="body1" color="text.secondary">
					{emptyMessageConfig[filter] || emptyMessageConfig.all}
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
