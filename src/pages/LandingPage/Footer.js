import React from 'react'
import AppBar from '@material-ui/core/AppBar'

const Footer = () => {
  return (
    <>
      <AppBar
        position="relative"
        style={{
          //position: 'absolute',
          width: '100%',
          padding: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id="footer-text"
      >
        {`© ${new Date().getFullYear()} Copyright: open devs. All Rights Reserved`}
      </AppBar>
    </>
  )
}

export default Footer
