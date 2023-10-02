"use strict";
var db = require("../db-connection");
class ResponseDB {
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
  addResponse(name,temperature,closeContact,now, callback) {
    var sql = "INSERT INTO mydb.responses (Name,Temperature,CloseContact,DateTimeSent) VALUES (?,?,?,?)";
    db.query(sql, [name,temperature,closeContact,now], callback);
  }
  getResponses(callback){
    var sql = "SELECT * FROM mydb.responses";
    db.query(sql,callback);
  }
}
module.exports = ResponseDB;
