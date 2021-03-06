"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = new _pg.Pool();

var result = _dotenv["default"].config();

var dbSql = "CREATE DATABASE test";
var usersSql = "CREATE TABLE IF NOT EXISTS users (\n    id BIGSERIAL PRIMARY KEY NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    first_name VARCHAR(100) NOT NULL,\n    last_name VARCHAR(100) NOT NULL,\n    password VARCHAR(200) NOT NULL,\n    is_admin BOOLEAN DEFAULT false,\n    last_login TIMESTAMP,\n    token VARCHAR,\n    created_at TIMESTAMP\n);";
pool.query(usersSql).then(function (r) {
  console.log('users table created');
  pool.end();
})["catch"](function (e) {
  console.log('users table not created');
  pool.end();
});
var sqlBuses = "CREATE TABLE IF NOT EXISTS buses (\n    id BIGSERIAL PRIMARY KEY NOT NULL,\n    number_plate VARCHAR NOT NULL,\n    manufacturer VARCHAR NOT NULL,\n    model VARCHAR NOT NULL,\n    year VARCHAR NOT NULL,\n    capacity INTEGER NOT NULL,\n    created_at TIMESTAMP\n);";
pool.query(sqlBuses).then(function (r) {
  console.log('buses table created');
  pool.end();
})["catch"](function (e) {
  console.log('buses table not created');
  pool.end();
});
var tripsSql = "CREATE TYPE status_type AS ENUM('active','cancelled');\nCREATE TABLE IF NOT EXISTS trips (\n    id BIGSERIAL PRIMARY KEY NOT NULL,\n    bus_id INTEGER NOT NULL REFERENCES buses(id),\n    origin VARCHAR NOT NULL,\n    destination VARCHAR NOT NULL,\n    trip_date DATE NOT NULL,\n    fare FLOAT NOT NULL,\n    status status_type DEFAULT 'active',\n    created_on DATE\n);";
pool.query(tripsSql).then(function (r) {
  console.log('trips table created');
  pool.end();
})["catch"](function (e) {
  console.log('trips table not created');
  pool.end();
});
var sqlBooking = "CREATE TABLE IF NOT EXISTS bookings (\n    booking_id BIGSERIAL NOT NULL,\n    trip_id INTEGER NOT NULL REFERENCES trips(id),\n    user_id INTEGER NOT NULL REFERENCES users(id),\n    seat_number INTEGER NOT NULL,\n    created_on DATE,\n    PRIMARY KEY (booking_id, trip_id,user_id));";
pool.query(sqlBooking).then(function (r) {
  console.log('booking table created');
  pool.end();
})["catch"](function (e) {
  console.log('bookings table not created');
  pool.end();
});