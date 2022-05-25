package com.example.filex_versionmobile.entite;

import java.util.ArrayList;
public class ResponseUserQueueId {
    private int state;
    private ClientInsertInQueue[] user_queues;

    public ResponseUserQueueId() {
    }

    public ResponseUserQueueId(int state, ClientInsertInQueue[] user_queues) {
        this.state = state;
        this.user_queues = user_queues;
    }


    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public ClientInsertInQueue[] getUser_queue() {
        return user_queues;
    }

    public void setUser_queue(ClientInsertInQueue[] user_queue) {
        this.user_queues = user_queue;
    }
}
