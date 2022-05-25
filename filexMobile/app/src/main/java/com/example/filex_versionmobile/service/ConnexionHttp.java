package com.example.filex_versionmobile.service;

import android.os.AsyncTask;
import android.util.Log;

import androidx.annotation.Nullable;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;



public class ConnexionHttp extends AsyncTask<String, Nullable, String> {

    @Override
    protected String doInBackground(String... strings) {

        String retour = "";
        String route = "";
        URL url= null;
        HttpURLConnection urlConnection = null;
        String method = "GET";

        HashMap<String, String> params = new HashMap<String, String>();
        StringBuilder sbParams = new StringBuilder();
        int i = 0;
        for (String key : params.keySet()){

            try {
                if(i != 0){
                    sbParams.append("&");
                }
                sbParams.append(key).append("=").append(URLEncoder.encode(params.get(key), "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            i++;
        }
        try {
            url = new URL(" https://jsonplaceholder.typicode.com/posts");
            urlConnection = (HttpURLConnection) url.openConnection();

            if(method == "GET"){
                urlConnection.setRequestMethod(method);
                urlConnection.setDoInput(true);

                urlConnection.setDoOutput(false);
                urlConnection.connect();

                int responseCode = urlConnection.getResponseCode();

                if(responseCode == 200){
                    String answerLine;
                    BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                    while((answerLine = br.readLine()) != null){
                        retour += answerLine;
                        Log.d("HTTP-GET",retour);
                    }
                }
            }else if(method == "POST"){
                urlConnection.setRequestMethod(method);

                //urlConnection.setDoInput(true);
                urlConnection.setDoOutput(true);

                urlConnection.connect();

                String paramsString = sbParams.toString();
                int responseCode = urlConnection.getResponseCode();
                if(responseCode == 200){

                    DataOutputStream output = new DataOutputStream(urlConnection.getOutputStream());
                    output.writeBytes(paramsString);
                    output.flush();
                    output.close();

                    String answerLine;

                    BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                    StringBuilder result = new StringBuilder();

                    while((answerLine = reader.readLine()) != null){
                        result.append(answerLine);
                    }
                    Log.d("HTTP-POST", "Result from server:" + result.toString());
                }
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                url = new URL("https://jsonplaceholder.typicode.com/posts");
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            //URLConnection.getErrorStream(Returns the error stream if the connection failed but the server sent usefull data nonetheless)

        }

        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
    }
}
