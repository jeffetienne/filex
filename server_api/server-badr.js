'use strict'

const express = require('express')
const { read } = require('fs')
const { request } = require('http')
const { json } = require('stream/consumers')
const dbconnexion = require('../../node-db')
const app = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

app.use(express.static('dist'))

const PORT = 65123
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
app.get('/toto',(req, resp)=>{
    resp.end('hello world')
})
 app.get('/testuser', (request, response)=>{
    response.writeHead(HTTP_OK, { 'Content-Type': JSON })
    dbconnexion.testuser((result) => {
        let jsonresp = {}
        jsonresp.state = 200
        jsonresp.lentght = result.length
        jsonresp.users = result
        response.end(JSON.stringify(jsonresp))
    })
})
 /*dbconnexion.createAdmin(function (result) {
    response.end(JSON.stringify(result))
})*/


app.post('/user', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.loginuser(request.body.login,request.body.password, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result   
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/currentqueu', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getQueuByDate(request.body.employeeid,request.body.date, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result 
        }else{
            jsonresp.state = result[0].id
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.delete('/deleteuser/:id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.deleteuser(request.params.id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result 
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/adduser', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.createUser(request.body.id,request.body.fname,request.body.lname,request.body.phone,request.body.birthdate,request.body.pwd,request.body.registration,request.body.subscription,request.body.branch,request.body.role,request.body.email, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/', (req, resp)=>{
    resp.end('hello world')
})
app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})