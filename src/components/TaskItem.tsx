import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { TTask, TToggleTask } from "../types/types";

interface Props {
	task: TTask;
	toggleTask: TToggleTask;
	deleteTask: (id: number) => void;
}

const TaskItem = ({ task, toggleTask, deleteTask }: Props) => {
	return (
		<ListItem
			secondaryAction={
				<Checkbox
					checked={task.completed}
					onClick={() => toggleTask(task.id)}
				/>
			}
		>
			<IconButton
				onClick={() => deleteTask(task.id)}
				sx={{ color: "error.main", mr: 1 }}
			>
				<Delete />
			</IconButton>
			<ListItemText
				primary={task.text}
				sx={{
					textDecoration: task.completed ? "line-through" : "none",
					color: task.completed ? "gray" : "black",
				}}
			/>
		</ListItem>
	);
};

export default TaskItem;
