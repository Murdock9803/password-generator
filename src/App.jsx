import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [pswdLength, setPswdLength] = useState(8);
  const [isAlphaAllowed, setIsAlphaAllowed] = useState(true);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [pswd, setPswd] = useState("");
  const [copied, setCopied] = useState(false);

  const pswdRef = useRef(null);

  const pswdGenerator = useCallback(()=>{
    let tempPswd = "";
    let str = "";
    let alphaStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numStr = "0123456789";
    let charStr = "!@#$%^&*(){}_+`<>/?[]";

    // Check if no option is selected, so you don't get a password with only letters when nothing is selected
    if (!isAlphaAllowed && !isNumAllowed && !isCharAllowed) {
      setPswd("Select at least 1 type");
      return;
    }

    // Add the selected characters to the string of possibilities
    if (isAlphaAllowed) str += alphaStr;
    if (isNumAllowed) str += numStr;
    if (isCharAllowed) str += charStr;

    do {
      tempPswd = "";

      // Make it at least 2 characters of each type, so you don't get a password with only numbers
      // and only letters when selecting all the types, for example
      if (isAlphaAllowed) {
        for (let i = 0; i < 2; i++) {
          let randomIndex = Math.floor(Math.random() * alphaStr.length);
          tempPswd += alphaStr.charAt(randomIndex);
        }
      }
      if (isNumAllowed) {
        for (let i = 0; i < 2; i++) {
          let randomIndex = Math.floor(Math.random() * numStr.length);
          tempPswd += numStr.charAt(randomIndex);
        }
      }
      if (isCharAllowed) {
        for (let i = 0; i < 2; i++) {
          let randomIndex = Math.floor(Math.random() * charStr.length);
          tempPswd += charStr.charAt(randomIndex);
        }
      }

      // Randomize the rest of the password
      const remainingLength = pswdLength - tempPswd.length;
      for (let i = 0; i < remainingLength; i++) {
        let randomIndex = Math.floor(Math.random() * str.length);
        tempPswd += str.charAt(randomIndex);
      }

      // Trying to make it more random
      tempPswd = tempPswd.split('').sort(() => Math.random() - 0.5).join('');
    } while (tempPswd.length !== pswdLength);

    setPswd(tempPswd);
  }, [pswdLength, isAlphaAllowed, isNumAllowed, isCharAllowed, setPswd])

  const copyPswdToClip = useCallback(()=>{
    pswdRef.current?.select();
    window.navigator.clipboard.writeText(pswd);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500)


  }, [pswd])

  useEffect(() => {
    pswdGenerator()
  }, [pswdLength,isAlphaAllowed, isCharAllowed, isNumAllowed, pswdGenerator])

  return (
    <>
      <section className='h-full'>
        <h1 className='text-4xl text-cyan-600 font-mono font-semibold text-center mt-6'>Generate a random password!</h1>

        <div className='w-full max-w-md mx-auto my-10 border-[2px] border-cyan-400 shadow-md rounded-[6px] p-4 text-cyan-200 bg-cyan-900/40'>
          <div className='w-full flex overflow-hidden mb-4 shadow-md bg-red-200 rounded-[6px]'>
            <input 
            type='text'
            placeholder='Password'
            value={pswd}
            className='p-[12px] text-md w-[90%] outline-none bg-cyan-800'
            readOnly
            ref={pswdRef}
            />
            <button className='w-[10%] outline-none font-mono bg-cyan-600 hover:bg-sky-700 text-white p-[12px] shrink-0 transition-all duration-900' onClick={copyPswdToClip}>
              <i className= {copied ? "fa-solid fa-check" : "fa-regular fa-clone transition-all ease-in-out duration-900"}></i>
            </button>
          </div>
          <div className="flex text-sm gap-9">
            <div className="flex items-center gap-x-1">
              <input 
                type="range"
                min={6}
                max={80}
                value={pswdLength}
                className='cursor-pointer'
                onChange={(e) => {setPswdLength(Number(e.target.value))}} 
              />
              <label>Length: {pswdLength}</label>
            </div>

            <div>
              <div className="flex items-center gap-x-1">
                <input 
                  type="checkbox"
                  defaultChecked={isAlphaAllowed}
                  id='alphaInput'
                  onChange={() => {setIsAlphaAllowed((prev) => !prev)}} 
                />
                <label htmlFor='alphaInput'>Alphabet</label>
              </div>

              <div className="flex items-center gap-x-1">
                <input 
                  type="checkbox"
                  defaultChecked={isNumAllowed}
                  id='numInput'
                  onChange={() => {setIsNumAllowed((prev) => !prev)}} 
                />
                <label htmlFor='numInput'>Numbers</label>
              </div>

              <div className="flex items-center gap-x-1">
                <input 
                  type="checkbox"
                  defaultChecked={isCharAllowed}
                  id='charInput'
                  onChange={() => {setIsCharAllowed((prev) => !prev)}} 
                />
                <label htmlFor='charInput'>Characters</label>
              </div>
            </div>
          </div>
        </div>

        <div className='absolute bottom-[5px] left-[7px] text-cyan-300 tracking-light font-mono'>🚀 Made by <a className='text-blue-500' target="_blank" href="https://murdock9803.github.io/Ayush-Portfolio/">Ayush Sahu</a>, &#169; 2025</div>
      </section>
    </>
  )
}

export default App
