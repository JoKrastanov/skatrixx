import React, { useState, useEffect } from 'react'
import { acceptAndJoinLobby } from '../../services/lobbyService'
import { getUser } from '../../services/userService'

import '../../stylesheets/lobby/LobbyContainer.css'
import { acceptInvite } from '../../websockets/lobbyWS'

function LobbyContainer(props) {

    const [lobbyLeader, setLobbyLeader] = useState({})
    const [secondLobbyLeader, setSecondLobbyLeader] = useState(undefined)
    const [thirdLobbyLeader, setThirdLobbyLeader] = useState(undefined)
    const [containerLoaded, setContainerLoaded] = useState(false);

    const loadLobbyLeader = async () => {
      if(!containerLoaded) {
        setLobbyLeader(await getUser(props.lobby.members[0]))
        if(Object.keys(props.lobby.members).length > 1) {
            setSecondLobbyLeader(await getUser(props.lobby.members[1]))
        }
        if(Object.keys(props.lobby.members).length > 2) {
            setThirdLobbyLeader(await getUser(props.lobby.members[2]))
        }
        setContainerLoaded(true)
    }
  }

  const joinLobby = async () => {
      await acceptAndJoinLobby(props.lobby._id, localStorage.getItem('userId'))
      acceptInvite()
  }

    useEffect(() => {
      loadLobbyLeader()
    })
    
    if(containerLoaded) {
  return (
    <div className='lobby-container'>
        <div id='lobby-container-information'>
          <p id='lobby-container-owner'>{lobbyLeader.username}'s lobby <p id='lobby-availability'>{Object.keys(props.lobby.members).length}/{props.lobby.limit}</p></p>
          <div id='lobby-container-images'>
            <img id='lobby-container-image' src={lobbyLeader.image} alt=''/>
            {secondLobbyLeader !== undefined ? <img id='lobby-container-image' src={secondLobbyLeader.image} alt=''/> : ''}
            {thirdLobbyLeader !== undefined ? <img id='lobby-container-image' src={thirdLobbyLeader.image} alt=''/> : ''}
            {props.lobby.members.length > 3 ? <p>+{props.lobby.members.length - 3}</p> : ''}
        </div>
        <div id='lobby-container-controls'>
          <button id='lobby-container-join' onClick={() => {joinLobby()}}>Join</button>
        </div>
        </div>
    </div>
  )
}
else {return (<div>Loading...</div>)}
}

export default LobbyContainer