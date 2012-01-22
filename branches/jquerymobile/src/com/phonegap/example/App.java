package com.phonegap.example;

import android.os.Bundle;
import android.view.View;

import com.phonegap.*;

public class App extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);        
        super.loadUrl("file:///android_asset/www/index.html");
        // Disable scrollbars 
        super.appView.setVerticalScrollBarEnabled(false);
        super.appView.setHorizontalScrollBarEnabled(false);

        // Scrollbar Overlay Content
         super.appView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
    }
}