import React, { useState } from "react";
import "./quiz.scss";
// IMglar
import quiz from "../img/logo.svg";
import c from "../img/c1.svg";
import javaIMg from "../img/java.svg";
import jsImg from "../img/js.jpg";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
function QuizComponents() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const { data, loading } = useAxios(url);
  const [cplus, java, js] = data;
  const navigateSubmit = (testName) => {
    let choiseSelect = [];
    setUrl(testName);

    if (data && data.length > 0) {
      switch (testName) {
        case "cplus":
          choiseSelect = cplus.cplus;
          break;
        case "java":
          choiseSelect = java.java;
          break;
        case "js":
          choiseSelect = js.js;
          break;
      }
    }

    navigate("/test", { state: { choiseSelect, loading } });
  };

  return (
    <section className="quiz">
      <div className="container">
        <div className="quizImg">
          <img src={quiz} alt="" />
        </div>
        <div onClick={() => navigateSubmit("cplus")} className="fan">
          <img src={c} alt="" />
          <p>C ++</p>
        </div>
        <div onClick={() => navigateSubmit("java")} className="fan">
          <img src={javaIMg} alt="" />
          <p>Java</p>
        </div>
        <div onClick={() => navigateSubmit("js")} className="fan">
          <img src={jsImg} alt="" />
          <p>JavaScript</p>
        </div>
      </div>
    </section>
  );
}

export default QuizComponents;
