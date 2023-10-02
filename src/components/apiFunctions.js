function sendResponse(name, temperature, symptoms, closeContact) {
  console.log(name);
  console.log(temperature);
  console.log(closeContact);
  console.log(symptoms);
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:8080/response", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    console.log("Response Sent");
    //get responseId from the responseText's insertId
    let response = JSON.parse(request.responseText);
    let responseId = response["insertId"];
    sendSymptom(symptoms, responseId);
  };
  let payload = {
    name: name,
    temperature: temperature,
    closeContact: closeContact,
  };
  request.send(JSON.stringify(payload));
}
//function to add symptom with responseId to symptoms table in db for each symptom checked by user
function sendSymptom(symptoms, responseId) {
  symptoms.forEach((symptom) => {
    let request2 = new XMLHttpRequest();
    request2.open("POST", "http://127.0.0.1:8080/symptom", true);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
      console.log("Symptom Sent");
    };
    let payload = { responseId: responseId, symptom: symptom };
    request2.send(JSON.stringify(payload));
  });
}
//fetch responses data from db
function getResponses() {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:8080/responses", true);
    request.onload = function () {
      let response = JSON.parse(request.responseText);
      console.log(response);
      resolve(response);
    };
    request.send();
  });
}
//fetch symptoms data from db
function getSymptoms() {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:8080/symptoms", true);
    request.onload = function () {
      let response = JSON.parse(request.responseText);
      console.log(response);
      resolve(response);
    };
    request.send();
  });
}





export { sendResponse, getResponses,getSymptoms};
