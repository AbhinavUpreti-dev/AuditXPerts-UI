import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = () => {
  const percentage = 70; // Set your progress percentage here

  return (
    <div style={{ width: 120, height: 120 }}>
      <h5>Site Training Compliance Score</h5>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: '#000',
          pathColor: '#4caf50',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default ProgressBar;