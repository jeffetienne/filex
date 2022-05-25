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
    connection.query("select max(user_queue_number) as queuemax from user_queue where cast(insert_date as date)=cast(now() as date) and queue_id=1;", (error, result) => {
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
    const sql = "SELECT user_id , first_name , last_name , phone , date_of_birth , registration_date , queue_id , role_id , email FROM table_user WHERE  email = $1 AND pwd = $2";
    const values = [login,password];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            resultCallback(res.rows)
            connection.end()
          });         
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function testloginuser (login, password,resultCallback) {
    const connection = establishConnexion()
    const sql = "SELECT user_id , first_name , last_name , phone , date_of_birth , registration_date , queue_id , role_id , email FROM table_user WHERE  email = $1 AND pwd = $2";
    const values = [login,password];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            resultCallback(res.rows)
            connection.end()
          });       
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}


function getAllUsers (resultCallback) {
    const connection = establishConnexion()
    connection.query('SELECT * FROM table_user', (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function')
        connection.end()
    })
}

function getuserbyemail (email, resultCallback) {
    const connection = establishConnexion()
    const sql = "SELECT * FROM table_user where email = $1";
    const values = [email];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function get by email')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function getUserQueueByUserId(client_id,queue_id,resultCallback){
    const connection = establishConnexion()
    const sql = "SELECT * FROM user_queue where queue_id = $1 and client_id = $2 and cast(insert_date as date)=cast(now() as date) and arrived = 0";
    const values = [queue_id,client_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function get UserQueue By UserId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

/*function getQueuByDate (employeeid, resultCallback) {
    const connection = establishConnexion()
    let date = new Date();
    connection.query("select * from queue q , table_user tu where tu.user_id = '"+employeeid+"' and q.insert_date = '"+date+"' and q.arrived = 0 and tu.branch_id = q.branch_id", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function')
        connection.end()
    })
}*/

function setQueuState(){
    const connection = establishConnexion()
    connection.query("select count(*) from queue q , table_user tu where tu.user_id = '"+employeeid+"' and q.insert_date = '"+date+"' and q.arrived = 0 and tu.branch_id = q.branch_id", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function')
        connection.end()
    })
}
function getUserById(user_id,resultCallback){
    const connection = establishConnexion()
    const sql = "SELECT * FROM table_user WHERE user_id = $1";
    const values = [user_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function get user by id')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}
function getUsersByRole(role_id,resultCallback){
    const connection = establishConnexion()
    const sql = "SELECT * FROM table_user WHERE role_id = $1";
    const values = [role_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function get user by role')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}
function getuserbytel (tel, resultCallback) {
    try {
        const connection = establishConnexion()
        connection.query("SELECT * FROM table_user WHERE phone = ' "+ tel + "'", (error, result) => {
            if (error) {
                throw error
            }
            resultCallback(result.rows)
            console.log('dans la query function')
            connection.end()
        })
    } catch (error) {   
    }
}

function createUser (first_name,last_name,phone,pwd,subscription_id,queue_id,role_id,email,resultCallback) {
    const connection = establishConnexion()
    const sql = "INSERT INTO table_user (first_name, last_name, phone, pwd, registration_date, subscription_id,queue_id, role_id, email) VALUES($1,$2,$3,$4,NOW(),$5,$6,$7,$8) RETURNING *";
    const values = [first_name,last_name,phone,pwd,subscription_id,queue_id,role_id,email];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function create user')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function getEmployeesByCompanyId (company_id,resultCallback){
    const connection = establishConnexion()
    const sql = "select tu.user_id,tu.first_name,tu.last_name,tu.phone,tu.pwd,tu.queue_id,tu.email,queue_name from table_user tu left join queue q on tu.queue_id = q.queue_id left join company co on q.company_id = co.company_id where q.company_id = $1";
    const values = [company_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function create user')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function getEmployeesByQueueId (queue_id,resultCallback){
    const connection = establishConnexion()
    const sql = "select * from table_user  where queue_id = $1";
    const values = [queue_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function getEmployeesByQueueId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function addSimpleUser (fname,lname,email,resultCallback) {
    const connection = establishConnexion()
    const sql = "INSERT INTO public.table_user (role_id,first_name,last_name, email) VALUES(3,$1,$2,$3) RETURNING *";
    const values = [fname,lname,email];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function ajout simple user')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}
//user_id , first_name , last_name , phone , date_of_birth , pwd , registration_date , subscription_id ,branch_id , role_id,email
/*function createAdmin(fname,lnamem,numeroTel,email,password,subid){
    const connection = establishConnexion()
    connection.query("INSERT INTO user (playlist_id,title,uri,master_id) VALUES ('" + login + "','" + password +"')", (error, result) => {
        if (error) {
            throw error
        }
        connection.end()
    })
}

function createClient(fname,lname,numeroTel,dateofbirth,password,email){
    const connection = establishConnexion()
    connection.query("INSERT INTO user (playlist_id,title,uri,master_id) VALUES ('" + login + "','" + password +"')", (error, result) => {
        if (error) {
            throw error
        }
        connection.end()
    })
}*/

function deleteuser (id,resultCallback) {
    const connection = establishConnexion()
    const sql = "DELETE FROM table_user WHERE  user_id= $1 RETURNING *";
    const values = [id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function getEmployeesByQueueId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function updateUser (user_id, first_name,last_name,phone,pwd,email,resultCallback) {
    const connection = establishConnexion()
    connection.query("UPDATE table_user SET  first_name = '"+first_name+"', last_name = '"+last_name+"' , phone = '"+phone+"' ,pwd = '"+pwd+"', email = '"+ email +"' WHERE user_id = "+ user_id +" RETURNING *", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function')
        connection.end() 
    })
}

function getCompanyById(company_id,resultCallback){
    const connection = establishConnexion()
    connection.query("SELECT * FROM company WHERE company_id = "+company_id+"",(error, result) => {
        if (error) {
            throw error
        }
    resultCallback(result.rows)
    connection.end() 
    })
}

function getAllCompanies(resultCallback){
    const connection = establishConnexion()
    connection.query("SELECT * FROM company ",(error, result) => {
        if (error) {
            throw error
        }
    resultCallback(result.rows)
    connection.end() 
    })
}

function getCompaniesByPatron(admin_id,resultCallback){
    const connection = establishConnexion()
    connection.query("SELECT * FROM company WHERE admin_id = "+admin_id+";",(error, result) => {
        if (error) {
            throw error
        }
    resultCallback(result.rows)
    connection.end() 
    })
}

function creatCompany(company_name,admin_id,field,email,phone,resultCallback){
    const connection = establishConnexion()
    connection.query("insert into company (company_name,registration_date,admin_id,field,email,phone) VALUES('"+company_name+"',NOW(),"+admin_id+",'"+field+"','"+email+"','"+phone+"') RETURNING *",(error, result) => {
        if (error) {
            throw error
        }
    resultCallback(result.rows)
    connection.end() 
    })
}

function updateCompany(company_id,company_name,admin_id,field,phone,email,resultCallback){
    const connection = establishConnexion()
    const sql = "UPDATE company SET company_name = $1,admin_id = $2 ,field = $3,email = $4,phone = $5 where company_id = $6 RETURNING *";
    const values = [company_name,admin_id,field,phone,email,company_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function getEmployeesByQueueId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function deleteCompany(company_id,resultCallback){
    const connection = establishConnexion()
    const sql = "DELETE FROM company WHERE  company_id = $1  RETURNING *";
    const values = [company_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function getEmployeesByQueueId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function getNextClientQueue(queue_id,resultCallback){
    const connection = establishConnexion()
    const sql = "select * from user_queue where user_queue_number = (select min(user_queue_number) from user_queue where cast(insert_date as date)=cast(now() as date) and queue_id= $1 and arrived = 0 and cast(insert_date as date)=cast(now() as date) )";
    const values = [queue_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function getEmployeesByQueueId')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function insertIntoQueu (client_id,queue_id,resultCallback) {
    const connection = establishConnexion()
    const sql = "INSERT INTO public.user_queue (client_id, queue_id, insert_date, check_in_date, type_id, user_queue_number, arrived) VALUES($1, $2, now(),null, 1, (select count(user_queue_number) as queuemax from user_queue where cast(insert_date as date)=cast(now() as date) and queue_id=$3)+1, 0) RETURNING * ";
    const values = [client_id,queue_id,queue_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            resultCallback(res.rows)
            connection.end()
          });       
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }

}

function getListQueue (user_queue_id,resultCallback) {
    const connection = establishConnexion()
    connection.query("select * from user_queue  where user_queue_id = "+ user_queue_id +" ", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function deleteUserQueue (user_queue_id,resultCallback) {
    const connection = establishConnexion()
    const sql = "delete from user_queue where user_queue_id = $1 RETURNING * ;";
    const values = [user_queue_id];
    try {
        connection.query(sql,values).then(res => {
            const data = res.rows;
            console.log('dans la query function deleteUserQueueparID')
            resultCallback(res.rows)    
            connection.end()      
          });
    } catch (e) {
        console.error('Error Occurred', e)
        throw e
    }
}

function testquery(){
    let connection = establishConnexion()
    //test select
    connection.query("SELECT * from table_user", (error, result) => {
        if (error) {
            throw error
        }
        //console.log(result)
        connection.end()
    })

    //test insert
     connection = establishConnexion()
    connection.query("INSERT INTO role (role_name) VALUES ('admin')", (error, result) => {
        if (error) {
            throw error
        }
        console.log(result)
        connection.end()
    })

    //test delete
    connection = establishConnexion()
    connection.query("DELETE FROM role WHERE role_id = '1'",(error, result) => {
        if (error) {
            throw error
        }
        //console.log(result)
        connection.end()
    })
}

//testquery()
/*

})*/

module.exports = {
    getNextClientQueue,
    deleteUserQueue,
    deleteCompany,
    updateCompany,
    creatCompany,
    getCompanyById,
    getCompaniesByPatron,
    getAllCompanies,
    getUserById,
    getListQueue,
    getLastQueueNumber,
    addSimpleUser,
    insertIntoQueu,
    getAllUsers,
    loginuser,
    updateUser,
    deleteuser,
    createUser,
    getuserbytel,
    getuserbyemail,
    getUsersByRole,
    getUserQueueByUserId,
    getEmployeesByCompanyId,
    getEmployeesByQueueId,
    testloginuser
}