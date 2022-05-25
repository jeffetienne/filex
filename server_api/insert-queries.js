// ****************** partie admin ************************* 
let sql=""
//inscription admin
sql="INSERT INTO public.table_user (first_name, last_name, phone, date_of_birth, pwd, registration_date, subscription_id, branch_id, role_id, email) VALUES(?,?,?,?,?,NOW(),?, null, 1,?);"
//inscription employee
sql="INSERT INTO public.table_user (first_name, last_name, phone, date_of_birth, pwd, registration_date, subscription_id, branch_id, role_id, email) VALUES(?,?,?,?,?, now(), null,?, 2,?);"
//ajout entreprise
sql="INSERT INTO public.company (company_name, registration_date, admin_id, field, email, phone) VALUES(?, now(), ?, ?, ?, ?);"
//ajout d'une succursale et horaires et adresse
sql="INSERT INTO public.branch (branch_name, registration_date, address_id, capacity, company_id, email, phone, avg_waiting_time, avg_processing_time)VALUES(?, now(), ?, ?, ?, ?, ?, ?, ?);"
sql="INSERT INTO public.opening_time (branch_id, week_day, opening, closing) VALUES(?,?,?,?);"
sql="INSERT INTO public.address (civic_number, apt, street, postal_code, city, province, country, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);"

// ****************** partie employee *************************
//l'employee ne fait pas d'insertions

// ****************** partie client *************************
//s'inscrire
sql="INSERT INTO public.table_user (first_name, last_name, phone, date_of_birth, pwd, registration_date, subscription_id, branch_id, role_id, email) VALUES(?, ?, ?, ?, ?, now(), null, null, 3, ?);"
//s'inserer dans la file
sql="INSERT INTO public.queue (client_id, branch_id, insert_date, check_in_date, type_id, queue_number, arrived) VALUES(?, ?, now(),null, 1, ?, 0);"