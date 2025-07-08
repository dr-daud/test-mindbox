import type { TTask } from "../../types/types";
import {
	addTask,
	toggleTask,
	deleteTask,
	clearCompleted,
	filterTasks,
	getRemainingCount,
	getCompletedCount,
	hasCompletedTasks,
	hasActiveTasks,
} from "../../utils/taskUtils";

const mockDateNow = jest.fn(() => 1234567890);
global.Date.now = mockDateNow;

describe("taskUtils", () => {
	let mockTasks: TTask[];

	beforeEach(() => {
		mockTasks = [
			{ id: 1, text: "Task 1", completed: false },
			{ id: 2, text: "Task 2", completed: true },
			{ id: 3, text: "Task 3", completed: false },
		];
		mockDateNow.mockReturnValue(1234567890);
	});

	describe("addTask", () => {
		it("должен добавить новую задачу с валидным текстом", () => {
			const result = addTask("New Task", mockTasks);

			expect(result).toHaveLength(4);
			expect(result[3]).toEqual({
				id: 1234567890,
				text: "New Task",
				completed: false,
			});
		});

		it("не должен добавлять задачу с пустой строкой", () => {
			const result = addTask("", mockTasks);
			expect(result).toEqual(mockTasks);
		});

		it("не должен добавлять задачу только с пробелами", () => {
			const result = addTask("   ", mockTasks);
			expect(result).toEqual(mockTasks);
		});

		it("должен обрезать пробелы в начале и конце", () => {
			const result = addTask("  Trimmed Task  ", mockTasks);

			expect(result).toHaveLength(4);
			expect(result[3]).toEqual({
				id: 1234567890,
				text: "Trimmed Task",
				completed: false,
			});
		});

		it("должен работать с пустым массивом задач", () => {
			const result = addTask("First Task", []);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				id: 1234567890,
				text: "First Task",
				completed: false,
			});
		});
	});

	describe("toggleTask", () => {
		it("должен переключить задачу с false на true", () => {
			const result = toggleTask(1, mockTasks);

			expect(result[0].completed).toBe(true);
			expect(result[1].completed).toBe(true);
			expect(result[2].completed).toBe(false);
		});

		it("должен переключить задачу с true на false", () => {
			const result = toggleTask(2, mockTasks);

			expect(result[0].completed).toBe(false);
			expect(result[1].completed).toBe(false);
			expect(result[2].completed).toBe(false);
		});

		it("должен вернуть исходный массив для несуществующего ID", () => {
			const result = toggleTask(999, mockTasks);
			expect(result).toEqual(mockTasks);
		});

		it("не должен изменять другие задачи", () => {
			const result = toggleTask(1, mockTasks);

			expect(result[1]).toEqual(mockTasks[1]);
			expect(result[2]).toEqual(mockTasks[2]);
		});
	});

	describe("deleteTask", () => {
		it("должен удалить существующую задачу", () => {
			const result = deleteTask(2, mockTasks);

			expect(result).toHaveLength(2);
			expect(result.find((task) => task.id === 2)).toBeUndefined();
			expect(result[0]).toEqual(mockTasks[0]);
			expect(result[1]).toEqual(mockTasks[2]);
		});

		it("должен вернуть исходный массив для несуществующего ID", () => {
			const result = deleteTask(999, mockTasks);
			expect(result).toEqual(mockTasks);
		});

		it("должен работать с пустым массивом", () => {
			const result = deleteTask(1, []);
			expect(result).toEqual([]);
		});
	});

	describe("clearCompleted", () => {
		it("должен удалить все выполненные задачи", () => {
			const result = clearCompleted(mockTasks);

			expect(result).toHaveLength(2);
			expect(result.every((task) => !task.completed)).toBe(true);
			expect(result[0]).toEqual(mockTasks[0]);
			expect(result[1]).toEqual(mockTasks[2]);
		});

		it("должен вернуть исходный массив если нет выполненных задач", () => {
			const activeTasks = mockTasks.filter((task) => !task.completed);
			const result = clearCompleted(activeTasks);
			expect(result).toEqual(activeTasks);
		});

		it("должен работать с пустым массивом", () => {
			const result = clearCompleted([]);
			expect(result).toEqual([]);
		});
	});

	describe("filterTasks", () => {
		it('должен вернуть все задачи для фильтра "all"', () => {
			const result = filterTasks(mockTasks, "all");
			expect(result).toEqual(mockTasks);
		});

		it('должен вернуть только активные задачи для фильтра "active"', () => {
			const result = filterTasks(mockTasks, "active");

			expect(result).toHaveLength(2);
			expect(result.every((task) => !task.completed)).toBe(true);
			expect(result[0]).toEqual(mockTasks[0]);
			expect(result[1]).toEqual(mockTasks[2]);
		});

		it('должен вернуть только выполненные задачи для фильтра "completed"', () => {
			const result = filterTasks(mockTasks, "completed");

			expect(result).toHaveLength(1);
			expect(result.every((task) => task.completed)).toBe(true);
			expect(result[0]).toEqual(mockTasks[1]);
		});

		it("должен работать с пустым массивом", () => {
			const result = filterTasks([], "all");
			expect(result).toEqual([]);
		});
	});

	describe("getRemainingCount", () => {
		it("должен подсчитать количество невыполненных задач", () => {
			const result = getRemainingCount(mockTasks);
			expect(result).toBe(2);
		});

		it("должен вернуть 0 для пустого массива", () => {
			const result = getRemainingCount([]);
			expect(result).toBe(0);
		});

		it("должен вернуть 0 если все задачи выполнены", () => {
			const completedTasks = mockTasks.map((task) => ({
				...task,
				completed: true,
			}));
			const result = getRemainingCount(completedTasks);
			expect(result).toBe(0);
		});
	});

	describe("getCompletedCount", () => {
		it("должен подсчитать количество выполненных задач", () => {
			const result = getCompletedCount(mockTasks);
			expect(result).toBe(1);
		});

		it("должен вернуть 0 для пустого массива", () => {
			const result = getCompletedCount([]);
			expect(result).toBe(0);
		});

		it("должен вернуть 0 если нет выполненных задач", () => {
			const activeTasks = mockTasks.filter((task) => !task.completed);
			const result = getCompletedCount(activeTasks);
			expect(result).toBe(0);
		});
	});

	describe("hasCompletedTasks", () => {
		it("должен вернуть true если есть выполненные задачи", () => {
			const result = hasCompletedTasks(mockTasks);
			expect(result).toBe(true);
		});

		it("должен вернуть false если нет выполненных задач", () => {
			const activeTasks = mockTasks.filter((task) => !task.completed);
			const result = hasCompletedTasks(activeTasks);
			expect(result).toBe(false);
		});

		it("должен вернуть false для пустого массива", () => {
			const result = hasCompletedTasks([]);
			expect(result).toBe(false);
		});
	});

	describe("hasActiveTasks", () => {
		it("должен вернуть true если есть активные задачи", () => {
			const result = hasActiveTasks(mockTasks);
			expect(result).toBe(true);
		});

		it("должен вернуть false если нет активных задач", () => {
			const completedTasks = mockTasks.map((task) => ({
				...task,
				completed: true,
			}));
			const result = hasActiveTasks(completedTasks);
			expect(result).toBe(false);
		});

		it("должен вернуть false для пустого массива", () => {
			const result = hasActiveTasks([]);
			expect(result).toBe(false);
		});
	});
});
