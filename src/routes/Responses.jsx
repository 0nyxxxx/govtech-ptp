import { getResponses, getSymptoms } from "../components/apiFunctions";
import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Input from "../components/Input";
import XLSX from "xlsx";
import Modal from "../components/Modal";
import CheckBox from "../components/Checkbox";
import { symptomCheckboxItems, closeContactRadioItems } from "./Form";
class Response {
  constructor(Id, Name, Temperature, CloseContact, Symptoms, DateTimeSent) {
    this.Id = Id;
    this.Name = Name;
    this.Temperature = Temperature;
    this.CloseContact = CloseContact;
    this.Symptoms = Symptoms;
    this.DateTimeSent = DateTimeSent;
  }
}
function exportToExcel(data) {
  // Get the current date
  const currentDate = new Date();

  // Extract date components (day, month, year)
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();

  // Format the date as DDMMYY (e.g., 290923 for September 29, 2023)
  const formattedDate = `${day.toString().padStart(2, "0")}${month
    .toString()
    .padStart(2, "0")}${year.toString().slice(-2)}`;

  // Define the filename with the date stamp
  const filename = `data_export_${formattedDate}`;

  console.log(filename);

  const dataToExport = data.map((item) => {
    return {
      Id: item.Id,
      Name: item.Name,
      Temperature: item.Temperature,
      CloseContact: item.CloseContact,
      Symptoms: Array.isArray(item.Symptoms)
        ? item.Symptoms.join(", ")
        : item.Symptoms,
      DateTimeSent: item.DateTimeSent,
    };
  });
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function Responses() {
  const [responses, setResponses] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [responsesArr, setResponsesArr] = useState([]);
  const [selectedSymptomFilters, setSelectedSymptomFilters] = useState([]);
  const [selectedCloseContactFilters, setSelectedCloseContactFilters] =
    useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [temperatureFilter, setTemperatureFilter] = useState([[], []]);
  useEffect(() => {
    async function fetchResponses() {
      try {
        const fetchedResponses = await getResponses();
        setResponses(fetchedResponses);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    }
    fetchResponses();
  }, []);

  useEffect(() => {
    async function fetchSymptoms() {
      try {
        const fetchedSymptoms = await getSymptoms();
        setSymptoms(fetchedSymptoms);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    }
    fetchSymptoms();
  }, []);

  function handleSearchInput() {
    if (responsesArr.length > 0) {
      let query = document.getElementById("searchInput").value;
      let queryResponsesArr = [];
      console.log(query);
      if (query.trim() !== null && query.trim() !== "") {
        responsesArr.forEach((response) => {
          response.forEach((r) => {
            console.log(r);
            if (r.Name.match(query)) {
              queryResponsesArr.push(r);
            }
          });
        });
        //reset pageIndex to 0 before responseArr state is changed
        setPageIndex(0);
        setResponsesArr(Pagification(queryResponsesArr));
      } else {
        setResponsesArr([]);
      }
    }
  }

  function MapAllResponses({
    symptomFilter,
    closeContactFilter,
    temperatureFilter,
  }) {
    let arr = []; // stores multiple Response
    if (
      responsesArr.length == 0 &&
      responses.length > 0 &&
      symptoms.length > 0
    ) {
      responses.forEach((response) => {
        let sympArr = [];
        symptoms.forEach((symptom) => {
          if (symptom.ResponseId == response.ResponseId) {
            sympArr.push(symptom.Symptom);
          }
        });
        let newResponse = new Response(
          response.ResponseId,
          response.Name,
          response.Temperature,
          response.CloseContact,
          sympArr,
          response.DateTimeSent
        );
        arr.push(newResponse);
        //!selectedFilters.length> 0  ? arr.push(newResponse) : newResponse.Symptoms.some((value) => selectedFilters.includes(value)) ? arr.push(newResponse) : ""
      });
      if (
        !symptomFilter.length == 0 ||
        !closeContactFilter.length == 0 ||
        !temperatureFilter.every((subArray) => subArray.length === 0)
      ) {
        if (
          // Temperature filter check if either Minimum temperature OR Maximum temperature has been selected for filter
          temperatureFilter[0].length > 0 ||
          temperatureFilter[1].length > 0
        ) {
          arr = arr.filter((response) => {
            let maxTemp = temperatureFilter[1];
            let minTemp = temperatureFilter[0];
            let resTemp = parseFloat(response.Temperature);
            if (minTemp.length > 0 && maxTemp.length > 0) {
              return resTemp >= minTemp && resTemp <= maxTemp ? true : false;
            } else if (minTemp.length > 0) {
              return resTemp >= minTemp ? true : false;
            } else if (maxTemp.length > 0) {
              return resTemp <= maxTemp ? true : false;
            }
          });
        }
        if (selectedSymptomFilters.length > 0) {
          // Symptom filter - if there are selected symptoms, filter through each response to check for matching Selected Symptoms and returns true
          arr = arr.filter((response) => {
            if (
              response.Symptoms.some((value) => symptomFilter.includes(value))
            ) {
              return true;
            }
          });
        }
        if (selectedCloseContactFilters.length > 0) {
          // Close contact filter
          arr = arr.filter((response) => {
            if (closeContactFilter.includes(response.CloseContact)) {
              return true;
            }
          });
        }
      }
      setResponsesArr(Pagification(arr));
    }
  }

  function Pagification(array1) {
    let count = 0;
    let pagificationArr = [];
    let tempArr = [];
    for (let i = 0; i < array1.length; i++) {
      if (count > 4) {
        pagificationArr.push(tempArr);
        count = 0;
        tempArr = [];
      }
      tempArr.push(array1[i]);
      count++;
    }
    if (tempArr.length > 0) {
      pagificationArr.push(tempArr);
    }
    console.log(pagificationArr);
    return pagificationArr;
  }

  MapAllResponses({
    symptomFilter: selectedSymptomFilters,
    closeContactFilter: selectedCloseContactFilters,
    temperatureFilter: temperatureFilter,
  });

  return (
    <>
      <div
        className="container bg-light text-dark p-3 mt-5 rounded"
        style={{ height: "705px" }}
      >
        <h1>Responses</h1>
        <Input // Search input
          id={"searchInput"}
          onChange={handleSearchInput}
          type={"text"}
          hintText={"Search"}
          valid={true}
        />
        <button // Export data to excel (xlsx)
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={() => {
            exportToExcel([].concat(...responsesArr), "test1");
          }}
        >
          Export Data
        </button>

        <button // Filter button
          type="submit"
          className={`btn ${
            appliedFilters.length > 0 ? "btn-danger " : "btn-warning "
          }`}
          style={{ marginRight: "10px" }}
          onClick={() => {
            $("#exampleModalCenter").modal("show");
          }}
        >
          Filter
        </button>

        {!responsesArr.length > 0 ? ( // Responses table
          <div className="d-flex justify-content-center ">
            <div className="column">
              <div
                className="spinner-border"
                role="status"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
              ></div>

              <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                Loading...
              </div>
            </div>
          </div>
        ) : (
          <Table data={responsesArr[pageIndex]} />
        )}

        <div className="d-flex justify-content-center">
          <button // Previous page button
            type="button"
            className="btn btn-success"
            onClick={() => {
              pageIndex !== 0
                ? setPageIndex(pageIndex - 1)
                : console.log("cant go beyond 0");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>

          <input // Page input
            id={"pageIndexInput"}
            type="text"
            placeholder={`${pageIndex + 1}`}
            style={{
              textAlign: "center",
              width: "3%",
              marginLeft: 10,
              marginRight: 5,
            }}
            onChange={(event) => {
              let inputVal = event.target.value - 1;
              console.log(inputVal);
              inputVal >= 0 && inputVal <= responsesArr.length - 1
                ? setPageIndex(inputVal)
                : console.log("invalid value");
              document.getElementById("pageIndexInput").value = "";
            }}
          />
          <input // Maximum page display
            type="text"
            value={`/ ${responsesArr.length > 0 ? responsesArr.length : "?"}`}
            disabled
            style={{ textAlign: "center", width: "3%", marginRight: 10 }}
            readOnly
          />
          <button // Next page button
            type="button"
            className="btn btn-success"
            onClick={() => {
              pageIndex < responsesArr.length - 1
                ? setPageIndex(pageIndex + 1)
                : console.log("cant go beyond 3");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
        </div>
        {/*Responses count */}
        <div
          className="d-flex justify-content-center mt-2"
          style={{ fontWeight: 500, fontSize: "1.25rem" }}
        >
          {`${responsesArr.reduce(
            (total, subArray) => total + subArray.length,
            0
          )} Responses`}
        </div>
      </div>
      <Modal
        modalClassName={"modal-dialog modal-lg"}
        modalTitle={"Filter"}
        modalContent={
          <div>
            <CheckBox
              label={"Symptoms"}
              items={symptomCheckboxItems}
              selectedCheckboxes={selectedSymptomFilters}
              setSelectedCheckboxes={setSelectedSymptomFilters}
              checkboxClassName={"form-check-inline "}
              id={"symptomFilterCheckbox"}
            />

            <CheckBox
              label={"Close Contact"}
              items={closeContactRadioItems}
              selectedCheckboxes={selectedCloseContactFilters}
              setSelectedCheckboxes={setSelectedCloseContactFilters}
              checkboxClassName={"form-check-inline "}
              id={"closeContactFilterCheckbox"}
            />

            <label htmlFor="tempFilter" className="form-label">
              Temperature (°C)
            </label>

            <div>
              <input
                className="tempFilterMin"
                type="text"
                placeholder={
                  !temperatureFilter[0].length > 0 ? 36 : temperatureFilter[0]
                }
                style={{
                  textAlign: "center",
                  width: "5.5%",
                  marginLeft: 10,
                  marginRight: 5,
                }}
              />
              <input
                className="tempFilterMax"
                type="text"
                placeholder={
                  !temperatureFilter[1].length > 0 ? 40 : temperatureFilter[1]
                }
                style={{
                  textAlign: "center",
                  width: "5.5%",
                  marginLeft: 10,
                  marginRight: 5,
                }}
              />
            </div>
          </div>
        }
        footer={
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              //reset pageIndex everytime filter is applied before responsesArr state is changed
              setPageIndex(0);
              setResponsesArr([]);
              let maxTemp = document.querySelector(
                "input[type='text'][class='tempFilterMax']"
              ).value;
              let minTemp = document.querySelector(
                "input[type='text'][class='tempFilterMin']"
              ).value;
              const trimmedMinTemp = minTemp.trim();
              const trimmedMaxTemp = maxTemp.trim();
              const minArray = trimmedMinTemp !== "" ? [trimmedMinTemp] : [];
              const maxArray = trimmedMaxTemp !== "" ? [trimmedMaxTemp] : [];
              setTemperatureFilter([minArray, maxArray]);

              selectedSymptomFilters.length > 0 &&
              selectedCloseContactFilters.length > 0 &&
              !temperatureFilter.every((subArray) => subArray.length === 0)
                ? setAppliedFilters([
                    selectedSymptomFilters,
                    selectedCloseContactFilters,
                    temperatureFilter,
                  ])
                : selectedSymptomFilters.length > 0
                ? setAppliedFilters([selectedSymptomFilters])
                : selectedCloseContactFilters.length > 0
                ? setAppliedFilters([selectedCloseContactFilters])
                : setAppliedFilters([]);
            }}
          >
            Apply
          </button>
        }
      />
    </>
  );
}
export default Responses;
