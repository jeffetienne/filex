package com.example.filex_versionmobile;

import android.content.Context;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class Chronometer extends AppCompatActivity {

    Context ctx;

    Button btn_start_chrono;
    Button btn_stop_chrono;
    Button btn_resume_chrono;
    private long lastPause;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ctx = this;

        setContentView(R.layout.activity_chronometer);

        btn_start_chrono = findViewById(R.id.btn_start_chrono);
        btn_stop_chrono = findViewById(R.id.btn_stop_chrono);
        btn_resume_chrono = findViewById(R.id.btn_resume_chrono);

        android.widget.Chronometer simpleChronometer = (android.widget.Chronometer) findViewById(R.id.chrono);

//        Demarrage direct du chronometre
//        simpleChronometer.setBase(SystemClock.elapsedRealtime());
//        simpleChronometer.start();

        btn_start_chrono.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                simpleChronometer.setBase(SystemClock.elapsedRealtime());
                simpleChronometer.start();
            }
        });


        btn_stop_chrono.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                lastPause = SystemClock.elapsedRealtime();
                simpleChronometer.stop();
            }
        });


        btn_resume_chrono.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                simpleChronometer.setBase(simpleChronometer.getBase() + SystemClock.elapsedRealtime() - lastPause);
                simpleChronometer.start();
            }
        });

       /*

        Start your timer (assume the variable of your timer is crono):

        crono.setBase(SystemClock.elapsedRealtime());

        crono.start();

        Pause your timer each time using:

        lastPause = SystemClock.elapsedRealtime();

        crono.stop();

        Resume your timer each time using:

        crono.setBase(crono.getBase() + SystemClock.elapsedRealtime() - lastPause);

        crono.start();*/
    }
}