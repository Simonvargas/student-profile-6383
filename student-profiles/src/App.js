import { useState, useEffect } from 'react'
import './App.css'
import Profile from './components/profile'
function App() {
  
  const [students, setStudents] = useState([])
  const [ searchInput, setSearchInput ] = useState('')
  const [test, setTestDiv] = useState(false)
  const allStudents = students.students

  // const [allTags, setTags] = useState(saveditems || [{}])

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(allTags));
  });

  const saveditems = JSON.parse(localStorage.getItem('tags'));
// const [items, setItems] = useState(saveditems || []);
const [allTags, setTags] = useState(saveditems || [{}])
  const submitTags = tag => {
    setTags([...allTags, tag])
  }

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
    students?.students?.forEach(ele => {
      if (typeof ele === 'object') {
        ele['tags'] = 'hi'
      }
    })
    
  }, []);

  const filter = (profiles, query) => {
    return profiles.filter((profile) => {
      const firstName = profile.firstName.toLowerCase()
      const lastName = profile.lastName.toLowerCase()
      if (firstName.includes(query)) return firstName.includes(query)
      if (lastName.includes(query)) return lastName.includes(query)
    })
  }

  let searchbar = null

  if (searchInput) {
    const filteredStudents = filter(allStudents, searchInput)
    searchbar = (
      <>
    {filteredStudents?.map(student => {
          return (
            <div className='container2'>
            <Profile student={student} />
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
        placeholder='Search by name'
        value={searchInput}
        onChange={(e) => setSearchInput((e.target.value).toLowerCase())}
        ></input>
        </div>
        <div className='search-input'>
        <input 
        className='search-input1'
        placeholder='Search by tag'
        // value={searchInput}
        // onChange={(e) => setSearchInput((e.target.value).toLowerCase())}
        ></input>
        </div>
        <>
        {!searchInput ? <>
        {allStudents?.map(student => {
          return (
            <div className='container2'>
           <Profile allTags={allTags} submitTags={submitTags} student={student} />
           </div> 
           )})} 
           </> : searchbar}
        </>
      </div>
    </div>
  );
}

export default App;
