/* eslint-disable react/prop-types */

const Display = ({ input, output }) => {
  return (
    <div>
        <span className="output">{output}</span>
        <span id="display" className="input">{input}</span>
    </div>
  )
}

export default Display