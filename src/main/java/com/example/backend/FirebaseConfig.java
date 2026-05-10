package com.example.backend;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
public class FirebaseConfig 
{ // metoda uruchamiana automatycznie po starcie aplikacji
    @PostConstruct
    public void initialize() 
    {
        try 
        { // wczytanie klucza firebase admin sdk z pliku json 

           File file = new File("/etc/secrets/project-715202589180821731-firebase-adminsdk");

            System.out.println("Sprawdzenie");
            System.out.println("Plik json exists: " + file.exists());
            System.out.println("Plik json getAbsolutePath: " + file.getAbsolutePath());

            if (!file.exists()) 
            {
                System.out.println("błąd sprawdzenia secret jsonu");
                return;
            }

          FileInputStream serviceAccount = new FileInputStream(file);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) 
            {
                FirebaseApp.initializeApp(options);
                System.out.println("Połączona baza danych Firebase");
            } 
            else 
            {
                System.out.println("Baza danych just była połączona");
            }
            
        } 
        catch (IOException e) 
        {   
            System.out.println("Błąd");
            e.printStackTrace();
        }
          
    }
}