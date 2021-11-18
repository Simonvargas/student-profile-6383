import { useState, useEffect } from 'react'
import '../App.css'

function TestScores({student}) {
  
  const [test, setTestDiv] = useState(false)

  let total = 0

  const changeState = () => {
    setTestDiv(!test)
  }
  

  return (
    <div>
    {test ? <div>{student.grades.map((grade, i) => (<div>Test {i + 1}: {grade}%</div>))}</div> : ''}

    </div>
  );
}

export default TestScores;