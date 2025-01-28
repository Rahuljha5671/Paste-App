import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes,removeFromPastes } from '../Redux/pasteSlice'
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Paste = () => {
  const pasteListObject = useSelector((state) => state.pasteReducer.pastes);
  // console.log(pasteListObject);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = pasteListObject.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(filteredData);

  function handleDelete(paste) {
    dispatch(removeFromPastes(paste));
  }

  function handleCopy(paste) {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard");
  }

  function handleShare(paste) {
    navigator.clipboard.writeText(window.location.href+'/'+paste._id);
    toast.success("URL copied to clipboard");
  }

  return (

    <div>
       <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 mb-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e)=>{setSearchTerm(e.target.value)}}
      
      
      />
      <div className="container">
     

      <div>
        <h1>All Pastes</h1>
      </div>
      <hr />

        {
          filteredData.map((pasteItem) => 
            <div className="cards" key={pasteItem?._id}>
              <div>
              <h1>{pasteItem.title}</h1>
              <p>{pasteItem.content}</p>
              
              </div>
              <div className="flex flex-row gap-4 place-content-evenly">
                <button>
                  <Link to={`/?pasteId=${pasteItem._id}`} >Edit</Link>
                </button>
                <button>
                  <Link to={`/pastes/${pasteItem._id}`} >View</Link>
                </button>
                <button onClick={()=>handleDelete(pasteItem)}>Delete</button>
                <button onClick={()=>handleCopy(pasteItem)}>Copy</button>
                <button onClick={()=>handleShare(pasteItem)}>Share</button>
              </div>
              <div>
              <p>{pasteItem.createdAt }</p>
              </div>

            </div>
          )
        }


    </div>
    </div>

    
  );
};

export default Paste;
