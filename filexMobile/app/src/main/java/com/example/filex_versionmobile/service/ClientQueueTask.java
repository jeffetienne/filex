package com.example.filex_versionmobile.service;

import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.AsyncTask;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;

import com.example.filex_versionmobile.R;
import com.example.filex_versionmobile.entite.ClientInsertInQueue;
import com.example.filex_versionmobile.entite.ResponseUserQueueId;
import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.annotation.Nullable;
public class ClientQueueTask extends AsyncTask<String, Nullable, String> {

    Context ctx;

    String results;
    TextView emailClient;
    LinearLayout ll_container_client_in_queue, ll_custom_view;

    public ClientQueueTask() {
        results = "";
    }

    public ClientQueueTask(Context ctx, LinearLayout ll_container_client_in_queue, LinearLayout ll_custom_view) {
        this.results = "";
        this.ctx = ctx;
        this.emailClient = emailClient;
        this.ll_container_client_in_queue = ll_container_client_in_queue;
        this.ll_custom_view = ll_custom_view;
    }

    @Override
    protected String doInBackground(String... strings) {
        String params = strings[0];
        HttpURLConnection conn = null;
        try {
            String urlenGet = "http://198.50.190.236:8080/user_queues/" + params;
            URL urlObj = new URL(urlenGet);
            conn = (HttpURLConnection) urlObj.openConnection();
            conn.connect();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            InputStream in = new BufferedInputStream(conn.getInputStream());
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));

            String line = "";
            while ((line = reader.readLine()) != null) {
//
                results += line;
            }
            Log.d("test", "result from server: " + results);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return results;
    }

    @Override
    protected void onPostExecute(String s) {
        Gson gson = new Gson();
        ResponseUserQueueId clients = gson.fromJson(s, (Type) ResponseUserQueueId.class);
        if (clients.getState() == 200) {

            ll_container_client_in_queue.removeAllViews();

            for (ClientInsertInQueue c : clients.getUser_queue()) {

                ll_custom_view = new LinearLayout(ctx);
                ll_custom_view.setOrientation(LinearLayout.VERTICAL);

                ImageView img = new ImageView(ctx);
                img.setLayoutParams(new ViewGroup.LayoutParams(200, 200));
                img.setImageResource(R.drawable.client);

                ll_custom_view.addView(img);

                img.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        AlertDialog.Builder alert = new AlertDialog.Builder(ctx);
                        alert.setTitle("Informations du client n° " + c.getUser_queue_number());
                        alert.setMessage("Courriel : " + c.getEmail());
//                                + "\n" + "Nom : " + c.getFirst_name() + " " + c.getLast_name());

                        alert.setNegativeButton("Quitter", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {

                            }
                        });

                        alert.show();
                    }
                });
                TextView textView = new TextView(ctx);
                textView.setText("" +c.getUser_queue_number());
                textView.setGravity(1);
                ll_custom_view.addView(textView);

                ll_container_client_in_queue.addView(ll_custom_view);

            }
        } else if (clients.getState() == 500) {
//            Log.d("connexion", "erreur de connection");
            ll_container_client_in_queue.removeAllViews();
            TextView tvVide = new TextView(ctx);
            tvVide.setText("Aucun client dans la file");
            ll_container_client_in_queue.setGravity(Gravity.CENTER_VERTICAL);
            tvVide.setTextSize(20);
            tvVide.setTextColor(Color.RED);
            ll_container_client_in_queue.addView(tvVide);


        } else {
        }
    }
}
