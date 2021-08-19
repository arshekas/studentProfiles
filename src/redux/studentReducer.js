import { ADD_STUDENTS, ADD_TAG } from "./constants";
const initialState = {
    students: [],
}

function studentReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_STUDENTS:
            return {
                ...state,
                students: action.payload,
            }
        case ADD_TAG:
            const found = state.students.find(student => student.id === action.payload.id)
            if(found)
            {
                const updatedStudent =  state.students.map(student => 
                    student.id === action.payload.id ? {
                        ...student, 
                        tags: [...student.tags, action.payload.tag]
                    } 
                        : student)
                return {
                    ...state,
                    students:  updatedStudent
                }
            }
        default:
            return state;
    }
}

export default studentReducer;