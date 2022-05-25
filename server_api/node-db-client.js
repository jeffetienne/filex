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

function addSimpleUser (role_id,email,resultCallback) {
    const connection = establishConnexion()
    connection.query("INSERT INTO public.table_user (role_id, email) VALUES("+role_id+",'"+email+"') RETURNING *;"
    , (error, result) => {
        if (error) {
            //throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function insertIntoQueu (client_id,branch_id,queue_number,resultCallback) {
    const connection = establishConnexion()
    connection.query("INSERT INTO public.queue (client_id, branch_id, insert_date, check_in_date, type_id, queue_number, arrived) VALUES("+client_id+", "+branch_id+", now(),null, 1, "+queue_number+", 0) RETURNING * ", (error, result) => {
        if (error) {
            throw error
        }
        console.log("dans le inserinto")
        resultCallback(result.rows)
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