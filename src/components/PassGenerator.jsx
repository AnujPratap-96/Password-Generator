import { useCallback, useEffect, useState , useRef } from "react";

export default function PassGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null)
 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}:<>?";
    console.log(numberAllowed)
    console.log(charAllowed)
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

 const copyPasswordClipBoard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0 , 100)
window.navigator.clipboard.writeText(password);

 } , [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-xl text-white text-center mb-2">
          Password Generator ✍️
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordClipBoard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="length"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Character</label>
          </div>
         
        </div>
      </div>
    </>
  );
}
