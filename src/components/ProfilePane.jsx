import React, { useState, useEffect, useCallback } from 'react'

import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import CloseIcon from '@material-ui/icons/Close'

// import { Helmet } from 'react-helmet'
// import {FeedProfileContainer} from "./PostFeedWithData.styles";
import {
  Descriptor,
  LogoutButton,
  ProfileInner,
  ProfileLogout,
  Divider,
  RightSidebarContainer,
  Headshot,
  EditButton,
  BlockyText,
  TextBlock,
  SaveButton,
  EditableTextBlock
} from './Profile.styles'

import {
  ExitButton,
} from './WritePost.styles'

import EditUrl from '../images/edit.svg'
import { Navigate, useNavigate } from 'react-router-dom'
import { currentUser } from '../utils/apollo'
import { SET_INFO } from '../graphql/Mutations'
// import {USER_EXISTS} from "../graphql/Queries";
import majorMinorJson from '../utils/MajorMinor.json'
import { DDList, DDListItem } from './MoreInfo.styles'
import DropDownItem from './DropDownItem'

const ProfilePane = props => {
  const navigate = useNavigate()
  // const [userStatement, setStatement] = useState('Valid!')
  // const [originalUsername, setOriginal] = useState('')
  const [username, setUsername] = useState('')

  // current major, minors, and college
  const [major, setMajor] = useState([])
  const [minor, setMinor] = useState([])
  const [college, setCollege] = useState("")
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // if the drop_down is open
  const [beingEdited, setBeingEdited] = useState('none')
  const [showSaveButton, setShowSaveButton] = useState(false)

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
    email: currentEmail,
    phone: currentPhone,
    savedPosts
  } = currentUser()

  // const [
  //   checkUser,
  //   { data: userExists, loading: userExistLoading }
  // ] = useLazyQuery(USER_EXISTS)

  useEffect(() => {
    // const newUsername = username.length === 0 ? currentUsername : username
    // setOriginal(newUsername)
    setUsername(currentUsername)
    setMajor(currentMajor)
    setMinor(currentMinor)
    setCollege(currentCollege)
    setEmail(currentEmail)
    setPhone(currentPhone)
  }, [])

  // useEffect(() => {
  //   checkUser({
  //     variables: {
  //       username
  //     }
  //   })
  // }, [username])

  // useEffect(() => {
  //   const isMyUsernameTaken = userExists?.doesUsernameExist
  //   setStatement('valid username!')
  //   if (isMyUsernameTaken) {
  //     setStatement('somebody already took username that lol')
  //   }
  //   if (originalUsername === username) {
  //     setStatement('this is your current username')
  //   }
  // }, [userExists?.doesUsernameExist])

  // useEffect(() => {
  //   document.getElementById('email').focus()
  // }, [])

  const majors = majorMinorJson.majors.split(';')

  const finalizedMajors = majorSearchActivated ? filteredMajors : majors

  const minors = majorMinorJson.minors.split(';')

  const finalizedMinors = minorSearchActivated ? filteredMinors : minors

  const colleges = majorMinorJson.colleges.split(';')

  const handleEditClick = source => {
    if (source === beingEdited) {
      setBeingEdited('none')
    } else {
      setBeingEdited(source)
    }
    setShowSaveButton(true)

    setEmail(document.getElementById('email').innerText)
    // saveData()
  }

  const checkForEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      setBeingEdited('none')
      e.target.value = ''

      setEmail(document.getElementById('email').innerText)
    }
  }


  // const handleUserChange = useCallback(e => {
  //   setUsername(e.target.value)
  // }, [])

  // const handleBack = () => {
  //   navigator('/feed')
  // }

  // if I wrap this in useCallback, it breaks
  const handleMajorChange = newValue => {
    const indexOfMajor = major.indexOf(newValue)
    setMajor(
      indexOfMajor >= 0
        ? major.filter(maj => newValue !== maj)
        : [...major, newValue]
    )
    setBeingEdited('none')
  }

  const handleMinorChange = newValue => {
    const indexOfMinor = minor.indexOf(newValue)
    setMinor(
      indexOfMinor >= 0
        ? minor.filter(maj => newValue !== maj)
        : [...minor, newValue]
    )
    setBeingEdited('none')
  }

  const handleCollegeChange = useCallback(newValue => {
    const indexOfCollege = college.indexOf(newValue)
    setCollege(indexOfCollege >= 0 ? '' : newValue)
  }, [])

  const saveData = async () => {
    // if (
    //     userExistLoading ||
    //     (userExists?.doesUsernameExist && originalUsername !== username)
    // ) {
    //   return
    // }

    try {
      console.log('Email')
      console.log(email)
      await addInfo({
        variables: {
          username,
          college,
          major,
          minor,
          netID,
          email: document.getElementById('email').innerText.trim(),
          phone: document.getElementById('phone').innerText.trim(),
          isNewUser: false
        }
      })
      setShowSaveButton(false)
      setBeingEdited('none')
    } catch (error) {
      console.log("The big error we don't like")
    }
  }

  if (currentUser() === {}) {
    return <Navigate to='/login' />
  }

  const handleLogout = () => {
    // FIXME: logout tasks here
    navigate('/login')
  }

  return props.show ? (
    <RightSidebarContainer>
      <ExitButton onClick={props.closeModal}>
        <CloseIcon style={{ width: '5vh', height: '5vh' }} />
      </ExitButton>
      <ProfileLogout>
        <b style={{ fontSize: '3.7vh' }}>Profile</b>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ProfileLogout>
      <ProfileInner>
        <Headshot />
        <b>{username}</b>
        <Divider />
        <Descriptor>
          <BlockyText>
            <b> Major: </b>
            <TextBlock>{major.join(', ')}</TextBlock>
          </BlockyText>
          <EditButton src={EditUrl} onClick={() => handleEditClick('major')} />
          {beingEdited === 'major' && (
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
        </Descriptor>
        <Descriptor>
          <BlockyText>
            <b> Minor: </b>
            <TextBlock> {minor.join(', ')} </TextBlock>
          </BlockyText>
          <EditButton src={EditUrl} onClick={() => handleEditClick('minor')} />
          {beingEdited === 'minor' && (
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
        </Descriptor>
        <Descriptor>
          <BlockyText>
            <b> College: </b>
            <TextBlock> {college} </TextBlock>
          </BlockyText>
          <EditButton
            src={EditUrl}
            onClick={() => handleEditClick('college')}
          />
          {beingEdited === 'college' && (
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
        </Descriptor>
        <Divider />
        <Descriptor>
          <BlockyText>
            <b> Email: </b>
            <EditableTextBlock
              contentEditable={beingEdited === 'email'}
              id={'email'}
              onChange={text => setEmail(text)}
              style={
                beingEdited === 'email' ? { backgroundColor: '#FCE8DA' } : null
              }
              onKeyDown={checkForEnter}
            >
              <a href={beingEdited === 'email' ? null : 'mailto:' + email}>
                {email}
              </a>
            </EditableTextBlock>
          </BlockyText>
          <EditButton src={EditUrl} onClick={() => handleEditClick('email')} />
        </Descriptor>
        <Descriptor>
          <BlockyText>
            <b> Phone: </b>
            <EditableTextBlock
              contentEditable={beingEdited === 'phone'}
              id={'phone'}
              value={phone}
              style={
                beingEdited === 'phone' ? { backgroundColor: '#FCE8DA' } : null
              }
              onKeyDown={checkForEnter}
            >
              {phone}
            </EditableTextBlock>
          </BlockyText>
          <EditButton src={EditUrl} onClick={() => handleEditClick('phone')} />
        </Descriptor>
        <Divider />
        {showSaveButton && <SaveButton onClick={saveData}>Save</SaveButton>}
        {/*<Divider />*/}
        {/*tags*/}
      </ProfileInner>
    </RightSidebarContainer>
  ) : null
}

export default ProfilePane
