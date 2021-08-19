import React, { useState } from 'react'
import './Student.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch } from 'react-redux';
import { addTag } from '../../redux/actions';


function Student({student}) {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const handlePress = (e) => {
        if(e.key==='Enter' && input.trim() !== "" && input !== "")
        {
            dispatch(addTag({id: student.id, tag: e.target.value}))
            setInput('');
        }
    }

    return (
        <div className="student">
            <div className="left">
                <img className="img" src={student.pic} alt={student.firstName} />
            </div>
            <div className="middle">
                <h2>{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h2>
                <div className="student_details">
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {student.grades.reduce( ( a, b ) => a + parseInt(b), 0 ) / student.grades.length}%</p>
                        {
                            show
                            &&
                            <div className="grades">
                                {student.grades.map((grade, index) => (
                                <p key={index}>Test {index+1}: &emsp; {grade}%</p>
                                )) }
                            </div>  
                        }
                    <div className="tags">
                        {
                            student.tags.map((tag, index) => <p key={index}>{tag}</p>)    
                        }
                    </div>
                    <div className="add_tag">
                        <input 
                            placeholder="Add a tag"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handlePress}
                        />
                    </div>
                </div>
            </div>
            <div className="right">
                {show 
                    ? 
                    <RemoveIcon onClick={()=> setShow(false)}/>
                    :
                    <AddIcon onClick={()=> setShow(true)}/>
                }
            </div>
        </div>
    )
}

export default Student
