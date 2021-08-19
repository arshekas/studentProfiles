import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '../shared/Input';
import Students from '../components/Students/Students';
import { addStudents } from '../redux/actions';
import './Homepage.css'
function Homepage() {

    const [search, setSearch] = useState({
        studentSearch: "",
        tagSearch: ""
    })

    //To dispatch actions 
    const dispatch = useDispatch();

    // get student state from redux store
    const students = useSelector(state => state.students)

    const [results, setResults] = useState(students)

    //handle input for multiple state input
    const handleInput = (e) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    // filter the data by search name
    const filterDataByName = (search, students) => {
        return  students.filter(student => 
            (student.firstName + student.lastName).toLowerCase().includes(search.toLowerCase()))
    }
    // filter data by tag search
    const filterDataByTag = (search, students) => {
            return students.filter( (student) => {
                    const isTagExist=student.tags.map(tag => tag.includes(search))
                    return (isTagExist.includes(true) ? true : false)
        })
    }

    //fetching data from url and set to state
    useEffect( () => {
        const fetchStudents = async () => {
            try {
                const result = await axios.get("https://api.hatchways.io/assessment/students")
                const tagging = result.data.students.map(student => {
                    return {
                        ...student,
                        tags: []
                    }
                })
                dispatch(addStudents(tagging))
                setResults(tagging)
            }
            catch(error)
            {
                console.log(error.message)
            }
        }        
            fetchStudents()
    }, [])

    // whenever the state of students and search changes this will run and update the searched results
    useEffect(() => {
        setResults(students)
        if(search.studentSearch !== "" && search.studentSearch.trim() !== "")
        {
           setResults(filterDataByName(search.studentSearch.trim(), students))
           // using name search to search for tag if user enter
            if(search.tagSearch !== "" && search.tagSearch.trim() !== "")
            {
                setResults(filterDataByTag(search.tagSearch, filterDataByName(search.studentSearch.trim(), students)))
            }
        }
        if(search.tagSearch !== "" && search.tagSearch.trim() !== "")
        {

            setResults(filterDataByTag(search.tagSearch, students))
            // using tag search to search for name if user enter any
            if(search.studentSearch !== "" && search.studentSearch.trim() !== "")
            {
                setResults(filterDataByName(search.studentSearch, filterDataByTag(search.tagSearch, students)))
            }
        }
    }, [search, students])

    

    return (
        
        <div className="homepage">     
            <Input name="studentSearch" placeholder="Search by name" search={search.studentSearch} handleInput={handleInput} />  
            <Input name="tagSearch" placeholder="Search by tag" search={search.tagSearch} handleInput={handleInput} />  
             {results.length ? <Students students={results} /> : <div className="no_results"><p>No Result Found!</p></div>}
        </div>
    )
}

export default Homepage
