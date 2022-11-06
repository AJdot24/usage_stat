package at.ciit.usagestats;

import android.content.ComponentCallbacks2;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;

public interface UpdateStat extends ComponentCallbacks2 {
    @Nullable
    @org.jetbrains.annotations.Nullable
    IBinder onBind(Intent intent);

    int onStartCommand(Intent intent, int flags, int startId);

    void UpdateStat();
}
