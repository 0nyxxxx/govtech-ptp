"use strict";
var db = require("../db-connection");
class SymptomDB {
  // addBookmark(uid,rid,callback){
  //     var sql = "INSERT INTO mydb.bookmark (UserId,RestaurantId) VALUES (?,?)";
  //     db.query(sql,[uid,rid],callback)
  // }
  // updateBookmark(bm,uid,rid,callback){
  //     var sql = "UPDATE mydb.bookmark SET BookmarkTF = ? WHERE UserId = ? AND RestaurantId = ? ";
  //     db.query(sql,[bm,uid,rid],callback)
  // }
  // getUserBookmark(uid,callback){
  //     var sql= "SELECT * FROM mydb.bookmark WHERE UserId = ?";
  //     db.query(sql,[uid],callback)
  // }
  addSymptom(responseId,symptom, callback) {
    var sql = "INSERT INTO mydb.symptoms (ResponseId,Symptom) VALUES (?,?)";
    db.query(sql, [responseId,symptom], callback);
  }
  getSymptoms(callback){
    var sql = "SELECT * FROM mydb.symptoms";
    db.query(sql,callback);
  }
}
module.exports = SymptomDB;
