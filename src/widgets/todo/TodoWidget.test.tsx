import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoWidget } from './index';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('TodoWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddTodoFeature, TodoFilterFeature, and TodoListFeature', () => {
    render(<TodoWidget />);
    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoWidget />);
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByLabelText('Add todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo', () => {
    render(<TodoWidget />);
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByLabelText('Add todo');

    fireEvent.change(input, { target: { value: 'Toggle Todo' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('deletes a todo', () => {
    render(<TodoWidget />);
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByLabelText('Add todo');

    fireEvent.change(input, { target: { value: 'Delete Todo' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Delete Todo')).not.toBeInTheDocument();
  });

  test('filters todos', () => {
    render(<TodoWidget />);
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByLabelText('Add todo');
  
    // Add two todos
    fireEvent.change(input, { target: { value: 'Active Todo' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.click(addButton);
  
    // Complete the second todo
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
  
    // Filter active todos
    const activeFilterButton = screen.getByText('Active');
    fireEvent.click(activeFilterButton);
  
    expect(screen.getByText('Active Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
  
    // Filter completed todos
    const completedFilterButton = screen.getByText('Completed');
    fireEvent.click(completedFilterButton);
  
    expect(screen.queryByText('Active Todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
  });
});
