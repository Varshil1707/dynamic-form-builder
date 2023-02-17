import * as React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function EmptyTextarea({placeholder}) {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder={`${placeholder}`}
      style={{ width: 300 }}
    />
  );
}