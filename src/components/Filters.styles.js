import styled from 'styled-components'

const HorizontalDiv = styled.div`
  display: flex;
  justify-content: center;
`

const TextField = styled.input`
  padding: 5px;
  width: 150px;
  margin: 5px 0;
  border: 0;
  // border-radius: 6vw;
  border: 1px solid rgb(223, 223, 223);
  background-color: white;
  line-height: 19px;
`

const FieldSetStyle = styled.fieldset`
  position: relative;
  bottom: 0px;
  border: 0;
  left: 0px;
`

const TotalForm = styled.fieldset`
  width: 9vw;
  height: 75vh;
  transform: rotate(38deg);
  position: relative;
  top: -26vh;
  left: -8vw;
  border-color: transparent;
`

const MarginsForm = styled.form`
  margin: 0px 25.5vw;
`

const SubmitButton = styled.button`
  // padding: 10px;
  width: 50px;
  // margin: 5px 5px;
  border: 0;
  background-color: rgb(129, 212, 45);
  opacity: 100%;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  margin-left: 0px;

  &:hover {
    background-color: rgb(141, 250, 33);
  }
`

const DDWrapper = styled.div`
  position: relative;
  width: 222px;
  font-size: 1rem;
  user-select: none;
  margin-bottom: 15px;
`

const DDHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid rgb(223, 223, 223);
  background-color: white;
  line-height: 38px;
  cursor: default;
  cursor: pointer;
  // border-radius: 20px;
  margin-left: 12px;
  width: 16vw;
  height: 5vh;
`

const DDHeaderTitle = styled.div`
  margin: 0px 20px;
  margin-right: 10px;
  font-weight: 600;
`

const DDList = styled.ul`
  position: absolute;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: auto;
  width: 100%;
  max-height: 215px;
  border: 1px solid rgb(223, 223, 223);
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
  background-color: white;
  font-weight: 700;
  text-align: left;
  -webkit-overflow-scrolling: touch;
`

const DDListItem = styled.li`
  display: inline;
  width: 100%;
  font-size: 0.8rem;
  line-height: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`

const ArrowI = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 2.5px;
  margin: 2.5px;
  margin-left: 13px;

  transform: ${props => (props.open ? 'rotate(-135deg)' : 'rotate(45deg)')};
  -webkit-transform: ${props =>
    props.open ? 'rotate(-135deg)' : 'rotate(45deg)'};
`

export {
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
  ArrowI,
  HorizontalDiv
}
