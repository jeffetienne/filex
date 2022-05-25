package com.example.filex_versionmobile;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.filex_versionmobile.service.ClientQueueTask;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Timer;
import java.util.TimerTask;

public class Client_Accueil extends AppCompatActivity {

    Context ctx;

    LinearLayout ll_file_clients, ll_custom_vue;
    TextView client_gestion_file_tv_nombreClientsInfos;
    Button client_btn_retirer;
    Timer timer = null;
    TimerTask task = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_client_accueil);

        ctx = this;

        ll_file_clients = findViewById(R.id.liste_clients);
        client_gestion_file_tv_nombreClientsInfos = findViewById(R.id.client_gestion_file_tv_nombreClientsInfos);
        ll_custom_vue = findViewById(R.id.employe_gestion_file_llv_fileClients);
        client_btn_retirer = findViewById(R.id.client_btn_retirer);

        final Handler handler = new Handler();

        timer = new Timer();

        task = new TimerTask() {
            @Override
            public void run() {
                handler.post(new Runnable() {
                    public void run() {

                        new ClientQueueTask(ctx, ll_file_clients, ll_custom_vue).execute("1");

                        client_gestion_file_tv_nombreClientsInfos.setText("" + ll_file_clients.getChildCount());

                        // activer ou desactiver le bouton clientSuivant : client_btn_retirer, si il y a des clients dans la file
                        if (ll_file_clients.getChildCount() > 0) {
                            client_btn_retirer.setEnabled(true);
                        } else {
                            client_btn_retirer.setEnabled(false);
                        }

                    }
                });
            }
        };
        timer.schedule(task, 0, 500); //Every 1/2 second

        client_btn_retirer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                builder.setTitle("Nous sommes désolés de vous voir partir");
                builder.setMessage("Voulez-vous vraiment vous retirer de la file d'attente ?");
                builder.setNegativeButton("Oui", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        new MyTask().execute();
                        Toast.makeText(ctx, "Nous espérons vous revoir bientôt", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(Client_Accueil.this, Client_Connexion.class);
                        startActivity(intent);
                        finish();

                    }
                });

                builder.setPositiveButton("Non", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(ctx, "Merci de patienter ce sera bientôt votre tour", Toast.LENGTH_LONG).show();
                    }
                });
                builder.show();
            }
        });
    }
}

class MyTask extends AsyncTask<String, Nullable, String> {
    @Override
    protected String doInBackground(String... strings) {
        String retour = "";

        try {

            URL url = new URL("198.50.190.236:4289/");

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            urlConnection.setRequestMethod("GET");

            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(false);

            urlConnection.connect();

            int reponseCode = urlConnection.getResponseCode();

            if (reponseCode == 200) {
                String line;
                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                while ((line = br.readLine()) != null) {
                    retour += line;
//                    Log.d("test", line);
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
//        Log.d("debugApp", s);

    }
}