package com.example.filex_versionmobile.entite;

import java.util.Date;

public class Company {
    private int company_id;
    private String name;
    private Date registration_date;
    private int admin_id;
    private String field;
    private String email;
    private String phone;

    public Company() {
    }

    public Company(int company_id, String name, Date registration_date, int admin_id, String field, String email, String phone) {
        this.company_id = company_id;
        this.name = name;
        this.registration_date = registration_date;
        this.admin_id = admin_id;
        this.field = field;
        this.email = email;
        this.phone = phone;
    }

    public int getCompany_id() {
        return company_id;
    }

    public void setCompany_id(int company_id) {
        this.company_id = company_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
        this.registration_date = registration_date;
    }

    public int getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(int admin_id) {
        this.admin_id = admin_id;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
