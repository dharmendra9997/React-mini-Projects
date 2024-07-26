import { useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState(''); 

  const pwdRef = useRef(null)
  const pwdGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) {
      str += '0123456789';
    }
    if (char) str += '~!@#$%^&*';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, char , setPassword])

  const copyPwd = useCallback(() => {
    pwdRef.current?.select()
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => { pwdGenerator() } , [length, number, char, pwdGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 my-8 text-yellow-500 bg-slate-500">
       <h1 className="text-center my-3 text-yellow-200 ">PASSWORD GENERATOR</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4 my-2">
          <input type="text"
          value = {password} 
          placeholder='Password'
          readOnly
          className='outline-none w-full p-2 '
          ref={pwdRef}/>
         
          <button className='bg-blue-400 px-4 text-white'
          onClick={copyPwd}>copy</button>
        </div>
       <div className="flex justify-between mb-4  ">
     
          <input 
          type="range" 
          min={8} 
          max={20} 
          value={length}
          onChange={(event) => setLength(event.target.value)}
          className="cursor-pointer" />
          <label >Length: {length}</label>

          <input type="checkbox" className="cursor-pointer" 
          id='numberID'
          defaultChecked={number}
          onChange={()=>{setNumber((prev)=>!prev)}} /> 
          <label htmlFor="numberID">Number</label>
         <input type="checkbox" className="cursor-pointer" 
         id='charID'
         defaultChecked={char}
         onChange={()=>{{
            setChar((prev)=>!prev)
          }}}/>
          <label htmlFor="charID">Special Character</label> 
        </div>
      </div>
    </>
  )
}

export default App
