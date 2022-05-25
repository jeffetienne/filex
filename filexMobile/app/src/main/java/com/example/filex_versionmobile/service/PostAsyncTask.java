package com.example.filex_versionmobile.service;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ProgressBar;

import androidx.annotation.Nullable;

import com.example.filex_versionmobile.Client_Connexion;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class PostAsyncTask extends AsyncTask<String, Nullable, String> {

    private Client_Connexion activity;
    private AsyncCallBack asyncCallBack;
    private ProgressBar progressBar;

    public PostAsyncTask setInstance(Context context){
        this.activity = (Client_Connexion) context;
        asyncCallBack = (AsyncCallBack) context;
        return this;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        //progressBar.setVisibility(View.VISIBLE);
    }

    @Override
    protected String doInBackground(String... strings) {
        String response = "";
        BufferedReader reader = null;
        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/posts");
            String data = strings [0];
            URLConnection conn = url.openConnection();
            conn.setDoOutput(true);
            conn.connect();
            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(data);
            wr.flush();

            reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;

            while ((line = reader.readLine()) != null){
                sb.append(line + "\n");
            }

            response = sb.toString();
            Log.d("Response content", response);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try{

                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //progressBar.setVisibility(View.GONE);
                    }
                });

                reader.close();

            }catch(Exception ex){

            }

        }
        return response;
    }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        //asyncCallBack.setResult(result);
    }
}
