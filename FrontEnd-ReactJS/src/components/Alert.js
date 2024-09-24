import React from 'react'

export default function Alert (props) {
  return (
    <div className='container h-25 w-100'>
      {props.style.type && (
        <div className={`alert alert-${props.style.type}`}>
          <p className='text-dark'>{props.style.message}</p>
        </div>
      )}
    </div>
  )
}
