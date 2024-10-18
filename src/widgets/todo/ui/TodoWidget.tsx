import React, { useCallback, useState, useEffect } from 'react';
import { AddTodoFeature } from '../../../features/add-todo';
import { TodoListFeature } from '../../../features/todo-list';
import { TodoFilterFeature, TFilter } from '../../../features/todo-filter';
import { Todo } from '../../../entities/todo';
import { LOCAL_STORAGE_KEY } from '../../../app/config/localStorage/localStoregeKey';

export const TodoWidget: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<TFilter>('all');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    setTodos(prevTodos => [...prevTodos, { id: Date.now(), text, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const filteredTodos = React.useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  return (
    <>
      <AddTodoFeature addTodo={addTodo} />
      <TodoFilterFeature filter={filter} setFilter={setFilter} />
      <TodoListFeature
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
};
