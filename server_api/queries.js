// ****************** partie admin ************************* 
let sql=""
//login admin
sql='select user_id from table_user tu where email = ? and pwd = ? and role_id = 1 ';
//nombre d'entreprises pour l'admin
sql='select count(*) from company c where admin_id = ? ';
//liste de toutes les entreprises pour un admin
sql='select * from company c where admin_id = ? ';
//retourne une entreprise par id
sql='select * from company c where company_id = ? ';
//nombre de succursales pour chaque entreprise
sql='select count(*) from queue b where company_id = ? ';
//liste de toutes les succursales pour une entreprisess
sql='select * from queue b where company_id = ?';
//retourne une succursale par id 
sql='select * from queue b where queue_id = ? ';
//nombre d'employee pour chaque succursale
sql='select count(*) from table_user tu where role_id = 2 and queue_id = ?';
//liste de toutes les employees pour une succursale
sql='select * from table_user tu where role_id = 2 and queue_id = ?';
//retourne un employee par id
sql='select * from table_user tu where role_id = 2 and user_id = ?';

// ****************** partie employee ************************* 
//login employee
sql='select user_id from table_user tu where email = ? and pwd = ? and role_id = 2 ';
//nombre de personnes actuellement dans la file
sql='select * from user_queue  where queue_id = ? and cast(insert_date as date)=cast(now() as date) and arrived = 0 ';
//retourne le dernier nombre dans la user_queue d'une succursale donnee
sql='select max(user_queue_number) from user_queue where cast(insert_date as date)=cast(now() as date) and queue_id=?;'

// ****************** partie client ************************* 
//login client avec email
sql='select user_id from table_user tu where email = ? and role_id = 3 ';
//login client avec telephone
sql='select user_id from table_user tu where phone = ? and role_id = 3 ';
//liste de toutes les succursales avec adresse
sql='select * from queue b  INNER JOIN address a ON b.address_id = a.address_id ';
//retourne une succursale par id 
sql='select * from queue b where queue_id = ?';