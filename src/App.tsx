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

function App() {
	const [tasks, setTasks] = useState([
		{ id: 1, text: "Тестовое задание", completed: false },
		{ id: 2, text: "Прекрасный код", completed: true },
		{ id: 3, text: "Покрытие тестами", completed: false },
	]);
	const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
	const [input, setInput] = useState("");

	const addTask = () => {
		if (input.trim) {
			setTasks([
				...tasks,
				{ id: Date.now(), text: input.trim(), completed: false },
			]);
			setInput("");
		}
	};

	const toggleTask = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const clearCompleted = () => {
		setTasks(tasks.filter((task) => !task.completed));
	};

	const filteredTasks = tasks.filter((task) => {
		if (filter === "active") return !task.completed;
		if (filter === "completed") return task.completed;
		return true;
	});

	const remainingCount = tasks.filter((task) => !task.completed).length;

	return (
		<>
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
							onClick={addTask}
						>
							add
						</Button>
					</Stack>
					<TasksList filteredTasks={filteredTasks} toggleTask={toggleTask} />

					<TodoFooter
						remainingCount={remainingCount}
						filter={filter}
						setFilter={setFilter}
						clearCompleted={clearCompleted}
					/>
				</Paper>
			</Box>
		</>
	);
}

export default App;
