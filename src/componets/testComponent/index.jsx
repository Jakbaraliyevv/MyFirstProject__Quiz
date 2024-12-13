import React, { useEffect, useState } from "react";
import "./testComponent.scss";
// IMage
import finish from "../img/finisheroro.avif";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { ClockCircleOutlined, SmileOutlined } from "@ant-design/icons";
import Loading from "../generic/loading";
function TestComponents1() {
  //Use Hooklar
  const [countArray, setCountArray] = useState(0);
  const location = useLocation();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const [show, setShow] = useState(true);
  //   const [time, setTime] = useState(0); time uchun
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeTaken, setTimeTaken] = useState(0);
  let timerRef = null;

  // Data malumotlari
  const CplusPlus = location.state?.choiseSelect || [];

  const loading1 = location.state?.loading;

  console.log(loading1, "salom");

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Time uchun yangi

  useEffect(() => {
    if (show) {
      // Taymerni o'rnatish
      timerRef = setTimeout(() => {
        countSubmit(false); // Vaqt tugadi: xato deb hisoblash
      }, 30000);

      // Har bir sekundda vaqtni yangilash
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // Tozalash
      return () => {
        clearTimeout(timerRef);
        clearInterval(interval);
      };
    }
  }, [countArray, show]);

  //   array leni uchun
  const countSubmit = (isCorrect) => {
    const currentQuestionTime = 30 - timeLeft; // Ushbu savolga qancha vaqt sarflandi
    setTimeTaken((prev) => prev + currentQuestionTime); // Umumiy vaqtni yangilash
    clearTimeout(timerRef); // Taymerni tozalash
    setTimeLeft(30); // Vaqtni qayta o'rnatish

    const countLen = countArray + 1;

    if (isCorrect) {
      setCorrect((prev) => prev + 1);
      console.log(correct);
    } else {
      setInCorrect((prev) => prev + 1);
      console.log(incorrect);
    }

    if (countLen < CplusPlus.length) {
      setCountArray(countLen);
    } else {
      setShow(false);
    }
  };

  const handleRestart = () => {
    setCountArray(0); // Savollar boshidan boshlanadi
    setCorrect(0); // To'g'ri javoblar boshqatdan
    setInCorrect(0); // Noto'g'ri javoblar boshqatdan
    setShow(true); // Test interfeysi qayta ko'rinadi
    // setTime(0); time uchun
    setTimeLeft(30);
    setTimeTaken(0); // Sarflangan vaqtni qayta boshlash
  };

  return (
    <>
      {loading1 ? (
        <Loading />
      ) : show ? (
        <section className="test">
          <div className="container">
            <div className="test__logo">
              <img src={CplusPlus[0]?.qiuzLogo} alt="" />
            </div>
            <div className="test__text">
              <div className="test__top">
                <div className="time1212">
                  <h2>
                    Question <span>{countArray + 1}</span>
                    <span>/{CplusPlus.length}</span>
                  </h2>
                  <p>{formatTime(timeLeft)}</p>
                  {/* <p>{formatTime(time)}</p> */}
                </div>
                <p>{CplusPlus[countArray]?.questionText}</p>
              </div>
              <div className="test__bottom">
                {CplusPlus[countArray]?.answerOptions.map((value, index) => (
                  <Button
                    key={index}
                    onClick={() => countSubmit(value.isCorrect)}
                    className="testButton"
                  >
                    <h3>{value.variant}</h3> <p>{value.answerText}</p>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="resualt">
          <div className="container">
            <div className="resCard1">
              <div className="resCard">
                <div className="resTime">
                  {/* <p>{formatTime(time)}</p> time uchu*/}
                  <p>{formatTime(timeTaken)}</p>
                  <div className="timeIcon">
                    <p>
                      <ClockCircleOutlined />
                    </p>
                    <p>Time Token</p>
                  </div>
                </div>

                <h2>
                  Bir oz ko'proq mashq qilsangiz, muvaffaqiyatga erishasiz
                  <SmileOutlined className="isonSmile" />
                </h2>

                <div className="ballCard1">
                  <div className="ballCard">
                    <div>
                      <button className="correct">{correct}</button>
                      <h4 className="balText1">Correct</h4>
                    </div>
                    <div>
                      <button className="incorrect">{incorrect}</button>
                      <h4 className="balText">Wrong</h4>
                    </div>
                  </div>
                </div>

                <div className="restart1">
                  <Button onClick={handleRestart} className="restart">
                    Restart
                  </Button>

                  <img src={finish} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default TestComponents1;
