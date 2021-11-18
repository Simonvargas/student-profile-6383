import { useState, useEffect } from 'react'
import '../App.css'

function Profile({student}) {
  
//   const [ searchInput, setSearchInput ] = useState('')
  const [test, setTestDiv] = useState(false)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  
  function addTag(e) {
      if (e.key === 'Enter') {
        setTags([...tags, tag]);
        setTag('')
      }
  }
  
  let total = 0

  const changeState = () => {
    setTestDiv(!test)
  }
  

  return (
    <div className='container3'>
          {student.grades.map(avg => { (total += Number(avg)) }) }
            <div className='student-container'>
              <div className='column1'>
                <img className='profile-img' src={student.pic}></img>
              </div>
              <div className='column2'>
                <div className='header-container'>
                <h1 className='h1'>{student.firstName} {student.lastName}</h1> 
                {!test ?<button onClick={changeState} className='btn'><i class="fas fa-plus fa-2x"></i></button> : <button onClick={changeState} className='btn'><i class="fas fa-minus fa-2x"></i></button>}
                </div>
                <div className='student-details'>
                <div className='details'>{student.email}</div>
                <div className='details'>Company: {student.company}</div>
                <div className='details'>Skills: {student.skill}</div>
                <div className='details'>Average: {total / student.grades.length}%</div>
                <p>{tags?.map(tag => <div className='tag'>{tag}</div>)}</p>
                <input onKeyDown={addTag} className='tag-input' placeholder='Add a tag' value={tag} onChange={(e) => setTag(e.target.value)}></input>
                {test ? <div><br></br>{student.grades.map((grade, i) => (<div>Test {i + 1}: {grade}%</div>))}</div> : ''}
                </div>
              </div>
            </div>
    </div>
  );
}

export default Profile;