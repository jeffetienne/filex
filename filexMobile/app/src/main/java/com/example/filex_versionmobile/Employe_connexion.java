package com.example.filex_versionmobile;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.filex_versionmobile.entite.Credentials;
import com.example.filex_versionmobile.service.EmployeTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

//import com.google.gson.Gson;

public class Employe_connexion extends AppCompatActivity {

    private ArrayList<String> utilisateurs = new ArrayList<>();

    Context ctx;

    EditText employe_connexion_et_userEmail, employe_connexion_et_password;
    Button employe_connexion_btn;
    LinearLayout ll_container;
    TextView tv_msg;

    String employeEmailToText, employeEditText1, employeEditText2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ctx = this;

        // 0.deserialiser le XML
        setContentView(R.layout.activity_employe_connexion);

        employe_connexion_et_userEmail = findViewById(R.id.employe_connexion_et_userEmail);
        employe_connexion_et_password = findViewById(R.id.employe_connexion_et_password);
        employe_connexion_btn = findViewById(R.id.employe_connexion_btn);

        employe_connexion_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new EmployeTask(employe_connexion_et_userEmail.getText().toString(), employe_connexion_et_password.getText().toString(), ctx, ll_container, tv_msg).execute();
            }
        });

        // utilisation de TextWatcher pour changer l'etat du bouton client_btn_valider, en fonction du nombre de caracteres dans l'EditText identifiant (client_et_email)
        employe_connexion_et_userEmail.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                employeProcessButtonByTextLength();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        // utilisation de TextWatcher pour changer l'etat du bouton client_btn_valider, en fonction du nombre de caracteres dans l'EditText idQueue (client_et_id_queue)
        employe_connexion_et_password.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                employeProcessButtonByTextLength();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

    }

    public void getJsonData() throws IOException, JSONException {
        String jsonData;
        InputStream is = getAssets().open("login.txt");
        int size = is.available();
        byte[] buffer = new byte [size];
        is.read(buffer);
        is.close();

        jsonData = new String (buffer, "UTF-8");
        JSONArray jsonArray = new JSONArray(jsonData);

        for(int i = 0; i< jsonArray.length(); i++){
            JSONObject obj = jsonArray.getJSONObject(i);
            if(obj.getString("email").equals("ornella@yahoo.fr")){
                utilisateurs.add(obj.getString("user_id"));

            }
        }

        Toast.makeText(ctx, utilisateurs.toString(), Toast.LENGTH_SHORT).show();
    }

    class MyTask extends AsyncTask<String, Nullable, String> {
        @Override
        protected String doInBackground(String... strings) {
            String retour = "";
            Credentials credentials = new Credentials();
            credentials.email = employe_connexion_et_userEmail.getText().toString();
            credentials.pwd = employe_connexion_et_password.getText().toString();
            try {
                URL url = new URL("http://192.168.60.81:8080/login");
                // OU, par exemple : URL url = new URL("http://192.168.60.81:8080/comptes");
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("POST");
                urlConnection.setDoInput(true);

                urlConnection.setDoOutput(true);
                urlConnection.connect();

                JSONObject cred = new JSONObject();
                cred.put("email",credentials.email);
                cred.put("pwd", credentials.pwd);

                DataOutputStream localDataOutputStream = new DataOutputStream(urlConnection.getOutputStream());
                localDataOutputStream.writeBytes(cred.toString());
                localDataOutputStream.flush();
                localDataOutputStream.close();
                urlConnection.connect();

//read the inputstream and print it
                String result;
                BufferedInputStream bis = new BufferedInputStream(urlConnection.getInputStream());
                ByteArrayOutputStream buf = new ByteArrayOutputStream();
                int result2 = bis.read();
                while (result2 != -1) {
                    buf.write((byte) result2);
                    result2 = bis.read();
                }
                result = buf.toString();

                Log.d("Result", result);

                int reponseCode = urlConnection.getResponseCode();
                Log.d("Result", String.valueOf(reponseCode));

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
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return retour;
        }
    }
    public void emailValidator(EditText etMail) {

        String emailToText = etMail.getText().toString();

        if (!emailToText.isEmpty() && Patterns.EMAIL_ADDRESS.matcher(emailToText).matches()) {
            //Toast.makeText(this, "Courriel valide !", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(Employe_connexion.this, Employe_gestion_file.class);
            startActivity(intent);
        } else {
            //Toast.makeText(this, "Entrez une adresse courriel valide ! ...", Toast.LENGTH_SHORT).show();
        }
    }

    // Activer ou desactiver le bouton client_btn_valider, en fonction du nombre de caracteres dans les TextView employe_connexion_et_userEmail et employe_connexion_et_password
    private void employeProcessButtonByTextLength() {

        employeEmailToText = employe_connexion_et_userEmail.getText().toString();

        employeEditText1 = employe_connexion_et_userEmail.getText().toString();
        employeEditText2 = employe_connexion_et_password.getText().toString();

        if (!employeEditText1.isEmpty() && Patterns.EMAIL_ADDRESS.matcher(employeEditText1).matches() && employeEditText1.length() > 0 && employeEditText2.length() > 0) {
            employe_connexion_btn.setEnabled(true);
        } else {
            employe_connexion_btn.setEnabled(false);
        }
    }

}