import React, {useState} from "react";
import ErrorMessage from "./ErrorMessage";
import '../../styles/Input.scss';

const InputWithError = (prop) => {
    const [displayError, setDisplayError] = useState(false);

    return (
        <div>
            <input
                id={prop.id}
                type={prop.type}
                placeholder={prop.placeholder}
                className='input-field'
                data-lpignore='true'
                onChange={(event => prop.onChange(event.target.value))}
                onBlur={_ => {
                    prop.shouldError && prop.shouldError() ? setDisplayError(true) : setDisplayError(false)
                }}
            />
            {displayError ? <ErrorMessage message='This field is required'/> : null}
        </div>
    )
};

export default InputWithError;