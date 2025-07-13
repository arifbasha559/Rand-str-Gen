import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Slide, toast, ToastContainer } from 'react-toastify';
const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

function App() {
  const [length, setLength] = useState(1);
  const [randomString, setRandomString] = useState('');

  const generate = useCallback(() => {
    const str = generateRandomString(length);
    setRandomString(str);
  }, [length]);

  useEffect(() => {
    generate(); // Generate a string on initial render
  }, [generate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(randomString)
      .then(() => {
        toast.success('Text Copied to Clipboard!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

      })
      .catch(err => {
        toast.error('Something went wrong!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  };
  return (
    <div className='p-20 bg-[#242424] text-white h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl'>Random String Generator</h1>

      <label className='mt-4 flex gap-2 items-center '>
        Length:
        <input
          className='p-2 rounded bg-[#333] text-white'
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min={1}
        />
      </label>

      <button onClick={generate}
        className='p-2 rounded bg-[#333] text-white mt-4'>Generate</button>

      <div style={{ marginTop: 20 }}>
        <strong>Generated String:</strong>
        <p className='select-all' onClick={handleCopy}>{randomString}</p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}

export default App;
