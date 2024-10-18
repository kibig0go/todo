import { List, ListItem, ListItemIcon, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../../../entities/todo';

interface TodoListFeatureProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoListFeature: React.FC<TodoListFeatureProps> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          dense
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              onChange={() => toggleTodo(todo.id)}
            />
          </ListItemIcon>
          <ListItemText primary={todo.text} />
        </ListItem>
      ))}
    </List>
  );
};
