import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function EditorInput({startTime, pauseTime, resetTime, setAttempts, attempts, handleAttemptsZero, handleSubmit}) {
  const [code, setCode] = useState('');
  const handleOnChange = (value, e)=>{
    setCode(value);
  }
  return (
    <div className="Editor w-full h-full">
      <div className="w-full h-4/5 editor-container border border-gray-300 rounded-lg overflow-hidden transition duration-200">
        <Editor
          defaultLanguage="sql"
          defaultValue="/* Write your code here */"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 18
          }}
          value={code}
          onChange={handleOnChange}
        />
      </div>
      <div className="w-full h-1/5 flex justify-end items-center mt-1">
        <button onClick={()=>{
          handleSubmit();
          if(attempts > 1)
            setAttempts(attempts-1)
          else
            handleAttemptsZero()
        }} className="w-full md:w-fit font-semibold leading-none flex justify-center items-center text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">Submit</button>
      </div>
    </div>
  );
}
