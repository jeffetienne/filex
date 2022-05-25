package com.example.androidhttp;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public static void handleClickButton(View view){
        new MyTask().execute();
    }
}

class MyTask extends AsyncTask<String, Nullable, String>{
    @Override
    protected String doInBackground(String... strings) {
        String retour = "";
        try {
            URL url = new URL("https://android-lab.herokuapp.com");
            // OU, par exemple : URL url = new URL("https://android-lab.herokuapp.com/connection");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setDoInput(true);

            urlConnection.setDoOutput(false);
            urlConnection.connect();

            OutputStream os = urlConnection.getOutputStream();
            OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
            osw.write("Just Some Text");
            osw.flush();
            osw.close();
            os.close();  //don't forget to close the OutputStream
            urlConnection.connect();

//read the inputstream and print it
            String result;
            BufferedInputStream bis = new BufferedInputStream(urlConnection.getInputStream());
            ByteArrayOutputStream buf = new ByteArrayOutputStream();
            int result2 = bis.read();
            while(result2 != -1) {
                buf.write((byte) result2);
                result2 = bis.read();
            }
            result = buf.toString();


            int reponseCode = urlConnection.getResponseCode();
            if (reponseCode == 200) {
                String line;
                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                while ((line = br.readLine()) != null) {
                    retour += line;
                    Log.d("lol", line);
                }
            }


        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return retour;
    }
    @Override
    protected void onPostExecute(String s) {
        Log.d("debugApp", s);

    }
}