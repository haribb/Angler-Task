import { useEffect,  } from "react";

import { useSetState } from "utils/functions.utils";
import "../input_field/input_field.scss";

interface IInputProps {
  className?: string;
  onChange: any;
  icon?: any;
  icon_class?: string;
  type: string;
  onPress?: any;
  value?: string;
  name: string;
  iconOnPress?: any;
  size?: any;
  error?: any;
  min?: any;
  disabled?: boolean;
  onKeyDown?: any;
  placeholder?: string;
}

const Input = (props: IInputProps) => {
  // Redux

  // State
  const [state, setState] = useSetState({ focus: false });

  //Hooks
  useEffect(() => {}, []);

  // Network req

  //Logi

  return (
    <>
      <div className={state.focus ? "focus input_container set_bg" : "input_container"}>
        <div
          className="icon_wrapper"
          style={props.icon && { width: "5%" }}
        >
          {props.icon && <img src={props.icon} alt="image" className={`input_icon ${props.icon_class || ""}`} height={39} width={30} />}
        </div>
        <input
          type={props.type}
          className={state.focus ? `set_bg input ${props.className || ""}` : `input ${props.className || ""}`}
          style={props.icon ? { width: "95%" } : { width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
          name={props.name}
          onFocus={() => setState({ focus: true })}
          onBlur={() => {
            setState({ focus: false });
          }}
          placeholder={props.placeholder}
          min={props.min}
          disabled={props?.disabled}
          onKeyDown={(e) => {
            if (props.onKeyDown) {
              props.onKeyDown(e);
            } else {
              // console.log(e)
            }
          }}
        />
      </div>
      {props.error &&
        props.error.map(
          (error: any) => props.name === error?.path && <div className="input_field_error">{error.message}</div>
        )}
    </>
  );
};

export default Input;
