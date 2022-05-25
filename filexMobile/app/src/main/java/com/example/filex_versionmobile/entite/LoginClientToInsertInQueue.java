package com.example.filex_versionmobile.entite;

import java.sql.Timestamp;

public class LoginClientToInsertInQueue {
    private int user_queue_id;
    private int client_id;
    private int queue_id;
    private Timestamp insert_date;
    private Timestamp check_in_date;
    private int type_id;
    private int user_queue_number;
    private int arrived;

    public LoginClientToInsertInQueue() {
    }

    public LoginClientToInsertInQueue(int user_queue_id, int client_id, int queue_id, Timestamp insert_date, Timestamp check_in_date, int type_id, int user_queue_number, int arrived) {
        this.user_queue_id = user_queue_id;
        this.client_id = client_id;
        this.queue_id = queue_id;
        this.insert_date = insert_date;
        this.check_in_date = check_in_date;
        this.type_id = type_id;
        this.user_queue_number = user_queue_number;
        this.arrived = arrived;
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
}
