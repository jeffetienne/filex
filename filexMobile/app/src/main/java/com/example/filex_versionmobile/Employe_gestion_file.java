package com.example.filex_versionmobile;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.filex_versionmobile.service.ClientQueueTask;
import com.example.filex_versionmobile.service.ClientSuivantTask;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Timer;
import java.util.TimerTask;

public class Employe_gestion_file extends AppCompatActivity {

    Context ctx;

    LinearLayout ll_client_file, ll_custom_vue, bonhomme_container;
    TextView employe_gestion_file_tv_nombreClientsInfos, numEnCoursInfos, employe_gestion_file_tv_numEnCoursInfos, employe_gestion_file_tv_tempsMoyenInfos, employe_gestion_file_tv_tempsMoyenCalculeInfos;
    Button clientSuivant;

    Timer timer = null;
    TimerTask task = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ctx = this;

        // 0.deserialiser le XML
        setContentView(R.layout.activity_employe_gestion_file);
        bonhomme_container = findViewById(R.id.liste_clients);

        // 1.mettre la main sur les elements
        employe_gestion_file_tv_nombreClientsInfos = findViewById(R.id.employe_gestion_file_tv_nombreClientsInfos);
//        employe_gestion_file_tv_numEnCoursInfos = findViewById(R.id.employe_gestion_file_tv_numEnCoursInfos);
//        employe_gestion_file_tv_tempsMoyenInfos = findViewById(R.id.employe_gestion_file_tv_tempsMoyenInfos);
//        employe_gestion_file_tv_tempsMoyenCalculeInfos = findViewById(R.id.employe_gestion_file_tv_tempsMoyenCalculeInfos);
        ll_client_file = findViewById(R.id.client_gestion_file_llh_fileClients);
        ll_custom_vue = findViewById(R.id.employe_gestion_file_llv_fileClients);
        numEnCoursInfos = findViewById(R.id.numEnCoursInfos);
        clientSuivant = findViewById(R.id.employe_gestion_file_btn);


        final Handler handler = new Handler();

        timer = new Timer();

        task = new TimerTask() {
            @Override
            public void run() {
                handler.post(new Runnable() {
                    public void run() {

                        new ClientQueueTask(ctx, bonhomme_container, ll_custom_vue).execute("1");

                        // Afficher la liste des clients dans la file
                        employe_gestion_file_tv_nombreClientsInfos.setText("" + bonhomme_container.getChildCount());

                        // activer ou desactiver le bouton clientSuivant : employe_gestion_file_btn, si il y a des clients dans la file
                        if (bonhomme_container.getChildCount() > 0) {
                            clientSuivant.setEnabled(true);
                        } else {
                            clientSuivant.setEnabled(false);
                        }

                    }
                });
            }
        };
        timer.schedule(task, 0, 500); //Every 1/2 second

        clientSuivant.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog dialog = new AlertDialog.Builder(ctx)
                        .setTitle("Client suivant")
                        .setMessage("Veuillez confirmer la présence du prochain client dans la file")
                        .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                String param = "1";
                                new ClientSuivantTask(ctx, param, bonhomme_container, ll_custom_vue, numEnCoursInfos, employe_gestion_file_tv_nombreClientsInfos).execute();
                            }
                        })
                        .setNeutralButton("Annuler", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                            }
                        })
//                        .setNegativeButton(android.R.string.no, null)
                        .create();
//                dialog.setOnShowListener(new DialogInterface.OnShowListener() {
//                    private static final int AUTO_DISMISS_MILLIS = 30000;
//
//                    public void onShow(final DialogInterface dialog) {
//                        final Button defaultButton = ((AlertDialog) dialog).getButton(AlertDialog.BUTTON_NEGATIVE);
//                        final CharSequence negativeButtonText = defaultButton.getText();
//                        new CountDownTimer(AUTO_DISMISS_MILLIS, 100) {
//                            @Override
//                            public void onTick(long millisUntilFinished) {
//                                defaultButton.setText(String.format(
//                                        Locale.getDefault(), "%s (%d)",
//                                        "Absent",
//                                        TimeUnit.MILLISECONDS.toSeconds(millisUntilFinished) + 1 // on ajoute un ( + 1 ), pour ne jamais voir le zéro s'afficher
//                                ));
//                            }
//
//                            @Override
//                            public void onFinish() {
//                                if (((AlertDialog) dialog).isShowing()) {
//                                    dialog.dismiss();
//                                }
//                            }
//                        }.start();
//
//                    }
//                });
                dialog.show();
            }
        });
    }

    class MyTask extends AsyncTask<String, Nullable, String> {
        @Override
        protected String doInBackground(String... strings) {
            String retour = "";
            try {
                URL url = new URL("http://192.168.1.30:8080/login");

                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

                urlConnection.setRequestMethod("GET");

                urlConnection.setDoInput(true);
                urlConnection.setDoOutput(false);

                urlConnection.connect();

                String result;

                BufferedInputStream bis = new BufferedInputStream(urlConnection.getInputStream());
                ByteArrayOutputStream buf = new ByteArrayOutputStream();

                int result2 = bis.read();

                while (result2 != -1) {
                    buf.write((byte) result2);
                    result2 = bis.read();
                }
                result = buf.toString();

                int reponseCode = urlConnection.getResponseCode();
                //Log.d("Result", String.valueOf(reponseCode));

                if (reponseCode == 200) {
                    String line;
                    BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                    while ((line = br.readLine()) != null) {
                        retour += line;
                        //Log.d("test", line);
                    }
                }

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return retour;
        }
    }

    // DEBUT MENU

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

//        String text = "";

        switch (item.getItemId()) {
            case R.id.menu_accueil:
                Intent intent = new Intent(Employe_gestion_file.this, MainActivity.class);
                startActivity(intent);
                break;
//            case R.id.menu_arreter:
//                if (bonhomme_container.getChildCount() > 0) {
//                    bonhomme_container.removeAllViewsInLayout();
//                    text = "La file a été arrêtée";
//                } else {
//                    text = "La file est actuellement vide";
//                }
//                break;
        }

//        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();

        return true;
    }

    // FIN MENU

}