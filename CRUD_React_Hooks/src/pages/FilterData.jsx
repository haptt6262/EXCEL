import React, { useState } from 'react'
import { useItem } from "../hooks";

function FilterData() {
    const { handleFilterData } = useItem();
    const [startValue, setStartValue] = useState(1);
    const [endValue, setEndValue] = useState(10);
    return (
        <div>
            <label>Start</label>
            <input
                onChange={(e) => {
                    setStartValue(e.target.value);
                }}
            />
            <label>End</label>
            <input
                onChange={(e) => {
                    setEndValue(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    handleFilterData({
                        startValue: startValue,
                        endValue: endValue,
                        activePage: 1,
                    });
                }}
            >
                Filter
            </button>
        </div>
    )
}

export default FilterData