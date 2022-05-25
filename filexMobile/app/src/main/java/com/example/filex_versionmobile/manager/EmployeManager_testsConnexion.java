package com.example.filex_versionmobile.manager;

import android.content.Context;
import android.widget.Toast;

import com.example.filex_versionmobile.entite.Employe;

import java.util.ArrayList;

public class EmployeManager_testsConnexion {


   private static ArrayList<Employe> employes;

    public static ArrayList<Employe> getAll() {
        
        ArrayList<Employe> retour = null;

        if (retour == null) {
            init();
        }

        return employes;
    }


    public static void init() {
        employes = new ArrayList<>();
        Employe employe1 = new Employe("Paul", "abc");
        Employe employe2 = new Employe("Jacques", "123");
        employes.add(employe1);
        employes.add(employe2);
    }


    public static void checkEmploye() {

        for (Employe employes: employes) {
            if (employes.getNom().equals("Paul")) {
                //Toast.makeText(this, "OK", Toast.LENGTH_SHORT).show();
            }
        }

    }

}
