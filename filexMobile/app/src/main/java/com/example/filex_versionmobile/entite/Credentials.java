package com.example.filex_versionmobile.entite;

public class Credentials {
    public String email;
    public String pwd;

    public Credentials() {
    }

    public Credentials(String email, String pwd) {
        this.email = email;
        this.pwd = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
