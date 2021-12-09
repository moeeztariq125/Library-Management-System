import React from 'react'
import { useState, useEffect } from 'react'
//import { Alert } from 'react-bootstrap'
const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  if (!show) {
    return null
  }

  return <div className={`alert alert-${variant}`}>{children}</div>
}

Message.defaultProps = {
  variant: 'info',
}
export default Message
