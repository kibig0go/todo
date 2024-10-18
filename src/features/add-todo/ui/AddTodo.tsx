
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoFeatureProps {
  addTodo: (text: string) => void;
}

export const AddTodoFeature: React.FC<AddTodoFeatureProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        variant="outlined"
        size="small"
      />
      <Button type="submit" variant="contained" sx={{ ml: 1 }} aria-label="Add todo">
        <AddIcon />
      </Button>
    </Box>
  );
};
