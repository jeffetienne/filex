package com.example.filex_versionmobile.entite;

public class Employe {

    private String nom;
    private String password;

    public Employe() {
    }

    public Employe(String nom, String password) {
        this.nom = nom;
        this.password = password;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
