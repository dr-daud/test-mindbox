import {
	Box,
	Typography,
	Paper,
	Stack,
	TextField,
	Button,
} from "@mui/material";
import { useState } from "react";

import TasksList from "./components/TasksList";
import TodoFooter from "./components/Footer";
import type { TFilter } from "./types";
import { TASKS } from "./constants";
import {
	addTask,
	toggleTask,
	clearCompleted,
	deleteTask,
	filterTasks,
	getRemainingCount,
} from "./utils/taskUtils";

const App = () => {
	const [tasks, setTasks] = useState(TASKS);
	const [filter, setFilter] = useState<TFilter>("all");
	const [input, setInput] = useState("");

	const handleAddTask = () => {
		const newTasks = addTask(input, tasks);
		if (newTasks !== tasks) {
			setTasks(newTasks);
			setInput("");
		}
	};

	const handleToggleTask = (id: number) => {
		setTasks(toggleTask(id, tasks));
	};

	const handleClearCompleted = () => {
		setTasks(clearCompleted(tasks));
	};

	const handleDeleteTask = (id: number) => {
		setTasks(deleteTask(id, tasks));
	};

	const filteredTasks = filterTasks(tasks, filter);
	const remainingCount = getRemainingCount(tasks);

	return (
		<Box sx={{ maxWidth: 700, margin: "auto", padding: 4 }}>
			<Typography
				variant="h3"
				align="center"
				color="text.secondary"
				sx={{ opacity: 0.1 }}
			>
				todos
			</Typography>
			<Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
				<Stack direction="row" spacing={2}>
					<TextField
						fullWidth
						variant="standard"
						placeholder="What needs to be done?"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						variant="contained"
						sx={{ minWidth: "48px", padding: "6px 12px" }}
						onClick={handleAddTask}
					>
						add
					</Button>
				</Stack>
				<TasksList
					filteredTasks={filteredTasks}
					toggleTask={handleToggleTask}
					deleteTask={handleDeleteTask}
					filter={filter}
				/>

				<TodoFooter
					remainingCount={remainingCount}
					filter={filter}
					setFilter={setFilter}
					clearCompleted={handleClearCompleted}
					totalTasks={tasks.length}
				/>
			</Paper>
		</Box>
	);
};

export default App;
