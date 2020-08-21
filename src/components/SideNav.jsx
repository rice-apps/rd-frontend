import React from 'react'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import SmsIcon from '@material-ui/icons/Sms'
import { SvgIcon } from '@material-ui/core'
import { Logo, NavList, NavElement } from './SideNav.styles'
import { Link, useLocation } from 'react-router-dom'

export const SideNav = () => {
  const location = useLocation()
  const pages = ['/profile', '/feed', '/calendar', '/mail']

  const getIcon = page => {
    switch (page) {
      case '/feed':
        return <ChatIcon />
      case '/mail':
        return <MailOutlineIcon />
      case '/profile':
        return <AccountBoxIcon />
      case '/calendar':
        return <DateRangeIcon />
      default:
        return <ChatIcon />
    }
  }

  return (
    <div>
      <Logo>
        {/* Replace icon with something more professional or customized */}
        <SmsIcon style={{color: '#7380FF'}} fontSize="large"/>
      </Logo>
      <NavList>
        {pages.map((page, i) => {
          return (
            <Link to={'/' + page}>
              <NavElement
                key={window.btoa(page)}
                first={i === 0}
                selected={page === location.pathname}
              >
                <SvgIcon
                  htmlColor={page === location.pathname ? `#FFFFFF` : `#A9ABB4`}
                  style={{ fontSize: '1.6vw' }}
                >
                  {getIcon(page)}
                </SvgIcon>
              </NavElement>
            </Link>
          )
        })}
      </NavList>
    </div>
  )
}
