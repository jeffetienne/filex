'use strict'

const express = require('express')
// const dbconnexion = require('./src/server/node-pg')
const app = express()
const dbconnexion = require('../server_api/node-db')
const dbconnexionqueue = require('../server_api/node-db-queue')

// parse application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

// app.use(express.urlencoded({ extended: true }))

// CORS for development

// https://enable-cors.org/server_expressjs.html

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')

    response.header('Access-Control-Allow-Credentials', 'true')

    next()
})

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
// const CONTENT_TYPE_HTML = 'text/html'


app.get('/users', (request, response)=>{
    response.writeHead(HTTP_OK, { 'Content-Type': JSON })
    dbconnexion.getAllUsers((result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result
        }
        response.end(JSON.stringify(jsonresp))
    })
})
app.get('/users/role/:role_id', (request, response)=>{
    response.writeHead(HTTP_OK, { 'Content-Type': JSON })
    dbconnexion.getUsersByRole(request.params.role_id,(result) => {
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
/*app.post('/user', (request, response)=>{
    response.writeHead(HTTP_OK, { 'Content-Type': JSON })
    dbconnexion.createUser(request.body.fname,request.body.lname,request.body.phone,request.body.birthdate,request.body.pwd,request.body.registrationdate,request.body.subscription_id,request.body.branch_id,request.body.role_id,request.body.email),(result) => {
        let jsonresp = {}
        jsonresp.state = 400
        jsonresp.lentght = result.length
        //jsonresp.users = result[0].user_id
        response.end(JSON.stringify(jsonresp))
    }
})*/

app.get('/employees/:company_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getEmployeesByCompanyId(request.params.company_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user = result   
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/employees/queue/:queue_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getEmployeesByQueueId(request.params.queue_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user = result   
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/user/employee', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.loginuser(request.body.email,request.body.pwd, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user = result[0]   
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/user/client', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    let jsonresp = {}
    console.log("email "+request.body.email)
    console.log("queue_id "+request.body.queue_id)
    console.log(Object.keys(request.body)[0])
    
        dbconnexion.getuserbyemail(request.body.email, (resultcheck) =>{
            jsonresp.state = 500 
            if(resultcheck.length > 0){
                dbconnexion.getUserQueueByUserId(resultcheck[0].user_id,request.body.queue_id,(queueresult) => {
                    if(queueresult.length > 0){
                        jsonresp.state = 500  
                        jsonresp.message = "user already in the queue"
                        jsonresp.user_queue = queueresult[0]
                        response.end(JSON.stringify(jsonresp))
                    }else{
                        dbconnexion.insertIntoQueu(resultcheck[0].user_id,parseInt(request.body.queue_id,10),(result) =>{
                            console.log("insertion file")
                            jsonresp.state = 200  
                            jsonresp.user_queues = result[0]
                            console.log("a la fin")        
                            response.end(JSON.stringify(jsonresp))                   
                        }) 
                    }
                })
            }else{
                dbconnexion.addSimpleUser(null,null,request.body.email,(resultadd) =>{
                    console.log("dans l ajout")
                    //jsonresp.userid = resultadd[0].user_id
                    dbconnexion.getUserQueueByUserId(resultadd[0].user_id,request.body.queue_id,(queueresult) => {
                        if(queueresult.length > 0){
                            jsonresp.state = 500  
                            jsonresp.message = "user already in the queue"
                            jsonresp.user_queue = queueresult[0]
                            response.end(JSON.stringify(jsonresp))
                        }else{
                            dbconnexion.insertIntoQueu(resultadd[0].user_id,parseInt(request.body.queue_id,10),(result) =>{
                                console.log("insertion file")
                                jsonresp.state = 200  
                                jsonresp.user_queues = result[0]
                                console.log("a la fin")        
                                response.end(JSON.stringify(jsonresp))                   
                            }) 
                        }
                    })
                })  
            }
        })

})

/*app.post('/user/client', function (request,response){
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    let jsonresp = {}
    dbconnexion.getuserbyemail(request.body.email,(result) =>{
        jsonresp.user = result[0]
        if(result.length == 0){
            dbconnexion.addSimpleUser(null,null,request.body.email,(resultadd) =>{
                jsonresp.user = resultadd
                jsonresp.us
            }) 
        }   
    })
    dbconnexion.getLastQueueNumber((resultqueue) => {
        dbconnexion.insertIntoQueu(jsonresp.userid,request.body.branch_id,(resultqueue[0].queuemax)+1,(result) =>{
            lastinfo = result[0]
            jsonresp.test = result[0]
            console.log("a la fin")
        }) 
        jsonresp.test = lastinfo
    })   
    jsonresp.queue = lastinfo
}*/

/*app.post('/getqueuelist', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getQueuByDate(request.body.employeeid,request.body.date, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result 
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})*/

/*app.post('/currentqueu', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getQueuByDate(request.body.employeeid,request.body.date, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.users = result 
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})*/

app.get('/user/:id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getUserById(request.params.id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user = result 
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/users/:role_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getUsersByRole(request.params.role_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user = result 
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.delete('/user/:id', function (request,response) {
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

app.put('/user', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.updateUser(request.body.user_id,request.body.first_name,request.body.last_name,request.body.phone,request.body.pwd,request.body.email, (result) =>{
        let jsonresp = {}
        jsonresp.user = result
        if(result.length > 0){
            jsonresp.state = 200 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/user', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    let jsonresp = {}

        dbconnexion.getuserbyemail(request.body.email,(result) =>{         
            if(result.length > 0){
                jsonresp.user = result[0]
                jsonresp.message = "user existant"
                jsonresp.state = 200 
            }else{
                dbconnexion.createUser(request.body.first_name,request.body.last_name,request.body.phone,request.body.pwd,request.body.subscription_id,request.body.queue_id,request.body.role_id,request.body.email, (resultuser) =>{
                    console.log(request.body)
                    if(resultuser.length > 0){
                        jsonresp.state = 200 
                        jsonresp.user = resultuser[0]
                    }else{
                        jsonresp.state = 500 
                    }
                    response.end(JSON.stringify(jsonresp))
                })
            }
            response.end(JSON.stringify(jsonresp))
        })
})

app.get('/company/:company_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getCompanyById(request.params.company_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/companies/:admin_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getCompaniesByPatron(request.params.admin_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/companies', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getAllCompanies((result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/company', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.creatCompany(request.body.company_name,request.body.admin_id,request.body.field,request.body.email,request.body.phone, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.put('/company', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.updateCompany(request.body.company_id,request.body.company_name,request.body.admin_id,request.body.field,request.body.email,request.body.phone, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
        }else{
            jsonresp.state = 500 
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.delete('/company/:company_id', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.deleteCompany(request.params.company_id, (result) =>{
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200
            jsonresp.company = result 
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

app.post('/insertqueue', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.insertIntoQueu(request.body.client_id,request.body.branch_id,request.body.queue_nbr,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.queue = result[0]
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})
app.get('/user_queue/:user_queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getListQueue(request.params.user_queue_id,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.user_queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

//*********end point queue*********** */
app.get('/queues/:company_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getByCompany(request.params.company_id,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})
app.get('/queues', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getAllQueues((result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})
app.get('/queue/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getById(request.params.queue_id,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.post('/queue', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    // params :civic_number, apt, street, postal_code, city, province, country, latitude, longitude
    let jsonresp = {}
    dbconnexionqueue.addQueue(
        request.body.civic_number,request.body.apt,
        request.body.street,request.body.postal_code,request.body.city,request.body.province,request.body.country,
        request.body.latitude,request.body.longitude,
        request.body.queue_name,request.body.capacity,request.body.company_id,
        request.body.email,request.body.phone,request.body.avg_waiting_time,
        request.body.avg_processing_time,request.body.lundi_ouverture,
        request.body.lundi_fermeture,request.body.mardi_ouverture,request.body.mardi_fermeture,
        request.body.mercredi_ouverture,request.body.mercredi_fermeture,request.body.jeudi_ouverture,
        request.body.jeudi_fermeture,request.body.vendredi_ouverture,request.body.vendredi_fermeture,
        request.body.samedi_ouverture,request.body.samedi_fermeture,request.body.dimanche_ouverture,request.body.dimanche_ouverture
        ,(result) => {
            let jsonresp = {}
            if(result.length > 0){
                jsonresp.state = 200 
                jsonresp.queue = result
            }else{
                jsonresp.state = 500  
            }
            response.end(JSON.stringify(jsonresp))
        })
  

})
app.put('/queue', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    // params :civic_number, apt, street, postal_code, city, province, country, latitude, longitude
    let jsonresp = {}
    dbconnexionqueue.updateQueue(request.body.queue_id,
        request.body.civic_number,request.body.apt,
        request.body.street,request.body.postal_code,request.body.city,request.body.province,request.body.country,
        request.body.latitude,request.body.longitude,
        request.body.queue_name,request.body.capacity,request.body.company_id,
        request.body.email,request.body.phone,request.body.avg_waiting_time,
        request.body.avg_processing_time,request.body.lundi_ouverture,
        request.body.lundi_fermeture,request.body.mardi_ouverture,request.body.mardi_fermeture,
        request.body.mercredi_ouverture,request.body.mercredi_fermeture,request.body.jeudi_ouverture,
        request.body.jeudi_fermeture,request.body.vendredi_ouverture,request.body.vendredi_fermeture,
        request.body.samedi_ouverture,request.body.samedi_fermeture,request.body.dimanche_ouverture,request.body.dimanche_ouverture
        ,(result) => {
            let jsonresp = {}
            if(result.length > 0){
                jsonresp.state = 200 
                jsonresp.queue = result
            }else{
                jsonresp.state = 500  
            }
            response.end(JSON.stringify(jsonresp))
        })
  

})

app.delete('/queue/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.deleteQueue(request.params.queue_id,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.queue = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/user_queues_avg/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getavgqueue(request.params.queue_id,(result) => {
        let jsonresp = {}
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.user_queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

//********* Enpoint User Queue *************/
/*app.post('/user_queue', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    // params :civic_number, apt, street, postal_code, city, province, country, latitude, longitude
    let jsonresp = {}
    dbconnexionqueue.addUserQueue(request.body, (result) => {
            let jsonresp = {}
            if(result.length > 0){
                jsonresp.state = 200 
                jsonresp.user_queue = result
            }else{
                jsonresp.state = 500  
            }
            response.end(JSON.stringify(jsonresp))
        })
})*/
/*app.get('/user_queue/:queue_id', function (request, response) {
=======*/
app.put('/user_queue', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.updateUserQueue(request.body.queue_id, (result) => {
            let jsonresp = {}
            console.log("in put")
            if(result.length > 0){
                jsonresp.state = 200 
                jsonresp.user_queue = result[0]
            }else{
                jsonresp.state = 500  
            }
            response.end(JSON.stringify(jsonresp))
        })
})

app.delete('/user_queue', function (request,response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.deleteUserQueue(request.body.user_queue_id, (result) =>{
        let jsonresp = {}
          if(result.length > 0){
            jsonresp.state = 200
            jsonresp.user_queues = result[0]
        }else{
            jsonresp.state = 500
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/user_queues/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getUserQueueByQueueId(request.params.queue_id, (result) => {
        let jsonresp = {}   
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.user_queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.get('/today_user_queues/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexionqueue.getTodayUserQueueByQueueId(request.params.queue_id, (result) => {
        let jsonresp = {}   
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.user_queues = result
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})


app.get('/next_user_queue/:queue_id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.getNextClientQueue(request.params.queue_id, (result) => {
        let jsonresp = {}   
        if(result.length > 0){
            jsonresp.state = 200 
            jsonresp.user_queue = result[0]
        }else{
            jsonresp.state = 500  
        }
        response.end(JSON.stringify(jsonresp))
    })
})

app.listen(PORT, function () {
    //console.log('Server listening on: 192.168.60.57:%s', PORT)
    console.log('Server listening on: http://localhost:%s', PORT)
})
