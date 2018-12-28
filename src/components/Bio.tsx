import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

function Bio(): React.ReactElement<{}> {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={profilePic}
        alt={`Reese McLean`}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2),
        }}
      />
      <p>
        Hi, I'm Reese. I'm a developer and former high school math teacher.
        Currently at Blackboard.
      </p>
    </div>
  )
}

export default Bio
