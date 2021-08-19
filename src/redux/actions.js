import { ADD_STUDENTS, ADD_TAG } from "./constants"

export const addStudents = students => ({
    type : ADD_STUDENTS,
    payload : students
})

export const addTag = ({tag, id}) => ({
    type : ADD_TAG,
    payload : {tag, id}
})

