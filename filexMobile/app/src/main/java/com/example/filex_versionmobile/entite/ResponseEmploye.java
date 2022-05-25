package com.example.filex_versionmobile.entite;

public class ResponseEmploye {
    private int state;
    private User user;

    public ResponseEmploye() {
    }

    public ResponseEmploye(int state, User user) {
        this.state = state;
        this.user = user;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
