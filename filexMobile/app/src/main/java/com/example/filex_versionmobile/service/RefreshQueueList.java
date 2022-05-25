package com.example.filex_versionmobile.service;

import android.content.Context;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
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

public class RefreshQueueList extends AsyncTask<String, Nullable, String> {

    Context ctx;

    String results;
    LinearLayout listContainer, listImgView;

    public RefreshQueueList() {
    }

    public RefreshQueueList(Context ctx,  LinearLayout listContainer, LinearLayout listImgView) {

        this.ctx = ctx;

        this.results = results;
        this.listContainer = listContainer;
        this.listImgView = listImgView;
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

                results += line;
            }
//            Log.d("Testeur", "Resultats du serveur: " + results);
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
        super.onPostExecute(s);

        Gson gson = new Gson();
        ResponseUserQueueId clients = gson.fromJson(s, (Type) ResponseUserQueueId.class);

        if (clients.getState() == 200 || clients.getState() == 201){
            listContainer.removeAllViews();
            for (ClientInsertInQueue c : clients.getUser_queue()){
                listImgView = new LinearLayout(ctx);
                listImgView.setOrientation(LinearLayout.VERTICAL);
                ImageView img = new ImageView(ctx);
                img.setLayoutParams(new ViewGroup.LayoutParams(200, 200));
                img.setImageResource(R.drawable.client);
                listImgView.addView(img);

                TextView textView = new TextView(ctx);
                textView.setText("" +c.getUser_queue_number());
                textView.setGravity(1);
                listImgView.addView(textView);
                listContainer.addView(listImgView);

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
            }
        }
    }
}
