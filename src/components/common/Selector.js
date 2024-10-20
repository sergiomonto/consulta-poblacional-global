import React from 'react';
import PropTypes from 'prop-types';

function Selector({ id, htmlFor, textLabel, value, onChange, options }) {
    return (
        <div className="mb-6 w-5/6 sm:w-1/2 lg:w-1/3 2xl:w-1/5">
            <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
                {textLabel}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded w-full"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

Selector.propTypes = {
    id: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    textLabel: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Selector;
