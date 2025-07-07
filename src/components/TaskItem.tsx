import { ListItem, ListItemText, Checkbox } from "@mui/material";
import type { TTask, TToggleTask } from "./TasksList";

interface Props {
	task: TTask;
	toggleTask: TToggleTask;
}

export default function TaskItem({ task, toggleTask }: Props) {
	return (
		<ListItem
			secondaryAction={
				<Checkbox
					checked={task.completed}
					onClick={() => toggleTask(task.id)}
				/>
			}
		>
			<ListItemText
				primary={task.text}
				sx={{
					textDecoration: task.completed ? "line-through" : "none",
					color: task.completed ? "gray" : "black",
				}}
			/>
		</ListItem>
	);
}
