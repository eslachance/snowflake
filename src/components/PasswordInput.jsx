import React, { useState } from 'react';
import { useField } from 'formik';
import passwordStrength from '../utils/passwordStrength';

const PasswordInput = (props) => {
  const [strength, setStrength] = useState(20);
  const [barColor, setBarColor] = useState('grey');
  const [strengthText, setStrengthText] = useState('Strength-O-Meter');

  const [field] = useField(props);

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    const score = passwordStrength(e.target.value);
    console.log(passwordStrength(e.target.value) + '% Strength');
    setStrength(score);
    if (score > 80) {
      setBarColor('green');
      setStrengthText('Strong');
    } else if (score > 60) {
      setBarColor('#ff9000');
      setStrengthText('Kind of okay');
    } else if (score <= 30) {
      setBarColor('red');
      setStrengthText('Weaksauce');
    }
    field.onChange(e)
  }

  return (
    <div className="my-5">
      <label htmlFor="password" className="leading-7 text-sm text-gray-400">
        Password
      </label>
      <input
        {...field}
        type="password"
        id="password"
        name="password"
        onChange={handlePasswordChange}
        className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <div className="w-full">
        <span style={{ color: barColor }}>{strengthText}</span>
        <div
          className="h-2"
          style={{
            backgroundColor: barColor,
            width: `${Math.min(100, strength)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordInput;
