import { useState, useEffect } from 'react'
import './App.css'
import Profile from './components/profile'
function App() {
  
  const [students, setStudents] = useState([])
  const [ searchInput, setSearchInput ] = useState('')
  const [ searchTag, setSearchTag] = useState('')
  const [test, setTestDiv] = useState(false)
  const allStudents = students.students

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(allTags));
  });

  const saveditems = JSON.parse(localStorage.getItem('tags'));
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
   
    
  }, []);

  const addTags = allStudents?.map(student => {
    student['tags'] = []
    allTags?.map(tag => {
      if (student.id == tag.id) {
       student['tags'].push(tag.tag)
      }
    })
    // console.log(student)
  })

  // console.log('adasd', allStudents)


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
            <Profile allTags={allTags} submitTags={submitTags} student={student} />
            </div> 
          )
        })}
      </>
    )
  }

  const filter2 = (profiles, query) => {
    let arr = []
     profiles?.forEach((profile) => {
       profile?.tags?.forEach(tag => {
        const find = tag.toLowerCase()
        if (find === query) arr.push(profile)
      })
    })
    return arr
  }

  let searchbar2 = null

  if (searchTag) {
    const filteredStudents1 = filter2(allStudents, searchTag)
    console.log(filteredStudents1)
    searchbar2 = (
      <>
    {filteredStudents1?.map(student => {
          return (
            <div className='container2'>
            <Profile allTags={allTags} submitTags={submitTags} student={student} />
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
        value={searchTag}
        onChange={(e) => setSearchTag((e.target.value).toLowerCase())}
        ></input>
        </div>
        <>
        {!searchInput && !searchTag ? <>
        {allStudents?.map(student => {
          return (
            <div className='container2'>
           <Profile allTags={allTags} submitTags={submitTags} student={student} />
           </div> 
           )})} 
           </> : searchbar || searchbar2}
        </>
      </div>
    </div>
  );
}

export default App;
