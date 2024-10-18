
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodoFeature } from './index';

describe('AddTodoFeature', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  test('renders input and add button', () => {
    render(<AddTodoFeature addTodo={mockAddTodo} />);

    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls addTodo with input text when form is submitted', () => {
    render(<AddTodoFeature addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
  });

  test('clears input after form submission', () => {
    render(<AddTodoFeature addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(input).toHaveValue('');
  });

  test('does not call addTodo when input is empty', () => {
    render(<AddTodoFeature addTodo={mockAddTodo} />);

    const addButton = screen.getByRole('button');

    fireEvent.click(addButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
