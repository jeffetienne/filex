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

function getLastQueueNumber(resultCallback){
    const connection = establishConnexion()
    connection.query("select max(queue_number) as queuemax from queue where cast(insert_date as date)=cast(now() as date) and branch_id=1;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function queue getter')
        connection.end()
    })   
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

function getListQueue (branch_id,resultCallback) {
    const connection = establishConnexion()
    connection.query("select * from queue  where branch_id = "+ branch_id +" and cast(insert_date as date)=cast(now() as date) and arrived = 0", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}