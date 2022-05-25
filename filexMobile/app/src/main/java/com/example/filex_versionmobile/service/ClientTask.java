package com.example.filex_versionmobile.service;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;

import androidx.appcompat.app.AlertDialog;

import com.example.filex_versionmobile.Client_Accueil;
import com.example.filex_versionmobile.entite.ResponseUser;
import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;

import javax.annotation.Nullable;

public class ClientTask extends AsyncTask<String, Nullable, String> {

    Context ctx;

    String email;
    int queue_id;
    String results;

    ClientTask() {
    }

    public ClientTask(String email, int queue_id, Context ctx) {
        this.email = email;
        this.queue_id = queue_id;
        this.ctx = ctx;
        this.results = "";
    }

    @Override
    protected String doInBackground(String... strings) {

        //ca vt dire cest en get la reqeute
        if (strings.length > 0) {

        } else {
            //ca vt dire que la requte est en post et les params sont dans le corps

            //creation d'un hashmap pour inserer les donnees
            HashMap<String, String> params = new HashMap<>();
            params.put("email", email);
            params.put("queue_id", String.valueOf(queue_id));


            StringBuilder sbParams = new StringBuilder();
            int i = 0;
            for (String key : params.keySet()) {
                try {
                    if (i != 0) {
                        sbParams.append("&");
                    }
                    sbParams.append(key).append("=")
                            .append(URLEncoder.encode(params.get(key), "UTF-8"));

                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                i++;
            }

            //connection en post

            HttpURLConnection conn = null;
            try {
                String urlenPost = "http://198.50.190.236:8080/user/client";
                URL urlObj = new URL(urlenPost);
                conn = (HttpURLConnection) urlObj.openConnection();

                conn.setDoOutput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Accept-Charset", "UTF-8");

                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);

                conn.connect();

                String paramsString = sbParams.toString();

                DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
                wr.writeBytes(paramsString);
                wr.flush();
                wr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }


            try {
                InputStream in = new BufferedInputStream(conn.getInputStream());
                BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                    results+=result;
                }

                Log.d("test", "result from server: " + result.toString());

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (conn != null) {
                    conn.disconnect();
                }
            }
        }

        return results;
    }

    @Override
    protected void onPostExecute(String s) {

        Gson gson = new Gson();
        //Employe employes= gson.fromJson(s, (Type) Employe.class);

        ResponseUser client = gson.fromJson(s, (Type) ResponseUser.class);


        if (client.getState() == 200) {
            //Log.d("connexion","OK POUR TEST");
            Intent intent = new Intent(ctx, Client_Accueil.class);
            ctx.startActivity(intent);
        } else if (client.getState() == 500) {
            //Log.d("connexion", "Information");
            AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
            builder.setTitle("Information");
            builder.setMessage("\nVous êtes déjà inséré dans une file d'attente\n\nSouhaitez-vous voir l'état de votre file ?");
            builder.setPositiveButton("Oui", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    Intent intent = new Intent(ctx, Client_Accueil.class);
                    ctx.startActivity(intent);
                }
            });
//            builder.setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
//                @Override
//                public void onClick(DialogInterface dialogInterface, int i) {
//                    //Toast.makeText(ctx, "", Toast.LENGTH_SHORT).show();
//                }
//            });
            builder.setNeutralButton("Annuler", null);

            builder.show();
        }

    }
}
