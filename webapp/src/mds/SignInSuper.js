import React from 'react'
import { useLocation } from 'react-router-dom'

const SignInSuper = () => {
  const location = useLocation()

  React.useEffect(() => {
    console.info('sign-in: super')
    console.info(location)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
    </>
  )
}

export default SignInSuper
