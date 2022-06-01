import { useReducer } from 'react';
import * as React from 'react';

type InputState = {
  value: string;
  isTouched: boolean | '';
};

enum InputActionEnum {
  INPUT = 'INPUT',
  BLUR = 'BLUR',
  RESET = 'RESET',
}

type InputAction = {
  type: InputActionEnum;
  value: string;
};

const initialInputState: InputState = {
  value: '',
  isTouched: '',
};

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = <T>(validateValue: (data: string) => boolean) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<T>) => {
    inputDispatch({
      type: InputActionEnum.INPUT,
      value:
        event.target instanceof HTMLInputElement
          ? event.target.value
          : event.target instanceof HTMLTextAreaElement
          ? event.target.value
          : '',
    });
  };

  const inputBlurHandler = () => {
    inputDispatch({
      type: InputActionEnum.BLUR,
      value: '',
    });
  };

  const reset = () => {
    inputDispatch({
      type: InputActionEnum.RESET,
      value: '',
    });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
