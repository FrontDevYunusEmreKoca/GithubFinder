import React from 'react'

const ClearButtons = ({clearBtn}) => {
  return (
    <div className='container'>   
        <button onClick={clearBtn} className='btn btn-sm w-100 btn-secondary'>Clear</button>
    </div>
  )
}

export default ClearButtons
