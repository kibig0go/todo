import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TFilter } from '../model/TFilter';

interface ITodoFilterFeatureProps {
  filter: TFilter;
  setFilter: (filter: TFilter) => void;
}

export const TodoFilterFeature = ({ filter, setFilter }: ITodoFilterFeatureProps) => {
  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={(_, newFilter: TFilter) => newFilter && setFilter(newFilter)}
      aria-label="text alignment"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="all" aria-label="all">
        All
      </ToggleButton>
      <ToggleButton value="active" aria-label="active">
        Active
      </ToggleButton>
      <ToggleButton value="completed" aria-label="completed">
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  );
};