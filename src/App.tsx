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
		{
			id: 1,
			text: "Базовое знание стека frontend-стека (React, Typescript, Redux): готовые пет-проекты или курсовые работы",
			completed: true,
		},
		{
			id: 2,
			text: "Способность составлять алгоритмы и дебажить их в голове",
			completed: true,
		},
		{
			id: 3,
			text: "Умение писать поддерживаемый код с тестами",
			completed: true,
		},
		{
			id: 4,
			text: "Адекватная реакция на обратную, умение докапываться до сути вопроса, переживать несколько итераций ревью до полного понимания и устранения пробелов в знаниях",
			completed: true,
		},
		{
			id: 5,
			text: "Готовность уделять нам 20 часов в неделю",
			completed: true,
		},
		{
			id: 6,
			text: "Собственная рабочая машина, которая тянет WebStorm или VS Code. С выдающимися кандидатами готовы обсудить покупку ноутбука на время стажировки",
			completed: true,
		},
		{
			id: 7,
			text: "Готовность выйти на полный день в случае успеха",
			completed: true,
		},
		{ id: 8, text: "Пройти стажировку", completed: false },
		{ id: 9, text: "Устроиться на работу", completed: false },
	]);
	const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
	const [input, setInput] = useState("");

	const addTask = () => {
		if (input.trim()) {
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

	const deleteTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id));
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
					<TasksList 
						filteredTasks={filteredTasks} 
						toggleTask={toggleTask} 
						deleteTask={deleteTask}
						filter={filter}
					/>
                    
						<TodoFooter
							remainingCount={remainingCount}
							filter={filter}
							setFilter={setFilter}
							clearCompleted={clearCompleted}
							totalTasks={tasks.length}
						/>
				</Paper>
			</Box>
		</>
	);
}

export default App;
