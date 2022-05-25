package com.example.filex_versionmobile.entite;

import java.sql.Date;
import java.sql.Timestamp;

public class ClientInsertInQueue {
    private int user_queue_id;
    private int client_id;
    private int queue_id;
    private Timestamp insert_date;
    private Timestamp check_in_date;
    private int type_id;
    private int user_queue_number;
    private int arrived;
    private int user_id;
    private String first_name;
    private String last_name;
    private String phone;
    private String date_of_birth;
    private String pwd;
    private String registration_date;
    private int subscription_id;
    private int role_id;
    private String email;

    public ClientInsertInQueue() {
    }

    public ClientInsertInQueue(int user_queue_id, int client_id, int queue_id, Timestamp insert_date, Timestamp check_in_date, int type_id, int user_queue_number, int arrived, int user_id, String first_name, String last_name, String phone, String date_of_birth, String pwd, String registration_date, int subscription_id, int role_id, String email) {
        this.user_queue_id = user_queue_id;
        this.client_id = client_id;
        this.queue_id = queue_id;
        this.insert_date = insert_date;
        this.check_in_date = check_in_date;
        this.type_id = type_id;
        this.user_queue_number = user_queue_number;
        this.arrived = arrived;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.date_of_birth = date_of_birth;
        this.pwd = pwd;
        this.registration_date = registration_date;
        this.subscription_id = subscription_id;
        this.role_id = role_id;
        this.email = email;
    }

    public int getUser_queue_id() {
        return user_queue_id;
    }

    public void setUser_queue_id(int user_queue_id) {
        this.user_queue_id = user_queue_id;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public int getQueue_id() {
        return queue_id;
    }

    public void setQueue_id(int queue_id) {
        this.queue_id = queue_id;
    }

    public Timestamp getInsert_date() {
        return insert_date;
    }

    public void setInsert_date(Timestamp insert_date) {
        this.insert_date = insert_date;
    }

    public Timestamp getCheck_in_date() {
        return check_in_date;
    }

    public void setCheck_in_date(Timestamp check_in_date) {
        this.check_in_date = check_in_date;
    }

    public int getType_id() {
        return type_id;
    }

    public void setType_id(int type_id) {
        this.type_id = type_id;
    }

    public int getUser_queue_number() {
        return user_queue_number;
    }

    public void setUser_queue_number(int user_queue_number) {
        this.user_queue_number = user_queue_number;
    }

    public int getArrived() {
        return arrived;
    }

    public void setArrived(int arrived) {
        this.arrived = arrived;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(String registration_date) {
        this.registration_date = registration_date;
    }

    public int getSubscription_id() {
        return subscription_id;
    }

    public void setSubscription_id(int subscription_id) {
        this.subscription_id = subscription_id;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}







