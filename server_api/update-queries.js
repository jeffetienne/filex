// ****************** partie admin ************************* 
//modifier les informations d'une entreprise
let sql="UPDATE public.company SET company_name=?, field=?, email=?, phone=? WHERE company_id=?;"
//modifier les informations d'une succursale
sql="UPDATE public.branch SET  branch_name=?, capacity=?, email=?, phone=?, avg_processing_time=? WHERE branch_id=? ;"
//modifier les informations d'un employee
sql="UPDATE public.table_user SET  first_name=?, last_name=?, phone=?, date_of_birth=?, pwd=?, branch_id=?, email=? WHERE  role_id=2 and user_id = ? ;" 
// ****************** partie employee *************************
//confirmer l'entrer du client a la succursale
sql=""