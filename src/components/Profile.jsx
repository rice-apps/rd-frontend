import React, { useState, useCallback, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { SET_INFO } from '../graphql/Mutations'
import { USER_EXISTS } from '../graphql/Queries'
import DropDownItem from './DropDownItem'
import majorMinorJson from '../utils/MajorMinor.json'
import SearchBar from './Search'
import {
  DDWrapper,
  DDHeader,
  DDHeaderTitle,
  DDList,
  DDListItem,
  ArrowI,
  FieldSetStyle,
  TextField
} from './MoreInfo.styles'

import { PostingButton } from './WritePost.styles'
import { currentUser } from '../utils/apollo'
import { LeftSidebarContainer } from './PostFeedWithData.styles'
import { SideNav } from './SideNav'

const ProfilePage = () => {
  const navigator = useNavigate()
  const [userStatement, setStatement] = useState('Valid!')
  const [originalUsername, setOriginal] = useState('')
  const [username, setUsername] = useState('')

  // current major, minors, and college
  const [major, setMajor] = useState([])
  const [minor, setMinor] = useState([])
  const [college, setCollege] = useState('')

  // if the drop_down is open
  const [isMajorOpen, setMajorOpen] = useState(false)
  const [isMinorOpen, setMinorOpen] = useState(false)
  const [isCollegeOpen, setCollegeOpen] = useState(false)

  const [majorSearchActivated, setMajorsActive] = useState(false)
  const [minorSearchActivated, setMinorsActive] = useState(false)
  const [filteredMajors, setFilteredMajors] = useState([])
  const [filteredMinors, setFilteredMinors] = useState([])

  const { netID } = currentUser()
  const [addInfo] = useMutation(SET_INFO)

  const {
    username: currentUsername,
    major: currentMajor,
    minor: currentMinor,
    college: currentCollege,
    savedPosts
  } = currentUser()

  const [
    checkUser,
    { data: userExists, loading: userExistLoading }
  ] = useLazyQuery(USER_EXISTS)

  useEffect(() => {
    const newUsername = username.length === 0 ? currentUsername : username
    setOriginal(newUsername)
    setUsername(currentUsername)
    setMajor(currentMajor)
    setMinor(currentMinor)
    setCollege(currentCollege)
  }, [])

  useEffect(() => {
    checkUser({
      variables: {
        username
      }
    })
  }, [username])

  useEffect(() => {
    const isMyUsernameTaken = userExists?.doesUsernameExist
    setStatement('valid username!')
    if (isMyUsernameTaken) {
      setStatement('somebody already took username that lol')
    }
    if (originalUsername === username) {
      setStatement('this is your current username')
    }
  }, [userExists?.doesUsernameExist])

  const majors = majorMinorJson.majors.split(';')

  const finalizedMajors = majorSearchActivated ? filteredMajors : majors

  const minors = majorMinorJson.minors.split(';')

  const finalizedMinors = minorSearchActivated ? filteredMinors : minors

  const colleges = majorMinorJson.colleges.split(';')

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

  const handleUserChange = useCallback(e => {
    setUsername(e.target.value)
  }, [])

  const handleBack = () => {
    navigator('/feed')
  }

  // if I wrap this in useCallback, it breaks
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

  const handleCollegeChange = useCallback(newValue => {
    const indexOfCollege = college.indexOf(newValue)
    setCollege(indexOfCollege >= 0 ? '' : newValue)
  }, [])

  console.log(major)
  const saveData = async () => {
    if (
      userExistLoading ||
      (userExists?.doesUsernameExist && originalUsername !== username)
    ) {
      return
    }

    try {
      await addInfo({
        variables: {
          username,
          college,
          major,
          minor,
          netID,
          isNewUser: false
        }
      })
    } catch (error) {}
  }

  if (currentUser() === {}) {
    return <Navigate to='/login' />
  }

  // known bug, data won't save if we change the drop-downs
  return (
    <>
      <LeftSidebarContainer>
        <SideNav />
      </LeftSidebarContainer>
      <form onSubmit={saveData}>
        <p>{userStatement}</p>
        <FieldSetStyle>
          <TextField
            type='text'
            placeholder='username'
            value={username}
            onChange={handleUserChange}
          />
        </FieldSetStyle>
        <p>Current Majors: {major.toString()}</p>
        <SearchBar
          items={majors}
          setList={setFilteredMajors}
          setActive={setMajorsActive}
        />
        <DDWrapper>
          <DDHeader onClick={toggleMajor}>
            <DDHeaderTitle>
              Majors
              <ArrowI open={isMajorOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isMajorOpen && (
            <DDList>
              {finalizedMajors.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
                    setInfo={handleMajorChange}
                    selectedItems={major}
                  />
                </DDListItem>
              ))}
            </DDList>
          )}
        </DDWrapper>

        <p>Current Minors: {minor.toString()}</p>
        <SearchBar
          items={minors}
          setList={setFilteredMinors}
          setActive={setMinorsActive}
        />
        <DDWrapper>
          <DDHeader onClick={toggleMinor}>
            <DDHeaderTitle>
              Minors
              <ArrowI open={isMinorOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isMinorOpen && (
            <DDList>
              {finalizedMinors.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
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

        <div>
          Your saved posts:
          {savedPosts.map(post => (
            <div key={post._id}>{'localhost:3000/posts/' + post._id}</div>
          ))}
        </div>

        <PostingButton
          type='submit'
          disabled={
            userExists?.doesUsernameExist && originalUsername !== username
          }
        >
          Save
        </PostingButton>
      </form>

      <PostingButton onClick={handleBack}>Back to feed</PostingButton>
    </>
  )
}

export default ProfilePage
