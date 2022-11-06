package at.ciit.usagestats;

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

public class Register extends AppCompatActivity {
    DatabaseReference db = FirebaseDatabase.getInstance().getReferenceFromUrl("https://usage-stats-828c8-default-rtdb.firebaseio.com/");
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        final EditText parentname = findViewById(R.id.parent_id);
        final EditText childname = findViewById(R.id.child_name);
        final EditText pemail = findViewById(R.id.P_Email);
        final EditText phone = findViewById(R.id.phone);
        final EditText password = findViewById(R.id.password);
        final EditText confpassword = findViewById(R.id.conf_password);

        final Button registerBtn = findViewById(R.id.register);
        final TextView loginNowBtn = findViewById(R.id.loginNowBtn);

        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String parentnameTxt = parentname.getText().toString();
                final String childnameTxt = childname.getText().toString();
                final String pemailTxt = pemail.getText().toString();
                final String phoneTxt = phone.getText().toString();
                final String passwordTxt = password.getText().toString();
                final String confpasswordTxt = confpassword.getText().toString();


                if(parentnameTxt.isEmpty() || childnameTxt.isEmpty() || pemailTxt.isEmpty() || phoneTxt.isEmpty() || passwordTxt.isEmpty() || confpasswordTxt.isEmpty()){
                    Toast.makeText(Register.this,"Please fill all fields",Toast.LENGTH_SHORT).show();
                }
                else if (!passwordTxt.equals(confpasswordTxt)){
                    Toast.makeText(Register.this,"Password doesn't Match",Toast.LENGTH_SHORT).show();
                }
                else{
                    db.child("users").addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot snapshot) {


                            if(snapshot.hasChild(phoneTxt)){
                                Toast.makeText(Register.this,"Phone Number Already Exists",Toast.LENGTH_SHORT).show();
                            }
                            else{
                                db.child("users").child(phoneTxt).child("parentname").setValue(parentnameTxt);
                                db.child("users").child(phoneTxt).child("childdetails").child("childname").setValue(childnameTxt);
                                db.child("users").child(phoneTxt).child("Usage");
                                db.child("users").child(phoneTxt).child("pemail").setValue(pemailTxt);
                                db.child("users").child(phoneTxt).child("password").setValue(passwordTxt);

                                Toast.makeText(Register.this,"Successfully Registered",Toast.LENGTH_SHORT).show();
                                finish();
                            }
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError error) {

                        }
                    });


                }
                
            }
        });
        loginNowBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

    }
}