import { useEffect, useRef } from 'react';
import { useCallback, useState } from 'react'


function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState("false");
  const [charatersAllowed, setCharacterAllowed] = useState("false");
  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState("Copy")


  // useRef hook: When you wanna to take reference then use useRef hook

  const refPassword = useRef(null)
  console.log(refPassword)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) str += "0123456789";
    if (charatersAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index);
    }

    setPassword(pass)


  }, [length, numberAllowed, charatersAllowed, setPassword])

  const copyClipboard = useCallback(() => {
    refPassword.current.select()
    refPassword.current.setSelectionRange(0, 50)

    window.navigator.clipboard.writeText(password)
    setCopy("Copied")

    setTimeout(() => {
      setCopy("Copy")
    }, 2000)

  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length , numberAllowed , charatersAllowed])

  return (
    <>
      <div className='w-9/12 m-auto bg-purple-600 h-screen p-10 flex flex-col gap-5 items-center'>
        <h1 className='text-white text-center font-sans text-4xl'>Password Generator</h1>

        <div className='flex flex-wrap justify-center'>
          <input
            type="text"
            className='max-w-96 w-96 rounded-l-lg text-center outline-none size-10 shadow-md'
            value={password}
            readOnly
            ref={refPassword}
          />
          <button className='copy bg-purple-700 px-2 text-white w-20 size-10 shadow-md cursor-pointer rounded-r-lg hover:bg-purple-800 transition-all'
          onClick={copyClipboard}
          >{copy}</button>
        </div>

        <div className='flex gap-2 '>
          <input
            className='outline-none accent-slate-600'
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setLength(
              () => e.target.value
            )}
          />
          <label className='text-white'>Length: {length}</label>
        </div>

        <div className='flex justify-center gap-6'>
          <div className='flex gap-2'>
            <input 
            className='cursor-pointer outline-none w-4  accent-slate-600'
            type="checkbox" 
            defaultChecked = {numberAllowed}
            onChange={() => setNumberAllowed(
              (prev) => !prev
            )}
            />
            <label className='text-white'>Number Allowed</label>
          </div>

          <div className='flex gap-2'>
            <input 
            className='cursor-pointer outline-none w-4  accent-slate-600'
            type="checkbox" 
            defaultChecked = {charatersAllowed}
            onChange={() => setCharacterAllowed(
              (prev) => !prev
            )}
            />
            <label className='text-white'>Character Allowed</label>
          </div>
        </div>

        <button className='bg-purple-700 text-white p-2 rounded-xl hover:bg-purple-800 transition-all'
        onClick={passwordGenerator}
        >Another Password</button>
      </div>
    </>
  )
}

export default App
