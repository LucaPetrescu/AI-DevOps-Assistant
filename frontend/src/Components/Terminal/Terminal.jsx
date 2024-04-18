import styles from "../Terminal/Terminal.module.css";
import { useEffect, useState } from "react";
import { getRootDirRoute } from "../../utils/constants";
import axios from "axios";
import TerminalPrompt from "../TeminalPrompt/TerminalPrompt";
import TerminalPromptReady from "../TeminalPrompt/TerminalPromptReady";

function Terminal() {
  const [currentDir, setCurrentDir] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [system, setSystem] = useState("");
  useEffect(() => {
    axios
      .get(getRootDirRoute)
      .then((response) => {
        const rootDir = response.data.rootDir;
        const system = response.data.system;
        setSystem(system);
        if (system === "Windows") {
          setCurrentDir(rootDir);
        } else {
          setCurrentDir(`${rootDir} $:`);
        }
      })
      .catch((error) => {
        console.error("Error finding path:", error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminal__line}>
         { isLoading ? (
          <TerminalPrompt />
        ) : (
          <TerminalPromptReady system={system} currentDir={currentDir}/>
        )}
      </div>
    </div>
  );
}

export default Terminal;
