export type TTask = {
  id: number;
  text: string;
  completed: boolean;
};

export type TFilter = "all" | "active" | "completed";

export const addTask = (input: string, tasks: TTask[]): TTask[] => {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return tasks;
  }
  
  const newTask: TTask = {
    id: Date.now(),
    text: trimmedInput,
    completed: false,
  };
  
  return [...tasks, newTask];
};

export const toggleTask = (id: number, tasks: TTask[]): TTask[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (id: number, tasks: TTask[]): TTask[] => {
  return tasks.filter((task) => task.id !== id);
};

export const clearCompleted = (tasks: TTask[]): TTask[] => {
  return tasks.filter((task) => !task.completed);
};

export const filterTasks = (tasks: TTask[], filter: TFilter): TTask[] => {
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    case "all":
    default:
      return tasks;
  }
};

export const getRemainingCount = (tasks: TTask[]): number => {
  return tasks.filter((task) => !task.completed).length;
};

export const getCompletedCount = (tasks: TTask[]): number => {
  return tasks.filter((task) => task.completed).length;
};

export const hasCompletedTasks = (tasks: TTask[]): boolean => {
  return tasks.some((task) => task.completed);
};


export const hasActiveTasks = (tasks: TTask[]): boolean => {
  return tasks.some((task) => !task.completed);
}; 