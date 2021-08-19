import React from 'react'
import './Input.css'
function Search({name, placeholder ,input, handleInput}) {
    return (
        <div className="input">
            <input
                placeholder= {placeholder}
                value={input}
                name={name}
                onChange={handleInput}
                type="text"
            />
        </div>
    )
}

export default Search
