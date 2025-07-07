import { List } from "@mui/material";
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
}

const TasksList = ({ filteredTasks, toggleTask }: Props) => {
	return (
		<List>
			{filteredTasks.map((task) => (
				<TaskItem key={task.id} task={task} toggleTask={toggleTask} />
			))}
		</List>
	);
};

export default TasksList;
