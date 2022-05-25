package com.example.filex_versionmobile.vue;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.filex_versionmobile.R;

import java.io.IOException;
import java.io.InputStream;

public class Client_dans_la_file_view extends LinearLayout {

    Context ctx;

    ImageView employe_gestion_file_iv_logoClient;


    public Client_dans_la_file_view(Context context) {
        super(context);

        // 0. deserialiser / inflater le XML -> activity_client_dans_la_file_view
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.activity_client_dans_la_file_view, this);

        // 1. mettre la main sur ImageView -> employe_gestion_file_iv_logoClient
        employe_gestion_file_iv_logoClient = findViewById(R.id.employe_gestion_file_iv_logoClient);

        // 2. setter / modifier ImageView -> employe_gestion_file_iv_logoClient
        try {
            InputStream inSt = ((Activity) context).getAssets().open("logoClient/client.png");
            Bitmap bm = BitmapFactory.decodeStream(inSt);
            employe_gestion_file_iv_logoClient.setImageBitmap(bm);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}