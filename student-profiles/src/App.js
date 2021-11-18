import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
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

  return (
    <div className='wrapper'>
      <div className='container'>
        {allStudents?.map(student => {
          { student.grades.map(avg => { (total += Number(avg)) }) }
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
      </div>
    </div>
  );
}

export default App;
