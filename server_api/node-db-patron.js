'use strict'

const { Client } = require('pg')

function establishConnexion () {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'filexBd',
        user: 'postgres',
        password: 'postgres'
    })
    client.connect()
    return client
}

function loginuser (login, password,resultCallback) {
    const connection = establishConnexion()
    connection.query("SELECT * FROM table_user WHERE  email = '" + login + "' AND pwd = '"+ password +"'", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function login')
        connection.end()
    })
}

function createUser (first_name,last_name,phone,date_of_birth,pwd,registration_date,subscription_id,branch_id,role_id,email,resultCallback) {
    const connection = establishConnexion()
    connection.query("INSERT INTO table_user (first_name, last_name, phone, date_of_birth, pwd, registration_date, subscription_id, branch_id, role_id, email) VALUES("+ first_name +","+ last_name +","+ phone +",NOW(),"+ pwd +",NOW(),"+subscription_id+","+branch_id+","+role_id+","+email+");"
    , (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}