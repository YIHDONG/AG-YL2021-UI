import React, { useState ,useEffect} from 'react';
import axios from "axios"
// import api from './api';
// import logo from './logo.svg';
import helpLogo from './assets/images/questionmark.png';
import hint from './assets/images/hint.png';
import run from './assets/images/run.png';
import submit from './assets/images/submit.png';
import './App.css';

function App() {
  // const [courses, setCoursesList] = useState('No courses yet!');
  // const [loading, setLoading] = useState(false);

  const [questionList,setQuestionList] = useState([])
  // const [inputContent, setInputContent] = useState('');
  const [checkValue,SetCheckValue] = useState('')
  const [message,Setmessage] = useState('')
  const [imageurl,Setimageurl] = useState('')
  /* const handleChangeInput = (value) => {
    setInputContent(value.target.value);
  }; */

  let id = ""
  const InitList =()=>{
    axios.get("http://127.0.0.1:3001/courses").then(res=>{
      console.log(res)
      id = res.data[0].id
      axios.get(`http://127.0.0.1:3001/courses/${id}`).then(ress=>{
        console.log(ress)
        let questions = ress.data.pages.filter(item=>{
          return item.type=="practice"
        }) 
        console.log(questions)
        let message = questions[0].tests[0].feedback
        let imageurl = questions[0].tests[0].content
        Setimageurl(imageurl)
        Setmessage(message)
        setQuestionList(questions)
      })
    })
  }
  useEffect(()=>{
    InitList()
},[])
  const handelClick = () => {
    // if()
    console.log(checkValue)
    if(checkValue=="red"){
      alert(`${message}`)
      return
    }
    axios.post(`http://127.0.0.1:3001/pages/123/submit`).then(res=>{
     alert("success")
    })
    .catch(err=>{
      alert("error")
    })
  };
  const handleSelect = (value)=>{
    SetCheckValue(value.target.value)
  }
  return (
    <div className="App">
      <div className="left-content">
        <div className="left-1">
        <img src={imageurl} style={{width:'10px'}}/>
        </div>
        <div className="left-2"></div>
      </div>
      <div className="right-content">
        <div className="top-1">
          {/* 111 */}
          {questionList.map(item=>{
            
           return <label key={item.id}>
              {item.problem.prompt}
              <br />
              <select name="" id="" onChange={handleSelect} value={checkValue}>
                {item.problem.data.map((initem=>{
                  return <option key={initem.id} value={initem.id}>{initem.id}</option>
                }))}
              </select>
           </label>
          })}
          <div className="arrow">
            <em />
            <span />
            <img src={helpLogo} alt="helpLogo" />
          </div>
        </div>
        <div className="top-2">
          <div className="btns">
            <img src={hint} alt="hint" />
            {/* <input type="text" value={inputContent} onChange={handleChangeInput} /> */}
            <div onClick={handelClick}>
              <img src={submit} alt="submit" />
            </div>

          </div>
          <div className="run-btn">
            <img src={run} alt="run" />
          </div>
        </div>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <button
          disabled={loading}
          type="button"
          onClick={() => getCoursesList()}
        >
          Get Courses
        </button>
        <p>{JSON.stringify(courses)}</p>
      </header> */}
    </div>
  );
}

export default App;
