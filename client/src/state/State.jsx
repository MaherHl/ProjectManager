import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
    projects: [],
    tasks : []

}
export const authSlice = createSlice({

    name:'auth',
    initialState,
    reducers: {
            setLogin:(state,action)=>{
                state.user = action.payload.user;
                state.token = action.payload.token
            },
            setLogout:(state)=>{
                state.user=null
                state.token = null
            },
            setProjects:(state,action)=>{
                state.projects = action.payload.projects
            },
            setTasks :(state,action)=>{
                state.tasks = action.payload.tasks;

                
            },
            // setOnDoingTasks: (state, action) => {
            //     state.tasks.OnDoing = action.payload;
            //   },
            //   setDoneTasks: (state, action) => {
            //     state.tasks.Done = action.payload;
            //   },
            
         
            
    }



})
export const  {setLogin,setLogout,setProjects,setTasks}= authSlice.actions
export default authSlice.reducer;