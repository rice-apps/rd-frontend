import React, { useState, useCallback, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'
import log from 'loglevel'
import { SET_INFO } from '../graphql/Mutations'
import { USER_EXISTS } from '../graphql/Queries'
import laptopGirl from '../images/Page 2.svg'
import majorMinorJson from '../utils/MajorMinor.json'
import DropDownItem from './DropDownItem'
import {
  FullGrid,
  PinkShape,
  LaptopGirl,
  AboutMyself,
  TextField,
  FieldSetStyle,
  TotalForm,
  MarginsForm,
  SubmitButton,
  DDWrapper,
  DDHeader,
  DDHeaderTitle,
  DDList,
  DDListItem,
  ArrowI
} from './MoreInfo.styles'
import { currentUser } from '../utils/apollo'

const MoreInfo = () => {
  const navigator = useNavigate()

  const [userStatement, setStatement] = useState('Valid!')
  const [, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [major, setMajor] = useState([])
  const [minor, setMinor] = useState([])
  const [college, setCollege] = useState('')
  const [isMajorOpen, setMajorOpen] = useState(false)
  const [isMinorOpen, setMinorOpen] = useState(false)
  const [isCollegeOpen, setCollegeOpen] = useState(false)

  const [addInfo] = useMutation(SET_INFO)
  const [
    checkUser,
    { data: userExists, loading: userExistLoading }
  ] = useLazyQuery(USER_EXISTS)
  const data = currentUser()

  const majors = majorMinorJson.majors.split(';').map(major => {
    const majorObj = {
      name: major
    }
    return majorObj
  })

  const minors = majorMinorJson.minors.split(';').map(minor => {
    const minorObj = {
      name: minor
    }
    return minorObj
  })

  const colleges = majorMinorJson.colleges.split(';')

  useEffect(() => {
    checkUser({
      variables: {
        username
      }
    })
  }, [username])

  useEffect(() => {
    const isMyUsernameTaken = userExists?.doesUsernameExist.usernameExists
    setStatement('valid username!')
    if (isMyUsernameTaken) {
      setStatement('somebody already took that username lol')
    }
  }, [userExists?.doesUsernameExist.usernameExists])

  const handleUserChange = useCallback(e => {
    setUsername(e.target.value)
  }, [])

  const handleMajorChange = newValue => {
    const indexOfMajor = major.indexOf(newValue)
    setMajor(
      indexOfMajor >= 0
        ? major.filter(maj => newValue !== maj)
        : [...major, newValue]
    )
  }

  const handleMinorChange = newValue => {
    const indexOfMinor = minor.indexOf(newValue)
    setMinor(
      indexOfMinor >= 0
        ? minor.filter(maj => newValue !== maj)
        : [...minor, newValue]
    )
  }

  const handleCollegeChange = newValue => {
    const indexOfCollege = college.indexOf(newValue)
    setCollege(indexOfCollege >= 0 ? '' : newValue)
  }

  const toggleMajor = () => {
    setMajorOpen(!isMajorOpen)
    setMinorOpen(false)
    setCollegeOpen(false)
  }
  const toggleMinor = () => {
    setMinorOpen(!isMinorOpen)
    setMajorOpen(false)
    setCollegeOpen(false)
  }
  const toggleCollege = () => {
    setCollegeOpen(!isCollegeOpen)
    setMajorOpen(false)
    setMinorOpen(false)
  }

  if (currentUser() === {}) {
    return <Navigate to='/login' />
  }

  if (!data?.isNewUser) {
    log.info('Navigateing....')
    return <Navigate to='/feed' />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      log.info({
        major: major.toString(),
        minor: minor.toString(),
        college,
        netID: data.netID,
        username
      })

      if (userExistLoading || userExists?.doesUsernameExist.usernameExists) {
        return
      }

      currentUser({ ...data, isNewUser: false })

      try {
        await addInfo({
          variables: {
            username,
            college,
            major,
            minor,
            netID: data.netID,
            isNewUser: false
          }
        })
      } catch (error) {
        return
      }
      navigator('/feed')
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  // have to manually push newUser
  return (
    <>
      <Helmet>
        <title>RiceDiscuss &middot; More Info</title>
      </Helmet>
      <FullGrid>
        <PinkShape>
          <>
            <AboutMyself>A little about myself...</AboutMyself>
            <LaptopGirl src={laptopGirl} alt='Girl with laptop' />
          </>

          <MarginsForm onSubmit={handleSubmit}>
            <TotalForm>
              <p>{userStatement}</p>
              <FieldSetStyle>
                <TextField
                  type='text'
                  placeholder='username'
                  value={username}
                  onChange={handleUserChange}
                />
              </FieldSetStyle>

              <DDWrapper>
                <DDHeader onClick={toggleMajor}>
                  <DDHeaderTitle>
                    Majors
                    <ArrowI open={isMajorOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isMajorOpen && (
                  <DDList>
                    {majors.map(item => (
                      <DDListItem key={item.name}>
                        <DropDownItem
                          name={item.name}
                          setInfo={handleMajorChange}
                          selectedItems={major}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>

              <DDWrapper>
                <DDHeader onClick={toggleMinor}>
                  <DDHeaderTitle>
                    Minors
                    <ArrowI open={isMinorOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isMinorOpen && (
                  <DDList>
                    {minors.map(item => (
                      <DDListItem key={item.name}>
                        <DropDownItem
                          name={item.name}
                          setInfo={handleMinorChange}
                          selectedItems={minor}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>

              <DDWrapper>
                <DDHeader onClick={toggleCollege}>
                  <DDHeaderTitle>
                    {college === '' ? 'College' : college}
                    <ArrowI open={isCollegeOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isCollegeOpen && (
                  <DDList>
                    {colleges.map(item => (
                      <DDListItem key={item}>
                        <DropDownItem
                          name={item}
                          setInfo={handleCollegeChange}
                          selectedItems={college}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>
              <SubmitButton
                type='submit'
                disabled={userExists?.doesUsernameExist.usernameExists}
              >
                &rarr;
              </SubmitButton>
            </TotalForm>
          </MarginsForm>
        </PinkShape>
      </FullGrid>
    </>
  )
}

export default MoreInfo
