import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TodoPage } from './index';

jest.mock('../../widgets/todo', () => ({
  TodoWidget: () => <div data-testid="todo-widget">TodoWidget</div>,
}));

describe('TodoPage', () => {
  test('renders TodoPage with title and TodoWidget', () => {
    render(<TodoPage />);
    
    expect(screen.getByText('Mindbox ToDo App')).toBeInTheDocument();
    expect(screen.getByTestId('todo-widget')).toBeInTheDocument();
  });
});