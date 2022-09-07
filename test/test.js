// const express = require('express');
// const chai = require('chai');
// const request = require('supertest');


// const app = express();

// describe('POST create user', () => {
//     if('should create user in database', () => {
//         request(app)
//         .post('api/users/')
//         .send({
//             "name": "Joshi",
//             "email":  "dj@gmail.com",
//             "password": "pesto123"
//         })
//         .expect(201)
//         .then((res) => {
//             console.log(res)
//         })
//     });
// });


const request = require("supertest")("http://localhost:5000")
const expect = require("chai").expect;

var userId = null;
var userToken = null;
var email = "testUser21@gmail.com";
var password = "pesto123";
var name = "Test User";

describe("User Operations", function () {

  it("check if name is not provided", async function () {
    const response = await (await request.post("/api/users").send({
                    "email":  email,
                    "password": password
                }));
    expect(response.status).to.eql(400);
  });

  it("check if email is not provided", async function () {
    const response = await (await request.post("/api/users").send({
                    "name": name,
                    "password": password
                }));
    expect(response.status).to.eql(400);
  });
  
  it("check if password is not provided", async function () {
    const response = await (await request.post("/api/users").send({
                    "name": name,
                    "email":  email                
                }));
    expect(response.status).to.eql(400);
  });

  it("create a user", async function () {
        const response = await (await request.post("/api/users").send({
                        "name": name,
                        "email":  email,
                        "password": password
                    }));
        userId = response._body._id
        expect(response.status).to.eql(201);
      });

  it("check if user can login", async function () {
        const response = await (await request.post("/api/users/login").send({
                        "email":  email,
                        "password": password
                    }));
        console.log(response._body)
        userToken = response._body.token;
        expect(response.status).to.eql(200);
      });
    
 it("check if user can login with Wrong Credentials", async function () {
        const response = await (await request.post("/api/users/login").send({
                        "email":  email,
                        "password": password+"123"
                    }));
        expect(response.status).to.eql(400);
      });

  it("check if User Exists", async function () {
        const response = await (await request.post("/api/users").send({
                        "name": name,
                        "email":  email,
                        "password": password
                    }));
        expect(response.status).to.eql(400);
      });


    it("check if User does not Exists By Id", async function () {
        const response = await (await request.get("/api/users/123"));
        expect(response.status).to.eql(200);
      });      

  it("check if User Exists By Id", async function () {
        const response = await (await request.get("/api/users/"+userId));
        expect(response.status).to.eql(200);
      });

  it("check if User Deletes By Id", async function () {
      console.log(userId)
      console.log('Bearer '+userToken)

        const response = await (await request.delete("/api/users/"+userId).set({
            'Authorization':'Bearer '+userToken
        }))
        expect(response.status).to.eql(200);
      });

});


// const superTest = require('supertest');
// const chai = require('chai');
// const expect = chai.expect;

// const goalieServerURL = 'https://localhost:5000';
// const server = superTest(goalieServerURL);

// describe('Server Post API', () => {
    
//     it('Create Response',  async () => {
//         let response = await server
//                             .post('/api/users')
//                             .then(response => {
//                                 return response;
//                             });
//         expect(response.status, 'Status Successful').to.equal(201);
//         // expect(response.body.url, 'Url Contains').to.contains('https://random.dog/');
        
//     });
// });