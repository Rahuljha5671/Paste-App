import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { useSearchParams} from "react-router-dom";
import { addToPastes, updateToPastes } from '../Redux/pasteSlice'

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();


  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const pasteListObject = useSelector((state) => state.pasteReducer.pastes );

  useEffect(() => {
    if (pasteId) {
      const paste = pasteListObject.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
    
  }, [pasteId])
  

  function createPaste() {

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation  or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input
          className="p-2 rounded-2xl mt-2 w-[60%]"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 rounded-2xl mt-2" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="p-2 rounded-2xl mt-4 min-w-[500px]"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows="20"
        />
      </div>
    </div>
  );
};

export default Home;
