import React, { useState } from 'react'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { SvgIcon } from '@material-ui/core'
import { NavList, NavElement } from './SideNav.styles'

export const SideNav = () => {
  const [getSelected, setSelected] = useState(0)
  const pages = ['profile', 'feed', 'calendar', 'mail']

  const getIcon = page => {
    switch (page) {
      case 'feed':
        return <ChatIcon />
      case 'mail':
        return <MailOutlineIcon />
      case 'profile':
        return <AccountBoxIcon />
      case 'calendar':
        return <DateRangeIcon />
      default:
        return <ChatIcon />
    }
  }

  return (
    <NavList>
      {pages.map((page, i) => {
        return (
          <NavElement
            key={window.btoa(page)}
            first={i === 0}
            selected={i === getSelected}
            onClick={() => setSelected(i)}
          >
            <SvgIcon htmlColor={i === getSelected ? `#FFFFFF` : `#B78989`} style={{fontSize: '1.6vw'}}>
              {getIcon(page)}
            </SvgIcon>
          </NavElement>
        )
      })}
    </NavList>
  )
}
