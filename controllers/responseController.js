"use strict";
const ResponsesDB = require("../models/responsesDB");

const responsesDB = new ResponsesDB();

function addResponse(request, respond) {
  let name = request.body.name;
  let temperature = request.body.temperature;
  let closeContact = request.body.closeContact;
  let now = Date();
  responsesDB.addResponse(
    name,
    temperature,
    closeContact,
    now,
    function (error, result) {
      if (error) {
        respond.json(error);
      } else {
        respond.json(result);
      }
    }
  );
}
function getResponses(request, respond) {
  responsesDB.getResponses(function (error, result) {
    if (error) {
      respond.json(error);
    } else {
      respond.json(result);
    }
  });
}

module.exports = { addResponse,getResponses };
