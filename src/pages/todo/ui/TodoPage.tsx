import { Container, Typography, Box } from '@mui/material';
import { TodoWidget } from '../../../widgets/todo';

export const TodoPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mindbox ToDo App
        </Typography>
        <TodoWidget />
      </Box>
    </Container>
  );
};
