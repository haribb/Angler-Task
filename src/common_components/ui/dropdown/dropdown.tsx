import React, { useEffect, useRef } from 'react';
import { useSetState } from 'utils/functions.utils';
import './dropdown.scss';

import Select from 'react-select';
import Assets from 'imports/asset.import';

interface IDropdownProps {
  text?: String;
  data: any;
  setActive?: any;
  disabled?: boolean;
}

const InputDropdown = (props: any) => {
  let { agency } = props;
  // State
  const [state, setState] = useSetState({
    isOpen: false,
    active: '',
  });

  const dropdownRef: any = useRef();

  //Hooks
  useEffect(() => {
    // setState({ active: props?.data[0] });
  }, []);

  //Logic
  const handleChange = () => {
    setState({ isOpen: !state.isOpen });
  };
  const setActive = (value) => {
    setState({ active: value, isOpen: !state.isOpen });
    props?.setActive(value);
  };
  const customStyles: any = {
    multiValueRemove: (provided, state) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'white',
      },
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <div style={{ paddingRight: '10px' }}>
        <img src={Assets.arrow} height={10} width={10} />
      </div>
    );
  };
  const ClearIndicator = (props) => {
    if (agency) {
      return null;
    } else {
      return (
        <div
          style={{ paddingRight: '10px', paddingTop: '5px' }}
          onClick={props.clearValue}>
          <img src={Assets.close_black} height={20} width={20} />
        </div>
      );
    }
  };
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {props.clear && (
        <div
          className={`${
            props.isMulti && props.value.length > 0 && 'dropdown_clear_multi'
          } dropdown_clear_text`}
          onClick={() => dropdownRef?.current?.clearValue()}>
          Clear
        </div>
      )}
      <Select
        isDisabled={props.disabled?true:false}
        ref={dropdownRef}
        maxMenuHeight={200}
        styles={customStyles}
        options={props.data}
        placeholder="Select"
        onChange={(option: any, actionMeta?: any) =>
          props.setActive(option, actionMeta)
        }
        components={{ DropdownIndicator, ClearIndicator }}
        classNames={{
          control: (state) =>
            props.className
              ? props.className
              : state.isFocused
              ? 'dropdown_control'
              : 'dropdown_control',
          indicatorSeparator: (state) =>
            state.isFocused
              ? 'dropdown_indicator_separator'
              : 'dropdown_indicator_separator',
          multiValue: (state) =>
            state.isFocused ? 'dropdown_multi_value' : 'dropdown_multi_value',
          multiValueLabel: (state) =>
            state.isFocused
              ? 'dropdown_multi_value_label'
              : 'dropdown_multi_value_label',
          singleValue: (state) =>
            props.singleValueClassName
              ? props.singleValueClassName
              : state.isDisabled
              ? 'dropdown_single_value'
              : 'dropdown_single_value',
          valueContainer: (state) =>
            state.isDisabled ? 'dropdown_input_value' : 'dropdown_input_value',
          menuList: (state) => (props ? props.menuListClassName : ''),
        }}
        {...props}
      />
      {props.error &&
        props.error.map((error: any) => (
          props.name === error?.path &&
          (<div className="input_field_error">
            { error.message}
          </div>)
        ))}
    </div>
  );
};

export default InputDropdown;
