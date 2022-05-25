package com.example.filex_versionmobile.service;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.CountDownTimer;
import android.util.Log;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;

import com.example.filex_versionmobile.Employe_gestion_file;
import com.example.filex_versionmobile.entite.ResponseEmploye;
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
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nullable;

public class EmployeTask extends AsyncTask<String, Nullable, String> {

    Context ctx;
    
    String email;
    String pwd;
    String results;
    TextView tv_msg_error;
    LinearLayout ll_container_for_msg_error;


    public EmployeTask(String email, String pwd, Context ctx, LinearLayout ll_container_for_msg_error, TextView tv_msg_error) {
        this.email = email;
        this.pwd = pwd;
        this.results = "";
        this.ctx = ctx;
        this.ll_container_for_msg_error = ll_container_for_msg_error;
        this.tv_msg_error = tv_msg_error;
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
            params.put("pwd", pwd);


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

            //msg2+=sbParams;

            //connection en post


            HttpURLConnection conn = null;
            try {
                String urlenPost = "http://198.50.190.236:8080/user/employee";
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

        // ResponseUser ru = new ResponseUser();
        Gson gson = new Gson();
        ResponseEmploye employe = gson.fromJson(s, (Type) ResponseEmploye.class);

        if (employe.getState() == 200) {
            if (employe.getUser().getRole_id() == 2) {
//                Toast.makeText(ctx, "Connexion OK", Toast.LENGTH_SHORT).show();
//                Log.d("connexion", "ok");
                Intent intent = new Intent(ctx, Employe_gestion_file.class);
                ctx.startActivity(intent);
            } else {
//                Toast.makeText(ctx, "Ce n'est pas un compte employe", Toast.LENGTH_SHORT).show();
//                Log.d("isEmploye", "Ce n'est pas un compte employe");
                AlertDialog dialog = new AlertDialog.Builder(ctx)
                        .setTitle("ERREUR")
                        .setMessage("La saisie ne représente pas un courriel employé.\nVeuillez tenter à nouveau")
                        .setNegativeButton(android.R.string.no, null)
                        .create();
                dialog.setOnShowListener(new DialogInterface.OnShowListener() {
                    private static final int AUTO_DISMISS_MILLIS = 5000;

                    public void onShow(final DialogInterface dialog) {
                        final Button defaultButton = ((AlertDialog) dialog).getButton(AlertDialog.BUTTON_NEGATIVE);
                        final CharSequence negativeButtonText = defaultButton.getText();
                        new CountDownTimer(AUTO_DISMISS_MILLIS, 100) {
                            @Override
                            public void onTick(long millisUntilFinished) {
                                defaultButton.setText(String.format(
                                        Locale.getDefault(), "%s %d",
                                        "",
                                        TimeUnit.MILLISECONDS.toSeconds(millisUntilFinished) + 1 // on ajoute un ( + 1 ), pour ne jamais voir le zéro s'afficher
                                ));
                            }

                            @Override
                            public void onFinish() {
                                if (((AlertDialog) dialog).isShowing()) {
                                    dialog.dismiss();
                                }
                            }
                        }.start();

                    }
                });
                dialog.show();
            }
        } else if (employe.getState() == 500) {
//            Toast.makeText(ctx, "Erreur de connection", Toast.LENGTH_SHORT).show();
//            Log.d("connexion", "Erreur de connection");
            AlertDialog dialog = new AlertDialog.Builder(ctx)
                    .setTitle("ERREUR")
                    .setMessage("Erreur de connection.\nVeuillez tenter à nouveau")
                    .setNegativeButton(android.R.string.no, null)
                    .create();
            dialog.setOnShowListener(new DialogInterface.OnShowListener() {
                private static final int AUTO_DISMISS_MILLIS = 5000;

                public void onShow(final DialogInterface dialog) {
                    final Button defaultButton = ((AlertDialog) dialog).getButton(AlertDialog.BUTTON_NEGATIVE);
                    final CharSequence negativeButtonText = defaultButton.getText();
                    new CountDownTimer(AUTO_DISMISS_MILLIS, 100) {
                        @Override
                        public void onTick(long millisUntilFinished) {
                            defaultButton.setText(String.format(
                                    Locale.getDefault(), "%s %d",
                                    "",
                                    TimeUnit.MILLISECONDS.toSeconds(millisUntilFinished) + 1 // on ajoute un ( + 1 ), pour ne jamais voir le zéro s'afficher
                            ));
                        }

                        @Override
                        public void onFinish() {
                            if (((AlertDialog) dialog).isShowing()) {
                                dialog.dismiss();
                            }
                        }
                    }.start();

                }
            });
            dialog.show();
        }

        /*else{
            tv_msg_error.setText("Email ou mot de passe invalid");
            ll_container_for_msg_error.addView(tv_msg_error);
        }*/

      //  Log.d("look",""+employe.getUsers().getFirst_name() + ", " + ""+employe.getUsers().getLast_name());

    }
}
