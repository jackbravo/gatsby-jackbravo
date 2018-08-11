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
          marginBottom: rhythm(2.5),
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
          Soy un desarrollador mexicano. Soy fan del software libre, sobre todo aplicado al Internet.
          Juego futbol cada que puedo. Me gusta andar en bici y leer (cuando mis hijos me dejan).
          Todavía creo en la buena voluntad de las personas y todavía más con mi linda esposa Lix =).
        </p>
      </div>
    )
  }
}

export default Bio
