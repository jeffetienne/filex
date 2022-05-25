// ****************** partie admin ************************* 
let sql=""
//supprimer un employee
sql="DELETE FROM table_user tu WHERE user_id = ? and role_id = 2 ;"
//supprimer une entreprise
sql="DELETE FROM company c WHERE company_id = ? ;"
// supprimer une succursale
sql="DELETE FROM branch b WHERE branch_id = ? ;"
