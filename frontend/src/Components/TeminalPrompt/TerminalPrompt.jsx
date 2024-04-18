import { DotLoader } from "react-spinners"

function TerminalPrompt(){
    return (
        <div>
          <span>
            Detecting OS...
            <DotLoader color="#fff" size={10} />
          </span>
        </div>
    )
}

export default TerminalPrompt