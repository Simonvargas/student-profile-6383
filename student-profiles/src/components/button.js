import { useState, useEffect } from 'react'
import '../App.css'

function Button({student}) {
  
  const [test, setTestDiv] = useState(false)

  let total = 0

  const changeState = () => {
    setTestDiv(!test)
  }
  

  return (
    <div>
    {!test ?<button onClick={changeState} className='btn'><i class="fas fa-plus fa-2x"></i></button> : <button onClick={changeState} className='btn'><i class="fas fa-minus fa-2x"></i></button>}
    {test ? <div className='test-scores'>{student.grades.map((grade, i) => (<div>Test {i + 1}: {grade}%</div>))}</div> : ''}

    </div>
  );
}

export default Button;