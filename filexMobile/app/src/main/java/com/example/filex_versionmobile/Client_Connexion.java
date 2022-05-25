package com.example.filex_versionmobile;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.filex_versionmobile.service.ClientTask;
import com.example.filex_versionmobile.service.ConnexionHttp;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Client_Connexion extends AppCompatActivity {

    private Context ctx;

    private Button client_btn_valider;
    private EditText identifiant, idQueue;

    String clientEmailToText, clientEditText1, clientEditText2;

    public ConnexionHttp objetConnection = new ConnexionHttp();
    HttpURLConnection urlConnection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_client_connexion);

        ctx = this;

        client_btn_valider = findViewById(R.id.client_btn_valider);
        identifiant = findViewById(R.id.client_et_email);
        idQueue = findViewById(R.id.client_et_id_queue);

        client_btn_valider.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new ClientTask(identifiant.getText().toString(), Integer.parseInt(idQueue.getText().toString()), ctx).execute();
            }
        });

        // utilisation de TextWatcher pour changer l'etat du bouton client_btn_valider, en fonction du nombre de caracteres dans l'EditText identifiant (client_et_email)
        identifiant.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                clientProcessButtonByTextLength();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        // utilisation de TextWatcher pour changer l'etat du bouton client_btn_valider, en fonction du nombre de caracteres dans l'EditText idQueue (client_et_id_queue)
        idQueue.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                clientProcessButtonByTextLength();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

    }

    class ClientConnection extends AsyncTask<String, Nullable, String> {


        @Override
        protected String doInBackground(String... strings) {
            String msg1 = "";
            String params = "";
            int id = 0;
            URL url = null;

            String urlUser = "http://198.50.190.236:8080/user";

            //affiche tout les categories
            try {
                if (strings.length > 0) {
                    id += Integer.parseInt(strings[0]);

                    urlUser += "/" + "" + id;
                    url = new URL(urlUser);
                } else {

                    url = new URL(urlUser);
                }

                //Log.d("confirm", "" + strings.length);

                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.getRequestMethod();
                String line = null;
                if (urlConnection.getResponseCode() == 200) {
                    InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                    while ((line = reader.readLine()) != null) {
                        msg1 += line;

                    }

                }


            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return msg1;
        }

        @Override
        protected void onPostExecute(String s) {

        }
    }

    // Activer ou desactiver le bouton client_btn_valider, en fonction du nombre de caracteres dans les TextView identifiant (client_et_email) et idQueue (client_et_id_queue)
    private void clientProcessButtonByTextLength() {

        clientEmailToText = identifiant.getText().toString();

        clientEditText1 = identifiant.getText().toString();
        clientEditText2 = idQueue.getText().toString();

        if (!clientEditText1.isEmpty() && Patterns.EMAIL_ADDRESS.matcher(clientEditText1).matches() && clientEditText1.length() > 0 && clientEditText2.length() > 0 && clientEditText2.length() < 2) {
            client_btn_valider.setEnabled(true);
        } else {
            client_btn_valider.setEnabled(false);
        }
    }

}