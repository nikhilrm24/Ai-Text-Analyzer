const { useState } = require("react");


function App(){
  const [text,setText]=useState("");
  const [result,setResult]=useState(null);
  async function analyzeText() {
      try{
        const response=await fetch("http://localhost:8000/api/analyze",{
          method:"POST",
          headers:{
            "content-Type":"application/json"
          },
          body:JSON.stringfy({
              text:text
            })
          
        })
          if (!response.ok) {
            throw new Error("Analysis failed");
        }
        const data=await response.json();
        setResult(data);
      }
      catch(error){
    console.error(error)
  }
  }
  return(
    <div>
      <h1>AI Text Analyzer</h1>
      <textarea 
       value={text}
       onChange={(e)=>setText(e.target.value)}
       placeholder="enter a review or text"
       />
       <button onClick={analyzeText}>Analyze</button>
       {result&&(
        <pre>
          {JSON.stringify(result,null,2)}
        </pre>
       )}
    </div>
  )
}