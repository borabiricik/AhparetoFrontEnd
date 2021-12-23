import React from 'react'

const FormErrorMessage = ({message}) => {
    return (
        <>
            <label className='validation-error-message'>{message}</label>
        </>
    )
}

export default FormErrorMessage
