package com.example.backend;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")// pozwala frontendowi łączyć się z backendem

public class Controller 
{

    @PostMapping("/form") // Endpoint POST
    public String handleForm(@RequestBody User user) 
    {   

        try
        {
            // bazą danych firebase  
            Firestore BazaDannych = FirestoreClient.getFirestore();
            // obiekt przechowujący dane
            Map<String, Object> DaneDB = new HashMap<>();
            // dodanie danych użytkownika 
            DaneDB.put("Imię", user.name);
            DaneDB.put("Nazwisko", user.surname);
            DaneDB.put("Email", user.email);
            DaneDB.put("Wiadomość", user.message);

        BazaDannych.collection("messages").add(DaneDB);

        System.out.println("Dane zapisane!");

        return "Dane zostały pomyślnie zapisane";


        } 
        catch (Exception e) 
        {   
            e.printStackTrace();
            return "Błąd zapisu";
        }
   
   
    }
}

 
//   .\mvnw.cmd spring-boot:run -- włącz serwer localnie
//   76981  y