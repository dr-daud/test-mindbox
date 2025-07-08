import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App (ключевая функциональность)', () => {
  it('добавляет новую задачу', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('переключает статус задачи (выполнено/не выполнено)', async () => {
    render(<App />);
    const taskCheckbox = screen.getAllByRole('checkbox')[0];
    expect(taskCheckbox).toBeChecked();
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).not.toBeChecked();
  });

  it('удаляет задачу', async () => {
    render(<App />);
    const initialTask = screen.getByText(/Базовое знание стека/i);
    const deleteButton = screen.getAllByRole('button', { name: '' })[0];
    fireEvent.click(deleteButton);
    expect(initialTask).not.toBeInTheDocument();
  });

  it('фильтрует задачи: активные/выполненные/все', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /^active$/i }));
    expect(screen.queryByText('Пройти стажировку')).toBeInTheDocument();
    expect(screen.queryByText('Базовое знание стека frontend-стека (React, Typescript, Redux): готовые пет-проекты или курсовые работы')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^completed$/i }));
    expect(screen.queryByText('Пройти стажировку')).not.toBeInTheDocument();
    expect(screen.getByText('Базовое знание стека frontend-стека (React, Typescript, Redux): готовые пет-проекты или курсовые работы')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^all$/i }));
    expect(screen.getByText('Пройти стажировку')).toBeInTheDocument();
    expect(screen.getByText('Базовое знание стека frontend-стека (React, Typescript, Redux): готовые пет-проекты или курсовые работы')).toBeInTheDocument();
  });

  it('очищает выполненные задачи', async () => {
    render(<App />);
    const clearButton = screen.getByRole('button', { name: /clear completed/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText('Базовое знание стека frontend-стека (React, Typescript, Redux): готовые пет-проекты или курсовые работы')).not.toBeInTheDocument();
    expect(screen.getByText('Пройти стажировку')).toBeInTheDocument();
  });

  it('корректно считает оставшиеся задачи', async () => {
    render(<App />);
    expect(screen.getByText(/items left/i)).toHaveTextContent('2 items left');

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.type(input, 'Еще одна задача');
    fireEvent.click(addButton);
    expect(screen.getByText(/items left/i)).toHaveTextContent('3 items left');
  });
}); 