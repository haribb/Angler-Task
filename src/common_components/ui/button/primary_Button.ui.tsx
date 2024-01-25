

import './primaryButton.scss';

interface IPrimaryButton {
  text?: String;
  color?: any;
  icon?: any;
  className?: any;
  onClick?: any;
  backgroundColor?: string;
  disabled?: boolean;
  width?: any;
  style?: any;
  right_icon?: any;
  loading?: boolean
}
const PrimaryButton = (props: IPrimaryButton) => {

  return (
    <div
      className={`${props.disabled ? 'disabled' : 'button_wrapper'} ${
        props.className || ''
      }`}
      style={{
        backgroundColor: props.backgroundColor,
        width: props?.width,
        ...props.style,
      }}
      onClick={() => {
        if (!props.disabled) {
          props.onClick();
        }
      }}>
      {props.icon && (
        <div className="primary_button_img">
          <img src={props.icon} alt="icon" className="primary_btn_icon" />
        </div>
      )}
      <div style={{ color: props.color }} className="button_text">
        {props.text}
      </div>
      {props.right_icon && (
        <div className="primary_button_right_img">
          <img src={props.right_icon} alt="icon" className="primary_btn_icon" />
        </div>
      )}
    </div>
  );
};

export default PrimaryButton;
