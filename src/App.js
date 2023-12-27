import React, { useState } from "react";
import arrow from "./icon-arrow.png"
import './App.css';

function App() {

  let [dayInput, setDayInput] = useState("");
  let [monthInput, setMonthInput] = useState("");
  let [yearInput, setYearInput] = useState("");

  let inputP = document.querySelectorAll(".inputP");
  let inputArr = document.querySelectorAll("input");
  let errMessage = document.querySelectorAll(".error");
  let mainError = document.querySelector(".mainError")


  function handleDayChange(ev) {
    let { name, value } = ev.target
    removeError();
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    else if ((value.length < 2) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 2) {
      inputArr[1].focus();
    }
    setDayInput(value)
  }


  function handleMonthChange(ev) {
    let { name, value } = ev.target
    removeError();
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    else if ((value.length < 2) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 2) {
      inputArr[2].focus();
    }
    else if (value.length === 0) {
      inputArr[0].focus();
    }
    setMonthInput(value)
  }


  function handleYearChange(ev) {
    let { name, value } = ev.target
    removeError();
    if (value.length === 4) {
      calculate();
    }
    else if (value.length > 4) {
      value = value.slice(0, 4);
    }
    else if ((value.length < 4) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 0) {
      inputArr[1].focus()
    }
    else if (mainError.classList.contains("hidden") === false) {
      clearOutput()
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].blur();
      }
    }
    setYearInput(value)
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      calculate();
    }
  });


  function clearOutput() {
    setAgeOutput({
      years: "--",
      yearsSufText: "years",
      months: "--",
      monthsSufText: "months",
      days: "--",
      daysSufText: "days",
    })
  }

  function removeError() {
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].classList.remove("notFilled")
      inputP[i].classList.remove("pNotFilled")
      errMessage[i].classList.add("hidden")
      clearOutput();
    }
  }

  function validateInput() {
    for (let i = 0; i < inputArr.length; i++) {

      function wrongDate() {
        inputArr[i].classList.add("notFilled");
        inputP[i].classList.add("pNotFilled");
        mainError.classList.remove("hidden");
        inputArr[i].blur()
      }

      let currentYear = new Date().getFullYear();

      let x = inputArr[i].value;
      if (x === "") {
        inputArr[i].classList.add("notFilled");
        inputP[i].classList.add("pNotFilled");
        errMessage[i].classList.remove("hidden")
      }
      else if ((inputArr[0].value > 28) && (inputArr[1].value === 2)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
      }
      else if ((inputArr[0].value > 30) && (inputArr[1].value === 4||5||9||11)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
      }
      else if ((inputArr[0].value > 31) && (inputArr[1].value === 1||3||6||7||8||10||12)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
      }
      else if (inputArr[1].value > 12) {
        wrongDate();
        mainError.innerText = "Must be a valid month"
      }
      else if (inputArr[2].value > currentYear) {
        wrongDate()
        mainError.innerText = "Date cannot be in the future";
      }
      else if (inputArr[2].value < (currentYear - 1000)) {
        wrongDate()
        mainError.innerText = "That's not right"
      }

      else {
        let monthInput = inputArr[1];
        let dateInput = inputArr[0];
        let yearInput = inputArr[2];

        if (monthInput.value.length === 1) {
          monthInput.value = '0' + monthInput.value
        }

        if (dateInput.value.length === 1) {
          dateInput.value = '0' + dateInput.value
        }
        let dateString = monthInput.value + "-" + dateInput.value + "-" + yearInput.value;
        getAge(dateString);
      }
    }
  }

  let [ageOutput, setAgeOutput] = useState(
    {
      years: "--",
      yearsSufText: "years",
      months: "--",
      monthsSufText: "months",
      days: "--",
      daysSufText: "days",
    }
  )


  function calculate() {
    validateInput();
  }

  // Function to find the age from a given date input

  function getAge(dateString) {
    var now = new Date();

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5)
    );

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var yearString = "";
    var monthString = "";
    var dayString = "";


    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
    };

    if (age.years > 1) yearString = " years";
    else yearString = " year";
    if (age.months > 1) monthString = " months";
    else monthString = " month";
    if (age.days > 1) dayString = " days";
    else dayString = " day";

    setAgeOutput({
      years: age.years,
      yearsSufText: yearString,
      months: age.months,
      monthsSufText: monthString,
      days: age.days,
      daysSufText: dayString,
    })

  }

  return (
    <div className="root">
      <div className="card">
        <div className="top-bar">
          <label htmlFor="day"><p className="inputP">DAY</p>
            <input onChange={handleDayChange} autoFocus={true} onClick={removeError} type="number" name="day" id="day" placeholder="DD" value={dayInput} />
            <i><p className="error hidden mainError">This field is required</p></i>
          </label>
          <label htmlFor="month"><p className="inputP">MONTH</p>
            <input onChange={handleMonthChange} onClick={removeError} type="number" name="month" id="month" placeholder="MM" value={monthInput} />
            <i><p className="error hidden">This field is required</p></i>
          </label>
          <label htmlFor="year"><p className="inputP">YEAR</p>
            <input onChange={handleYearChange} onClick={removeError} type="number" name="year" id="year" placeholder="YYYY" value={yearInput} />
            <i><p className="error hidden">This field is required</p></i>
          </label>
        </div>
        <div className="arrow-block">
          <div className="hr"></div>
          <img onClick={calculate} src={arrow} alt="arrow-icon" className="arrow" id="arrow" />
        </div>
        <div className='bottom-bar'>
          <div className='years'>
            <p><i id="yearsOutput"><span id="yearSpan">{ageOutput.years}</span>{ageOutput.yearsSufText}</i></p>
          </div>
          <div className='months'>
            <p><i id="monthsOutput"><span id="monthSpan">{ageOutput.months}</span>{ageOutput.monthsSufText}</i></p>
          </div>
          <div className='days'>
            <p><i id="daysOutput"><span id="daySpan">{ageOutput.days}</span>{ageOutput.daysSufText}</i></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
