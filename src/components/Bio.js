import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './gaceta_1.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1),
        }}
      >
        <img
          src={profilePic}
          alt={`Joaquín Bravo Contreras`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          <strong>Joaquín Bravo Contreras</strong> es un desarrollador mexicano.
          Juega futbol cada que puede. Le gusta andar en bici y leer (cuando sus hijos lo dejan).
          Todavía cree en la buena voluntad de las personas.
        </p>
      </div>
    )
  }
}

export default Bio
