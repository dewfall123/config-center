import React, { ReactChild, FormEvent } from 'react';

type ValueTypes = string | number | boolean;

interface InputProps {
  value: ValueTypes,
  onChange?: (value: ValueTypes) => void,
}

export default ({ value, onChange } : InputProps) => {
  const handleInput = (e: FormEvent<HTMLSpanElement>) => {
    onChange && onChange(e.target.innerText as unknown as ValueTypes)
  }
  return (
    <>
      <span contentEditable onInput={handleInput} suppressContentEditableWarning>
        {value}
      </span>
    </>
  );
};