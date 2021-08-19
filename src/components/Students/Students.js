import React from 'react'
import './Students.css'
import Student from '../Student/Student'

function Students({students}) {
    return (
        <div className="students">
        {
            students.map(student => (
                <Student key={student.id} student={student}/>
            ))
        }
        </div>
    )
}

export default Students
