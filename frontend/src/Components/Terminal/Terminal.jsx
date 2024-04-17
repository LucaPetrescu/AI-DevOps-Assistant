import Typewriter from "typewriter-effect";
import styles from "../Terminal/Terminal.module.css";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import axios from "axios";

function Terminal() {
  const [currentDir, setCurrentDir] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [system, setSystem] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getRootDir")
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
        {isLoading ? (
          <span>
            Detecting OS...
            <DotLoader color="#fff" size={10} />
          </span>
        ) : (
          <div>
            <span>OS detected: {system}</span>
            <div className={styles.terminal__prompt}>
              <div className={styles.terminal__prompt__label}>
                {currentDir}{" "}
              </div>
              <div className={styles.terminal__prompt__input}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString("Waiting for prompt").start();
                  }}
                />
                <input type="text" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
