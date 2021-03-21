const ADDUSER="ADDUSER";

export const addUser=(user)=>({
    type:ADDUSER,
    user
})

const initialState={
    user:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADDUSER:
            return {
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}