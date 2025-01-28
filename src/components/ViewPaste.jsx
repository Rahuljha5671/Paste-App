import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useSearchParams} from "react-router-dom";



const ViewPaste = () => {

  
  const IdObject = useParams();
  const pasteId = IdObject.id;

  console.log(pasteId);

  const pasteListObject = useSelector((state) => state.pasteReducer.pastes);
  const paste = pasteListObject.find((p) => p._id === pasteId);
  
  

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input
          className="p-2 rounded-2xl mt-2 w-[60%]"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          
        />
      </div>
      <div>
        <textarea
          className="p-2 rounded-2xl mt-4 min-w-[500px]"
          value={paste.content}
          placeholder="Enter content here"
          rows="20"
          disabled
        />
      </div>
    </div>
    // <div>
    //   <h1>{paste?.title}</h1>
    //   <p>{paste?.content}</p>
    // </div>
  )
}



export default ViewPaste