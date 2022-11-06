package at.ciit.usagestats;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class LoginActivity extends AppCompatActivity {
    DatabaseReference db = FirebaseDatabase.getInstance().getReferenceFromUrl("https://usage-stats-828c8-default-rtdb.firebaseio.com/");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        //parent Name = Phone
        final EditText parentname = findViewById(R.id.parent_id);
        final EditText childname = findViewById(R.id.child_name);
        final Button login_btn = findViewById(R.id.login);
        final TextView registerNowBtn = findViewById(R.id.registerNowBtn);

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String parentnameTxt = parentname.getText().toString();
                final String childnameTxt = childname.getText().toString();

                if(parentnameTxt.isEmpty() || childnameTxt.isEmpty()){
                    Toast.makeText(LoginActivity.this,"Please enter your Parent and Child ID",Toast.LENGTH_SHORT).show();
                }
                else{
                    db.child("users").addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot snapshot) {

                            if(snapshot.hasChild(parentnameTxt)){

                                final String getChild =snapshot.child(parentnameTxt).child("childdetails").child("name").getValue(String.class);

                                if(getChild.equals(childnameTxt)){

                                    startActivity(new Intent(LoginActivity.this,MainActivity.class));
                                    finish();
                                    Toast.makeText(LoginActivity.this,"Successfully Logged in",Toast.LENGTH_SHORT).show();
                                    Intent passvalue =new Intent(LoginActivity.this,MainActivity.class);
                                    passvalue.putExtra("phone",parentnameTxt);
                                    passvalue.putExtra("childname",getChild);
                                    startActivity(passvalue);



                                }
                                else {
                                    Toast.makeText(LoginActivity.this,"Incorrect Password",Toast.LENGTH_SHORT).show();
                                }
                            }
                            else{
                                Toast.makeText(LoginActivity.this,"Incorrect Password",Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError error) {

                        }
                    });
                }
            }
        });
       registerNowBtn.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               startActivity(new Intent(LoginActivity.this,Register.class));
           }
       });

    }
}