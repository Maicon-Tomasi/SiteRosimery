
interface PropsInput {
  type?: string;
  placeholder?: string;
  classes?: string;
  onChangeParam: (value: string) => void;
  valueParam?: string;
  disabled?: boolean;
  maxLengthParam?: number;
}

const Input = ({type, placeholder, classes, onChangeParam, valueParam, disabled, maxLengthParam = 1000}: PropsInput) =>{
    return(
        <input
            type={type}
            placeholder={placeholder}
            className={classes}
            onChange={(e) => onChangeParam(e.target.value)}
            disabled={disabled}
            value={valueParam}
            maxLength={maxLengthParam}
        />
    );
}

export default Input;