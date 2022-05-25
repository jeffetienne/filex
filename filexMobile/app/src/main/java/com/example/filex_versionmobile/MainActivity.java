package com.example.filex_versionmobile;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.filex_versionmobile.service.AsyncCallBack;

public class MainActivity extends AppCompatActivity implements AsyncCallBack {

    private Context ctx;

    private LinearLayout ll_choix;
    private Button btn_client;
    private Button btn_employer;
    private TextView txtResultValue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        ctx = this;

        ll_choix = findViewById(R.id.ll_btn_choix);
        btn_client = findViewById(R.id.btn_client);
        btn_employer = findViewById(R.id.btn_employer);

        btn_client.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, Client_Connexion.class);
                startActivity(intent);
                finish();
            }
        });

        btn_employer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(MainActivity.this, Employe_connexion.class);
                startActivity(intent);
                finish();
            }

        });
    }
    
    @Override
    public void setResult(String result) {
        txtResultValue.setText(result);
    }
}

