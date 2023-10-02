const express = require("express");
const cors = require('cors');

const responseController = require("./controllers/responseController")
const symptomController = require("./controllers/symptomController")
const app = express();

app.use(express.static("./public"));
app.use(cors());
app.use(express.json({ limit: "1000mb" }));
//post new response
app.route("/response").post(responseController.addResponse);
//get all responses
app.route("/responses").get(responseController.getResponses);
//post new symptom
app.route("/symptom").post(symptomController.addSymptom);
//get all symptoms
app.route("/symptoms").get(symptomController.getSymptoms);
app.listen(8080, "127.0.0.1");
console.log("web server running @ http://127.0.0.1:8080");
