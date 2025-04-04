import React from 'react'
import './Spinner.css'
import PropTypes from 'prop-types';

export default function Spinner({fontSize = '100px', color = 'black'}) {
  return (
    // https://css-loaders.com/filling/
    <div className='Spinner'>
        <div className="loader" style={{fontSize, WebkitTextStrokeColor: color, background: `radial-gradient(1.13em at 50% 1.6em, ${color === 'white' ? '#fff' : '#000'} 99%,#0000 101%) calc(50% - 1.6em) 0/3.2em 100% text,radial-gradient(1.13em at 50% -0.8em,#0000 99%, ${color === 'white' ? '#fff' : '#000'} 101%) 50% .8em/3.2em 100% repeat-x  text`}}></div>
    </div>
  )
}

Spinner.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string
}