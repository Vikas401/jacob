import React, {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const [uploadedFile, setUploadedFile] = useState ('');
  const [dis, setDis] = useState ('hello');
  const [disab, setDisab] = useState ('');

  function handleFormSubmittion (e) {
    e.preventDefault ();

    let form = document.getElementById ('form');
    let formData = new FormData (form);

    // new line added
    axios.post ('https://zentyment.herokuapp.com/upload', formData);
    setDis('')
    setDisab('hello');
  }
  
 

  function handleUploadedFile (e) {
    setUploadedFile (e.target.value);
    
  }

  function handleSubmittion (e){
      e.preventDefault();
      
    axios.post ('https://zentyment.herokuapp.com/customer').then(res => {
        toast('Your data saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setDisab('');
            setDis('hello');
    });
   
  }

  return (
    <div className="uploads">
      <h1>File upload</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleFormSubmittion}
        id="form"
      >
        <input
          type="file"
          name="uploadedFile"
          value={uploadedFile}
          onChange={handleUploadedFile}
          required
          disabled={!dis}
        />

        <button  disabled={!dis} type="submit">Upload File</button>
      </form>
      <form onSubmit={handleSubmittion}>
      <button style={{marginTop: "2rem"}} disabled={!disab} type="submit">Save Data To DataBase</button>
     
      </form>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </div>
  );
}

export default App;