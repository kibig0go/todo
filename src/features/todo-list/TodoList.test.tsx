import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoListFeature } from './index';

describe('TodoListFeature', () => {
  const mockTodos = [
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: true },
  ];
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  test('renders todos correctly', () => {
    render(
      <TodoListFeature
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  test('calls toggleTodo when checkbox is clicked', () => {
    render(
      <TodoListFeature
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  test('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoListFeature
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
