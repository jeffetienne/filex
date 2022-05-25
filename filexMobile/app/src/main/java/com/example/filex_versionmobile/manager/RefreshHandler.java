package com.example.filex_versionmobile.manager;

import android.os.Handler;
import android.os.Message;

import androidx.annotation.NonNull;

import io.grpc.okhttp.internal.framed.FrameReader;

public class RefreshHandler implements Handler.Callback {
    @Override
    public boolean handleMessage(@NonNull Message message) {
        return false;
    }

}
