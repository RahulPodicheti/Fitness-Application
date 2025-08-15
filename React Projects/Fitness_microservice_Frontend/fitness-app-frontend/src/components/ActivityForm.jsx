import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: '',
    caloriesBurned: '',
    additionalMetrics: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);

      if (typeof onActivityAdded === 'function') {
        onActivityAdded();
      }

      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select
          value={activity.type}
          onChange={(e) => setActivity({ ...activity, type: e.target.value })}
        >
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="SWIMMING">Swimming</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
          <MenuItem value="YOGA">Yoga</MenuItem>
          <MenuItem value="DANCING">Dancing</MenuItem>
          <MenuItem value="HIKING">Hiking</MenuItem>
          <MenuItem value="ROWING">Rowing</MenuItem>
          <MenuItem value="JUMP_ROPE">Jump Rope</MenuItem>
          <MenuItem value="STRENGTH_TRAINING">Strength Training</MenuItem>
          <MenuItem value="PILATES">Pilates</MenuItem>
          <MenuItem value="CROSSFIT">CrossFit</MenuItem>
          <MenuItem value="BOXING">Boxing</MenuItem>
          <MenuItem value="ZUMBA">Zumba</MenuItem>
          <MenuItem value="AEROBICS">Aerobics</MenuItem>
          <MenuItem value="SKIPPING">Skipping</MenuItem>
          <MenuItem value="TREADMILL">Treadmill</MenuItem>
          <MenuItem value="ELLIPTICAL">Elliptical</MenuItem>
          <MenuItem value="MEDITATION">Meditation</MenuItem>
          <MenuItem value="HIIT">HIIT</MenuItem>
          <MenuItem value="WEIGHTLIFTING">Weightlifting</MenuItem>
          <MenuItem value="ROCK_CLIMBING">Rock Climbing</MenuItem>
          <MenuItem value="BODYBUILDING">Bodybuilding</MenuItem>
          <MenuItem value="POWERLIFTING">Powerlifting</MenuItem>
          <MenuItem value="STAIR_CLIMBING">Stair Climbing</MenuItem>
          <MenuItem value="FUNCTIONAL_TRAINING">Functional Training</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Duration (Minutes)"
        type="number"
        sx={{ mb: 2 }}
        value={activity.duration}
        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
      />

      <TextField
        fullWidth
        label="Calories"
        type="number"
        sx={{ mb: 2 }}
        value={activity.calariesBurned}
        onChange={(e) => setActivity({ ...activity, calariesBurned: e.target.value })}
      />
      
      <Button type="submit" variant="contained">
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
