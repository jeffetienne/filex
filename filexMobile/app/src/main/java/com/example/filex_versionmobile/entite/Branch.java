package com.example.filex_versionmobile.entite;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

public class Branch {
    private int branch_id;
    private String branch_name;
    private Date registration_date;
    private int address_id;
    private int capacity;
    private int company_id;
    private String email;
    private String phone;
    private Timestamp avg_waiting_time;
    private Timestamp avg_processing_time;

    public Branch() {
    }

    public Branch(int branch_id, String branch_name, Date registration_date, int address_id, int capacity, int company_id, String email, String phone, Timestamp avg_waiting_time, Timestamp avg_processing_time) {
        this.branch_id = branch_id;
        this.branch_name = branch_name;
        this.registration_date = registration_date;
        this.address_id = address_id;
        this.capacity = capacity;
        this.company_id = company_id;
        this.email = email;
        this.phone = phone;
        this.avg_waiting_time = avg_waiting_time;
        this.avg_processing_time = avg_processing_time;
    }

    public int getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(int branch_id) {
        this.branch_id = branch_id;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
        this.registration_date = registration_date;
    }

    public int getAddress_id() {
        return address_id;
    }

    public void setAddress_id(int address_id) {
        this.address_id = address_id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCompany_id() {
        return company_id;
    }

    public void setCompany_id(int company_id) {
        this.company_id = company_id;
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

    public Timestamp getAvg_waiting_time() {
        return avg_waiting_time;
    }

    public void setAvg_waiting_time(Timestamp avg_waiting_time) {
        this.avg_waiting_time = avg_waiting_time;
    }

    public Timestamp getAvg_processing_time() {
        return avg_processing_time;
    }

    public void setAvg_processing_time(Timestamp avg_processing_time) {
        this.avg_processing_time = avg_processing_time;
    }
}
