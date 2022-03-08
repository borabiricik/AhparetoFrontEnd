import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'

const Login = () => {
    const {push} = useHistory()
  return (
    <div>
        <Button onClick={()=> push("dashboard")}>
            Click
        </Button>
    </div>
  )
}

export default Login