import  { useState, useCallback, useEffect } from 'react';
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
    <div className="bg-[#242424] text-white min-h-screen flex flex-col items-center justify-center px-6 py-10 w-full max-w-full box-border">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 break-words">Random String Generator</h1>

      <label className="mt-4 flex flex-col sm:flex-row gap-2 items-center mx-auto justify-center w-full max-w-xs mb-8">
        <span className="text-base md:text-lg">Length:</span>
        <input
          className="p-2 rounded bg-[#333] outline-none no-spinner text-white w-full sm:w-auto min-w-0"
          type="number"
          value={length === 0 ? 1 : length}
          onChange={(e) => setLength(Number(e.target.value) || 1)}
          min={1}
          max={9999}
          title='Length must be between 1 and 9999'
          autoFocus
          required
        />
      </label>

      <button
        onClick={generate}
        className="p-2 rounded bg-[#333] text-white mt-4 w-full max-w-xs text-base md:text-lg hover:bg-[#444] transition-colors duration-200 mb-8"
      >
        Generate
      </button>

      <div className="mt-5 break-all w-full max-w-md text-center">
        <strong className="block mb-2 text-base md:text-lg">Generated String:</strong>
        <span
          className="select-all px-2 py-1 rounded bg-[#333] selection:text-[#111] selection:bg-[#fff] text-white cursor-pointer inline-block text-sm md:text-base w-full max-w-full overflow-wrap break-words"
          onClick={handleCopy}
        >
          {randomString? randomString : 'Change the length and click Generate'}
        </span>
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
