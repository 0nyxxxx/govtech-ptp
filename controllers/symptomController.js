"use strict";
const SymptomsDB = require("../models/symptomsDB");

const symptomsDB = new SymptomsDB();

function addSymptom(request, respond) {
  let symptom = request.body.symptom;
  let responseId = request.body.responseId;
  symptomsDB.addSymptom(
    responseId,
    symptom,
    function (error, result) {
      if (error) {
        respond.json(error);
      } else {
        respond.json(result);
      }
    }
  );
}
function getSymptoms(request, respond) {
  symptomsDB.getSymptoms(function (error, result) {
    if (error) {
      respond.json(error);
    } else {
      respond.json(result);
    }
  });
}
module.exports = { addSymptom, getSymptoms };

