import React from 'react'

const Spinner = ({height}) => {

    return (
        <div className={`spinner${height ? ' var' : ''}`}>
            <div className='spin'></div>       
        </div>
    )
}

export default Spinner