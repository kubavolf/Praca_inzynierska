import { createSlice } from "@reduxjs/toolkit";

const loadCurrentUser = () => {
    
    try {
        const dbUserData = localStorage.getItem('user');
        if (dbUserData == null)
            return { user: null };
        return { user: JSON.parse(dbUserData) }
    }

    catch (error) {
        return { user: null }
    }
}



const initialState = loadCurrentUser();

const userSlice = createSlice({
    name: 'logging',
    initialState,
    reducers: {

        setUser : (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify(state.user))
        },

        logout : (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
        
    }


})

export const{setUser, logout} = userSlice.actions;
export default userSlice.reducer;