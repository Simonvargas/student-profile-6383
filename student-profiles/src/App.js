import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [students, setStudents] = useState([])
  const [ searchInput, setSearchInput ] = useState('')
  const allStudents = students.students

  let total = 0

  useEffect(() => {
    const url = "https://api.hatchways.io/assessment/students";

    const fetchApi = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setStudents(json)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchApi();

  }, []);

  const filter = (profiles, query) => {
    return profiles.filter((profile) => {
      const firstName = profile.firstName.toLowerCase()
      const lastName = profile.lastName.toLowerCase()
      if (firstName.includes(query)) return firstName.includes(query)
      if (lastName.includes(query)) return lastName.includes(query)
    })
  }

  const filteredStudents = filter(allStudents, searchInput)
  let searchbar = null

  if (searchInput) {
    searchbar = (
      <>
    {filteredStudents?.map(student => {
          {student.grades.map(avg => { (total += Number(avg)) }) }
          return (
            <div className='student-container'>
              <div className='column1'>
                <img className='profile-img' src={student.pic}></img>
              </div>
              <div className='column2'>
                <h1>{student.firstName} {student.lastName}</h1>
                <div className='student-details'>
                <div className='details'>{student.email}</div>
                <div className='details'>Company: {student.company}</div>
                <div className='details'>Skills: {student.skill}</div>
                <div className='details'>Average: {total / student.grades.length}%</div>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='search-input'>
        <input 
        className='search-input1'
        placeholder=' Search by name'
        value={searchInput}
        onChange={(e) => setSearchInput((e.target.value).toLowerCase())}
        ></input>
        </div>
        <>
        {!searchInput ? <>
        {allStudents?.map(student => {
          {student.grades.map(avg => { (total += Number(avg)) }) }
          return (
            <div className='student-container'>
              <div className='column1'>
                <img className='profile-img' src={student.pic}></img>
              </div>
              <div className='column2'>
                <h1>{student.firstName} {student.lastName}</h1>
                <div className='student-details'>
                <div className='details'>{student.email}</div>
                <div className='details'>Company: {student.company}</div>
                <div className='details'>Skills: {student.skill}</div>
                <div className='details'>Average: {total / student.grades.length}%</div>
                </div>
              </div>
            </div>
          )
        })} </>: searchbar}
        </>
      </div>
    </div>
  );
}

export default App;
