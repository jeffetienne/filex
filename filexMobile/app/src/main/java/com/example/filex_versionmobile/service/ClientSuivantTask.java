package com.example.filex_versionmobile.service;

import android.content.Context;
import android.graphics.Color;
import android.os.AsyncTask;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.filex_versionmobile.R;
import com.example.filex_versionmobile.entite.ResponseUserQueueId;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

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

public class ClientSuivantTask extends AsyncTask<String, Nullable, String> {

    Context ctx;

    String resultat;
    String queue_id;
    LinearLayout ll_container_client_in_queue;
    LinearLayout ll_next_custom_view;
    TextView textView, nbClients;


    public ClientSuivantTask(Context ctx, String queue_id, LinearLayout ll_container_client_in_queue, LinearLayout ll_next_custom_view, TextView textView, TextView nbClients) {
        this.ctx = ctx;
        this.resultat = "";
        this.queue_id = queue_id;
        this.ll_container_client_in_queue = ll_container_client_in_queue;
        this.ll_next_custom_view = ll_next_custom_view;
        this.textView = textView;
        this.nbClients = nbClients;
    }

    @Override
    protected String doInBackground(String... strings) {
        //String param = "";

        if (strings.length > 0) {

        } else {
           // ca vt dire que la requte est en post et les params sont dans le corps

            //creation d'un hashmap pour inserer les donnees
            HashMap<String, String> params = new HashMap<>();
            params.put("queue_id", queue_id);

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

                HttpURLConnection conn = null;
                try {

                    //URL urlObj = new URL("http://198.50.190.236:8080/user_queue/" + params);
                    String urlenPut = "http://198.50.190.236:8080/user_queue/" ;
                    URL urlObj = new URL(urlenPut);
                    conn = (HttpURLConnection) urlObj.openConnection();
                    conn.setDoOutput(true);
                    conn.setRequestMethod("PUT");
                    conn.setRequestProperty("Accept-Charset", "UTF-8");
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
                    String line = "";
                    while ((line = reader.readLine()) != null) {
                     result.append(line);
                        resultat += result;
                    }
                    Log.d("test", "server results:" + resultat);
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (conn != null) {
                        conn.disconnect();
                    }
                }

            }

        }
        return resultat;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        try {
            Gson gson = new Gson();
            ResponseUserQueueId clients = gson.fromJson(s, (Type) ResponseUserQueueId.class);

            if(clients.getState() == 200){
                JSONObject object = new JSONObject(resultat);
                JSONObject user_queue = object.getJSONObject("user_queue");
                Log.d("NextClient", user_queue.getString("user_queue_number"));
                String textValue = user_queue.getString("user_queue_number");
                textView.setText(textValue);
                ImageView img = new ImageView(ctx);
                img.setLayoutParams(new ViewGroup.LayoutParams(200, 200));
                img.setImageResource(R.drawable.client);
                ll_next_custom_view = new LinearLayout(ctx);
                ll_next_custom_view.addView(img);
            } else if (clients.getState() == 500) {
                ll_container_client_in_queue.removeAllViews();
                nbClients.setText("0");
                nbClients.setTextColor(Color.RED);
                textView.setText("0");
                textView.setTextColor(Color.RED);

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
