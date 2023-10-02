import React, { useState } from "react";
import CheckBox from "../components/Checkbox";
import Radio from "../components/Radio";
import { sendResponse } from "../components/apiFunctions";
import Modal from "../components/Modal";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Input from "../components/Input";
const symptomCheckboxItems = [
  "Cough",
  "Smell/test impairment",
  "Fever",
  "Breathing difficulties",
  "Body aches",
  "Headaches",
  "Fatigue",
  "Sore throat",
  "Diarrhea",
  "Runny nose",
  "None of the above",
];
const closeContactRadioItems = ["Yes", "No"];
function Form() {
  const [temperatureValid, setTemperatureValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  function handleTemperatureChange() {
    let temperature = document.getElementById("tempInput").value;
    let isValid =
      !isNaN(temperature) &&
      temperature >= 36 &&
      temperature <= 40 &&
      temperature !== null;
    setTemperatureValid(isValid);
  }

  function handleNameChange() {
    let name = document.getElementById("nameInput").value;
    let isValid = /^[A-Za-zÀ-ÿ ]+$/.test(name.trim());
    setNameValid(isValid);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      temperatureValid &&
      nameValid &&
      selectedSymptoms.length > 0 &&
      selectedRadio !== null
    ) {
      const name = document.getElementById("nameInput").value;
      const temperature = document.getElementById("tempInput").value;
      const symptoms = selectedSymptoms;
      const closeContact = selectedRadio;
      sendResponse(name, temperature, symptoms, closeContact);
      //Reset form values
      document.getElementById("nameInput").value = "";
      document.getElementById("tempInput").value = "";
      //Reset states
      setNameValid(null);
      setTemperatureValid(null);
      setSelectedSymptoms([]);
      setSelectedRadio(null);
      //uncheck all checkboxes
      document
        .querySelectorAll("input[type='checkbox']:checked")
        .forEach((checkBox) => {
          checkBox.checked = false;
        });
      //undisables all disabled checkboxes
      document
        .querySelectorAll("input[type='checkbox']:disabled")
        .forEach((checkbox) => {
          checkbox.disabled = false;
        });
      //uncheck radio
      document.querySelector(
        'input[name="contactRadio"]:checked'
      ).checked = false;
      //show response sent modal
      $("#exampleModalCenter").modal("show");
    }
  }

  return (
    <>
      <div className="container-md bg-light text-dark p-3 mt-5 rounded">
        <h1>Health Declaration </h1>
        <form noValidate onSubmit={handleSubmit}>
          <Input
            valid={nameValid}
            onChange={handleNameChange}
            label={"Name"}
            invalidText={"Please enter a valid name."}
            type={"text"}
            id={"nameInput"}
          />
          <Input
            valid={temperatureValid}
            onChange={handleTemperatureChange}
            label={"Temperature"}
            invalidText={
              "Please provide a valid temperature between 36°C and 40°C."
            }
            type={"number"}
            id={"tempInput"}
          />
          <CheckBox
            items={symptomCheckboxItems}
            selectedCheckboxes={selectedSymptoms}
            setSelectedCheckboxes={setSelectedSymptoms}
            label={
              "Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?"
            }
            invalidText={"Please select at least 1 checkbox."}
            id={"symptomInputCheckbox"}
          />
          <Radio
            items={closeContactRadioItems}
            selectedRadio={selectedRadio}
            setSelectedRadio={setSelectedRadio}
            label={
              "Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?"
            }
            invalidText={"Please select at least 1 option."}
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
          >
            Submit
          </button>

          <Link
            to="/responses"
            className="btn btn-info text-white"
            style={{ backgroundColor: "#008080" }}
          >
            View Responses
          </Link>
        </form>
      </div>
      <Modal
        modalContent={"Response has been submitted!"}
        modalTitle={"Success"}
        modalClassName={"modal-dialog-centered"}
      />
    </>
  );
}
export { Form, symptomCheckboxItems, closeContactRadioItems };
