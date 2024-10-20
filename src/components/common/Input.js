import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, type, placeholder, value, onChange, className, min }) => {
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (type === 'number' && min !== undefined) {
            if (inputValue === '' || Number(inputValue) >= min) {
                setShowWarning(false);
                onChange(e);
            } else {
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 2000);
            }
        } else {
            onChange(e);
        }
    };

    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={className}
                min={type === 'number' && min !== undefined ? min : undefined}
            />
            {showWarning && (
                <div className="absolute left-0 bottom-[-2rem] mt-1 p-2 bg-red-500 text-white rounded shadow-lg">
                    El valor no puede ser menor que {min}
                </div>
            )}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    min: PropTypes.number,
};

export default Input;
