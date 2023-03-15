import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels({value,label}) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox  />} label={`${label}`} value={`${value}`} />
    </FormGroup>
  );
}