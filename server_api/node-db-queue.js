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

function getByCompany (company_id,resultCallback) {
    const connection = establishConnexion() 
    connection.query("select * from queue where company_id="+company_id+" ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}
function getAllQueues (resultCallback) {
    const connection = establishConnexion() 
    connection.query("select * from queue ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}
function getById (queue_id,resultCallback) {
    const connection = establishConnexion() 
    connection.query("select distinct q.queue_id,q.queue_name,q.registration_date,"+
    "q.address_id,q.capacity,q.company_id,q.email,q.phone,q.avg_waiting_time,q.avg_processing_time ,"+
    "a.civic_number,a.apt,a.street,a.postal_code,a.city,a.province,a.country,a.latitude,a.longitude,"+
    "(SELECT  o.opening  FROM public.opening_time o  where   o.week_day='lundi'  and o.queue_id ="+queue_id+") as lundi_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='lundi' and o.queue_id ="+queue_id+") as lundi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='mardi' and o.queue_id ="+queue_id+") as mardi_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='mardi' and o.queue_id ="+queue_id+") as mardi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='mercredi' and o.queue_id ="+queue_id+") as mercredi_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='mercredi' and o.queue_id ="+queue_id+") as mercredi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='jeudi' and o.queue_id ="+queue_id+") as  jeudi_ouverture,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='jeudi' and o.queue_id ="+queue_id+") as jeudi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='vendredi' and o.queue_id ="+queue_id+") as vendredi_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='vendredi' and o.queue_id ="+queue_id+") as vendredi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='samedi' and o.queue_id ="+queue_id+") as samedi_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='samedi' and o.queue_id ="+queue_id+") as samedi_fermeture ,"+
    "(SELECT  o.opening FROM public.opening_time o where   o.week_day='dimanche' and o.queue_id ="+queue_id+") as dimanche_ouverture ,"+
    "(SELECT  o.closing FROM public.opening_time o where   o.week_day='dimanche' and o.queue_id ="+queue_id+") as dimanche_fermeture"+
    " from queue q , address a, opening_time o where q.address_id=a.address_id"+
    " and q.queue_id ="+queue_id+"", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function addQueue (civic_number,apt,
    street,postal_code,city,province,country,
    latitude,longitude,queue_name,capacity,company_id,
    email,phone,avg_waiting_time,
    avg_processing_time,lundi_ouverture,lundi_fermeture,
    mardi_ouverture,mardi_fermeture,mercredi_ouverture,
    mercredi_fermeture,jeudi_ouverture,jeudi_fermeture,
    vendredi_ouverture,vendredi_fermeture,samedi_ouverture,
    samedi_fermeture,dimanche_ouverture,dimanche_fermeture,resultCallback) {
    const connection = establishConnexion()  
    connection.query(
" INSERT INTO public.address(civic_number, apt, street, postal_code, city, province, country, latitude, longitude)VALUES ('"+civic_number+"','"+ apt+"','"+ street+"','"+ postal_code+"','"+ city+"','"+ province+"','"+ country+"',"+ latitude+","+ longitude+"); "+
" INSERT INTO public.queue(queue_name, registration_date, address_id, capacity, company_id, email, phone, avg_waiting_time, avg_processing_time) VALUES ('"+queue_name+"',now(),(select max(address_id) from address ),"+ capacity+","+ company_id+",'"+ email+"','"+ phone+"',"+ avg_waiting_time+","+ avg_processing_time+"); "+
" INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'lundi', '"+lundi_ouverture+"', '"+lundi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'mardi', '"+mardi_ouverture+"', '"+mardi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'mercredi', '"+mercredi_ouverture+"', '"+mercredi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'jeudi', '"+jeudi_ouverture+"', '"+jeudi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'vendredi', '"+vendredi_ouverture+"', '"+vendredi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'samedi', '"+samedi_ouverture+"', '"+samedi_fermeture+"'); "+
   "INSERT INTO public.opening_time("+
   "queue_id, week_day, opening, closing)"+
   "VALUES ((select max(queue_id) from queue), 'dimanche', '"+dimanche_ouverture+"', '"+dimanche_fermeture+"') ;"  
    )
    connection.query("select * from public.queue where queue_id=(select max(queue_id) from queue);", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })

}

function updateQueue (queue_id,civic_number,apt,
    street,postal_code,city,province,country,
    latitude,longitude,queue_name,capacity,company_id,
    email,phone,avg_waiting_time,
    avg_processing_time,lundi_ouverture,lundi_fermeture,
    mardi_ouverture,mardi_fermeture,mercredi_ouverture,
    mercredi_fermeture,jeudi_ouverture,jeudi_fermeture,
    vendredi_ouverture,vendredi_fermeture,samedi_ouverture,
    samedi_fermeture,dimanche_ouverture,dimanche_fermeture,resultCallback) {
    const connection = establishConnexion()  
    connection.query( 
" UPDATE public.address"+ 
" SET civic_number='"+civic_number+"', apt='"+apt+"', street='"+street+"', postal_code='"+postal_code+"', city='"+city+"', province='"+province+"', country='"+country+"', latitude= "+latitude+" , longitude="+longitude+" "+ 
" where address_id=(select address_id from public.queue where queue_id="+queue_id+"); "+
" UPDATE public.queue"+
" SET  queue_name='"+queue_name+"', capacity="+capacity+", company_id="+company_id+", email='"+email+"', phone='"+phone+"', avg_waiting_time="+avg_waiting_time+", avg_processing_time="+avg_processing_time+" "+
" WHERE queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+lundi_ouverture+"', closing='"+lundi_fermeture+"' "+
" where week_day='lundi' and queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+mardi_ouverture+"', closing='"+mardi_fermeture+"' "+
" where week_day='mardi' and queue_id="+queue_id+" ;"+ 
" UPDATE public.opening_time "+
" set opening='"+mercredi_ouverture+"', closing='"+mercredi_fermeture+"' "+
" where week_day='mercredi' and queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+jeudi_ouverture+"', closing='"+jeudi_fermeture+"' "+
" where week_day='jeudi' and queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+vendredi_ouverture+"', closing='"+vendredi_fermeture+"' "+
" where week_day='vendredi' and queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+samedi_ouverture+"', closing='"+samedi_fermeture+"' "+
" where week_day='samedi' and queue_id="+queue_id+" ;"+
" UPDATE public.opening_time "+
" set opening='"+dimanche_ouverture+"', closing='"+dimanche_fermeture+"' "+
" where week_day='dimanche' and queue_id="+queue_id+" ;"
    )
    connection.query("select * from public.queue where queue_id="+queue_id+" ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })

}

function deleteQueue (queue_id,resultCallback) {
    const connection = establishConnexion() 
    connection.query("delete from opening_time where queue_id="+queue_id+" ;")
    connection.query("delete from queue where queue_id ="+queue_id+" RETURNING * ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function getLastQueue (resultCallback) {
    const connection = establishConnexion() 
    connection.query("select max(queue_id) from queue ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function addUserQueue (userQueue, resultCallback) {
    const connection = establishConnexion()
    connection.query("insert into user_queue(client_id, queue_id, insert_date, check_in_date, type_id, user_queue_number, arrived) values(" + userQueue.client_id + ", " + userQueue.queue_id + ", NOW(), NULL, 1, " + userQueue.user_queue_number + ", 0) RETURNING * ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function updateUserQueue (queue_id, resultCallback) {
    const connection = establishConnexion()
    connection.query("update user_queue set arrived=1 , check_in_date= now() where user_queue_number=(select min(user_queue_number) from user_queue where queue_id="+queue_id+" and cast(insert_date as date)=cast(now() as date) and arrived=0) and queue_id=" + queue_id + " and cast(insert_date as date)=cast(now() as date) ;")
    connection.query("select * from user_queue where user_queue_number = (select min(user_queue_number) from user_queue where cast(insert_date as date)=cast(now() as date) and queue_id= "+queue_id+" and arrived = 0 and cast(insert_date as date)=cast(now() as date) );",
    (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function getUserQueueByQueueId (queue_id, resultCallback) {
    const connection = establishConnexion() 
    connection.query("select uq.user_queue_id, uq.client_id, uq.queue_id, uq.insert_date,"+
    " uq.check_in_date, uq.type_id, uq.user_queue_number, uq.arrived, tu.first_name,"+
    " tu.last_name, tu.phone, tu.email, tu.date_of_birth, tu.registration_date, tu.role_id"+
    " from user_queue uq inner join table_user tu on uq.client_id = tu.user_id where uq.queue_id = " + queue_id + " and cast(uq.insert_date as date)=cast(now() as date) and arrived = 0 order by uq.insert_date ;", (error, result) => {
        if (error) {
            throw error
            
        }
        resultCallback(result.rows)
        console.log("getUserByQueue")
        connection.end()
    })
}

function getavgqueue (queue_id, resultCallback) {
    const connection = establishConnexion() 
    connection.query("select uq.user_queue_id, uq.client_id, uq.queue_id, uq.insert_date,"+
    " uq.check_in_date,(uq.check_in_date-uq.insert_date) as avg_time, uq.type_id, uq.user_queue_number, uq.arrived, tu.first_name,"+
    " tu.last_name, tu.phone, tu.email, tu.date_of_birth, tu.registration_date, tu.role_id"+
    " from user_queue uq inner join table_user tu on uq.client_id = tu.user_id where uq.queue_id = " + queue_id + " order by uq.insert_date ;", (error, result) => {
        if (error) {
            throw error
            
        }
        resultCallback(result.rows)
        console.log("getUserByQueue")
        connection.end()
    })
}

function getTodayUserQueueByQueueId (queue_id, resultCallback) {
    const connection = establishConnexion() 
    connection.query("select uq.user_queue_id, uq.client_id, uq.queue_id, uq.insert_date,"+
    " uq.check_in_date, uq.type_id, uq.user_queue_number, uq.arrived, tu.first_name,"+
    " tu.last_name, tu.phone, tu.email, tu.date_of_birth, tu.registration_date, tu.role_id"+
    " from user_queue uq inner join table_user tu on uq.client_id = tu.user_id where uq.queue_id = " + queue_id + " and cast(insert_date as date)=cast(now() as date) and uq.arrived=0 order by uq.insert_date ;", (error, result) => {
        if (error) {
            throw error
            
        }
        resultCallback(result.rows)
        console.log("getUserByQueue")
        connection.end()
    })
}
function getUserQueueById (user_queue_id, resultCallback) {
    const connection = establishConnexion() 
    connection.query("select user_queue_id," +
    " uq.client_id," +
    " uq.queue_id," +
    " uq.insert_date," +
    " uq.check_in_date," +
    " uq.type_id," +
    " uq.user_queue_number," +
    " uq.arrived, tu.*" +
    " from user_queue uq inner join table_user tu on uq.client_id = tu.user_id where uq.user_queue_id = " + user_queue_id + ";", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function deleteUserQueue (user_queue_id,resultCallback) {
    const connection = establishConnexion() 
    connection.query("delete from user_queue where user_queue_id ="+user_queue_id+" RETURNING * ;", (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}
    
module.exports = {
    getByCompany,
    getAllQueues,
    getById,
    addQueue,
    getLastQueue,
    updateQueue,
    deleteQueue,
    addUserQueue,
    getUserQueueByQueueId,
    updateUserQueue,
    getUserQueueById,
    deleteUserQueue,
    getTodayUserQueueByQueueId,
    getavgqueue
}