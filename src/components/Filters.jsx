import React from 'react';
import './Filters.css';

const Filters = ({ regionFilter, setRegionFilter, populationFilter, setPopulationFilter }) => {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const populationRanges = [
        { label: 'All', value: 'all' },
        { label: '< 10M', value: 'small' },
        { label: '10M - 50M', value: 'medium' },
        { label: '> 50M', value: 'large' }
    ];

    return (
        <div className="filters">
            <div className="filter-group">
                <label>Region:</label>
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                    {regions.map(region => (
                        <option key={region} value={region.toLowerCase()}>{region}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label>Population:</label>
                <select value={populationFilter} onChange={(e) => setPopulationFilter(e.target.value)}>
                    {populationRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;