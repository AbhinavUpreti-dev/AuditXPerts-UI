import React, { useState, useEffect } from "react";
import Select, { MenuPosition } from "react-select";
import "./floatingLabelSelect.scss"; // Import the CSS for styling


interface FloatingLabelSelectProps {
  label: string;
  value: any;
  children?: React.ReactNode;
  filterOption?: any;
  options?: any;
  onChange: (value: any) => void;
  isDisabled?: boolean;
  className?: string;
  assistiveText?: string;
  name?: string;
  isRequired?: boolean;
  isShowError?: boolean;
  intl: any;
  defaultOption?: string;
  isMulti?: boolean;
  menuPosition?: MenuPosition;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInputChange?: (inputValue: string, actionMeta: any) => void;
  onMenuScrollToBottom?: () => void;
  isRequiredText?: boolean;
  isLoading?: boolean;
  loadingMessage?: any;
  tooltip?:string;
  multipleLineToolTip?:string[];
  toolTipHeader?:string[];
}

const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [value]);
  return (
    <>
      <div
        className={`floating-label-select ${props.className} ${
          isFocused ? "focused" : ""
        }`}
      >
        <Select
          filterOption={props.filterOption}
          value={value}
          options={props.options}
          onChange={props.onChange}
          name={props.name}
          isDisabled={props.isDisabled}
          isMulti={props.isMulti}
          onInputChange={props.onInputChange}
          onFocus={props.onFocus && props.onFocus}
          onMenuScrollToBottom={props.onMenuScrollToBottom}
          isLoading={props.isLoading}
          placeholder={""}
          loadingMessage={props.loadingMessage}
          className={
            props.isRequired &&
            ((value &&
              value.label === "Select One"
             ) ||
              value === "" ||
              !value) &&
            props.isShowError
              ? `error section-container__select ${props.className}`
              : `section-container__select`
          }
          menuPosition={props.menuPosition}
        ></Select>
        <label>
          {label}

          {props.isRequiredText && props.isRequired ? (
            <span className="">{`Select One`}</span>
          ) : (
            <>{props.isRequired && <span className="required">*</span>}</>
          )}
        </label>
        
      </div>
      <span className="assistiveText">{props.assistiveText}</span>
    </>
  );
};

export default FloatingLabelSelect;
