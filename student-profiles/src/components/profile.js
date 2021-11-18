import { useState, useEffect } from 'react'
import '../App.css'

function Profile() {
  
//   const [ searchInput, setSearchInput ] = useState('')
  const [test, setTestDiv] = useState(false)

  let total = 0

  const changeState = () => {
    setTestDiv(!test)
  }
  

  return (
    <div className='wrapper'>
        {allStudents?.map(student => {
          {student.grades.map(avg => { (total += Number(avg)) }) }
          return (
            <div className='student-container'>
              <div className='column1'>
                <img className='profile-img' src={student.pic}></img>
              </div>
              <div className='column2'>
                <div className='header-container'>
                <h1 className='h1'>{student.firstName} {student.lastName}</h1> 
                <button onClick={changeState} className='btn'><i class="fas fa-plus fa-2x"></i></button>
                </div>
                <div className='student-details'>
                <div className='details'>{student.email}</div>
                <div className='details'>Company: {student.company}</div>
                <div className='details'>Skills: {student.skill}</div>
                <div className='details'>Average: {total / student.grades.length}%</div>
                {test ? <div>{student.grades.map((grade, i) => (<div>Test {i + 1}: {grade}%</div>))}</div> : ''}
                </div>
              </div>
            </div>
          )
        })} 
    </div>
  );
}

export default ;