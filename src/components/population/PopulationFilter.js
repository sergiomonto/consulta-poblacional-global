import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import Input from '../common/Input';
import PropTypes from 'prop-types';

function PopulationFilter({ filter, onChange, id, tooltip }) {
    return (
        <div className="relative w-5/6 sm:w-1/2 lg:w-1/3 2xl:w-1/5 mb-4">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10"
            />

            <Input
                id={id}
                type="number"
                placeholder="Filtrar por población mínima"
                value={filter}
                onChange={onChange}
                className="p-2 pl-10 border border-gray-300 rounded w-full truncate whitespace-nowrap"
                min={0}
            />

            <Tooltip anchorSelect={`#${id}`}>
                {tooltip}
            </Tooltip>
        </div>
    );
}

PopulationFilter.propTypes = {
    filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    tooltip: PropTypes.node,
};

export default PopulationFilter;
