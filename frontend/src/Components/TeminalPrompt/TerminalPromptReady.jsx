import styles from '../Terminal/Terminal.module.css'
import Typewriter from 'typewriter-effect';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { postCommand } from '../../utils/constants';

function TerminalPromptReady(props){

    const [userInput, setUserInput] = useState('');
    const [firstPressed, setFirstPressed] = useState(false)
    const [commands, setCommands] = useState([])
    const commandHistory = []
   
    useEffect(()=>{
        document.addEventListener('keydown', detectKeyDown, true)
    }, [commands])
    
   
    const detectKeyDown = (event) => {

        if (event.key === ' ') {
            setUserInput('');
        } 
        if (!firstPressed) {
            setFirstPressed(true);
        }

        if(event.key === 'Enter'){
            axios.post(postCommand, {userInput: userInput}).then((response) => {
                console.log(response)})
                console.log(userInput)
            const cmds = [...commandHistory]
            commandHistory.push(commandHistory)
            setCommands(cmds)
            setUserInput('')
        }
      };

      
    return(
        <div>
            <span>OS detected: {props.system}</span>
            <div className={styles.terminal__prompt}>
              <div className={styles.terminal__prompt__label}>
                {props.currentDir}{" "}
              </div>
              <div className={styles.terminal__prompt__input}>
              {userInput ? (
            <span></span>
          ) : (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString("Waiting for prompt...").start()
                  }}
                />)}
                <input type="text"
                    value={userInput} 
                    onChange={(event) => setUserInput(event.target.value)} // Update state on input change
                    onKeyDown={detectKeyDown} />
              </div>
            </div>
            {commandHistory.length !== 0 && (
        <div className={styles.terminal__prompt}>
          
            {commandHistory.map((command, index) => (
                <div><div className={styles.terminal__prompt__label}>
                {props.currentDir}{" "}
              </div>
              <div className={styles.terminal__prompt__input}>{command}</div></div>
              
            ))}
          
        </div>
      )}
          </div>
    )
}

export default TerminalPromptReady