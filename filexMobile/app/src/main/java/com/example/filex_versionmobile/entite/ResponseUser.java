package com.example.filex_versionmobile.entite;

public class ResponseUser {
    private int state;
    private User users;

    public ResponseUser() {
    }

    public ResponseUser(int state, User users) {
        this.state = state;
        this.users = users;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }
}
