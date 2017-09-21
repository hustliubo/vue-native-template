package me.tom.vue.template;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import {{PackageName}}.R;
import me.tom.jsbridgewebview.JsBridgeWebView;

public class MainActivity extends AppCompatActivity {

    private JsBridgeWebView mWebView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = (JsBridgeWebView) findViewById(R.id.webView);
        mWebView.loadUrl("file:///android_asset/www/index.html");
    }
}