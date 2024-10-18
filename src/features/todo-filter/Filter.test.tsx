
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFilterFeature } from './index';

describe('TodoFilterFeature', () => {
  const mockSetFilter = jest.fn();

  test('renders filter buttons correctly', () => {
    render(<TodoFilterFeature filter="all" setFilter={mockSetFilter} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('calls setFilter with correct value when a filter button is clicked', () => {
    render(<TodoFilterFeature filter="all" setFilter={mockSetFilter} />);

    fireEvent.click(screen.getByText('Active'));
    expect(mockSetFilter).toHaveBeenCalledWith('active');

    fireEvent.click(screen.getByText('Completed'));
    expect(mockSetFilter).toHaveBeenCalledWith('completed');

  });

  test('highlights the current filter', () => {
    const { rerender } = render(<TodoFilterFeature filter="all" setFilter={mockSetFilter} />);
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true');

    rerender(<TodoFilterFeature filter="active" setFilter={mockSetFilter} />);
    expect(screen.getByText('Active')).toHaveAttribute('aria-pressed', 'true');

    rerender(<TodoFilterFeature filter="completed" setFilter={mockSetFilter} />);
    expect(screen.getByText('Completed')).toHaveAttribute('aria-pressed', 'true');
  });
});
