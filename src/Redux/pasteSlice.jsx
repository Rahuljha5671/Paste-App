import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {

      const paste = action.payload;

      //checks 
      if (paste.title === '') {
        alert("Title can not be Empty!");
        return;
      }
      //if title is already there    dont go for for in loop it gets indices while of loop gets the item from the array
      for (const pasteItem of state.pastes) {
        if (pasteItem.title === paste.title) {
          alert("Title already exist");
          return;
        }
      }

      // if (paste.content === '') {
      //   alert("Paste is Empty!");
      //   return;
      // }

      //if all good then go forward
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes)); 
      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const curr_paste_id = paste._id;
      console.log(curr_paste_id);
      let required_index=-1;

      for (let x in state.pastes) {
        if (state.pastes[x]._id === curr_paste_id) {
          required_index = x;
          break;
        }
      }
      console.log(required_index);

      if (required_index != -1) {
        state.pastes[required_index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes)); 
        toast.success("Paste Updated");
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes")
    },
    
    removeFromPastes: (state, action) => {
      const paste = action.payload;
      const curr_paste_id = paste._id;
      console.log(curr_paste_id);
      let required_index=-1;

      for (let x in state.pastes) {
        if (state.pastes[x]._id === curr_paste_id) {
          required_index = x;
          break;
        }
      }
      console.log(required_index);

      if (required_index != -1) {
        state.pastes.splice(required_index, 1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes)); 
        toast.success("Paste deleted");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer