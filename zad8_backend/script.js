// 76981

// deklaracja zmiennych 
const buttonStyl = document.getElementById("Button_Styl");
const Styl = document.getElementById("Css_Styl");
const buttonUkryj = document.getElementById("Button_Ukryj");
const sekcja = document.getElementById("Sekcja_Kontakt");
//zad4
const inpImie = document.getElementById("idimie"); // inpImie = Input imie z index.html. 76981
const inpNazwisko = document.getElementById("idnazwisko");  
const inpEmail = document.getElementById("idemail");
const inpWiadomosc = document.getElementById("idwiadomosc");
//zad5
const umiejetnosciList = document.getElementById("ulUmiejetnosci");
const projektyList = document.getElementById("ulProjekty");
//zad6
const inpNotatka = document.getElementById("inpNotatka");

 

// zad 4
buttonUkryj.addEventListener("click", () => {
    if (sekcja.style.display === "none") {
        buttonUkryj.textContent="Ukryj sekcję Kontakt";
        sekcja.style.display = "block";
    } else {
        buttonUkryj.textContent="Pokaż sekcję Kontakt";
        sekcja.style.display = "none";
    }
});

buttonStyl.addEventListener("click", () => {
    if (Styl.getAttribute("href") === "red.css") {
        Styl.setAttribute("href", "green.css");
    } else {
        Styl.setAttribute("href", "red.css");
    }
});

// zad 5
function funcSprawdzenieDanych()
{
    let valImie = inpImie.value;
    let valNazwisko = inpNazwisko.value;
    let valEmail = inpEmail.value;
    let valWiadomosc = inpWiadomosc.value;

    let errortext;
    // sprawdzenie czy użytkownik wprowadzil dane w polach 76981
    if(valImie === "" || valNazwisko === "" || valEmail === "" || valWiadomosc === "") {  
        errortext = "ERROR: Wszystkie pola muszą być wypełnione!";
    } 
    else if(/\d/.test(valImie))
    {
        errortext = "ERROR: Pole imię nie może zawierać cyfr!";
    }
    else if(/\d/.test(valNazwisko))
    {
        errortext = "ERROR: Nazwisko nie może zawierać cyfr!";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valEmail)) { // uzycie regex do walidacji  email
                                                                    // " [^\s@] " = nie musi zawierac symbola @ lub SPACJI (to jest nazwa email)
                                                                    // " + @" następne musi byc symbol @ (n.p: user76981@...) 
                                                                    // po " @ " mam [^\s@] bez " + " bo można używac tylko 1 symbol @
                                                                    // teraz mamy (user76981@gmail)
                                                                    // " + \." kropka (user76981@gmail.)
                                                                    // po "\." sprawdzenie ostatnie: nie uzywac "spacji" lub "@" [^\s@]
                                                                    //  (user76981@gmail.com)

        errortext = "ERROR: Niepoprawny adres email!";
    }
    else {
        errortext = "Wiadomość została wysłana.";
    }


   document.getElementById("errorProvider").textContent = errortext;
}

// Zad6
fetch("dane.json")// pobranie pliku dane.json
  .then(res => res.json())
  .then(data => {



    // przejście przez wszystkie umiejętności
    data.umiejetnosci.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        umiejetnosciList.appendChild(li);
    });

    // przejście przez wszystkie projekty
    data.projekty.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        projektyList.appendChild(li);
    });

  });


// zad 7
  window.onload = function ()
    {
    wczytajNotatki();
    };

function funcNotatka() 
    {
 
    const txtNotatka = inpNotatka.value;
    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];
    notatki.push(txtNotatka);

    localStorage.setItem("notatki", JSON.stringify(notatki));

    inpNotatka.value = "";
    wczytajNotatki();
    }

function wczytajNotatki() 
    {
    const ul = document.getElementById("ulNotatka");
    ul.innerHTML = "";

    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];

    notatki.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        const btnZad7 = document.createElement("button");
        btnZad7.textContent = "Usuń notatkę";
        btnZad7.classList.add("classBtnNotatka");
        btnZad7.onclick = () => usunNotatke(index);

        li.appendChild(btnZad7);
        ul.appendChild(li);
    });
    }

function usunNotatke(index)
    {
    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];

    notatki.splice(index, 1);

    localStorage.setItem("notatki", JSON.stringify(notatki));
    wczytajNotatki();
    }
 



    //zad 8
    function btnWyslijBackEnd() {
    const imie = document.getElementById("idimie").value;
    const nazwisko = document.getElementById("idnazwisko").value;
    const email = document.getElementById("idemail").value;
    const wiadomosc = document.getElementById("idwiadomosc").value;

    console.log("BTNWYSLIJ");
    // Wysłanie danych do backendu spring Boot na render
    fetch("https://seven6981-repozytorium-zadaniowe.onrender.com/api/form",
    {
        method: "POST",
        headers:  // Wysyłamy dane w formacie json
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify  // zamiane danych JavaScript na format json
        ({
            name: imie,
            surname: nazwisko,
            email: email,
            message: wiadomosc
        })
    }
     // odczyt odpowiedzi tekstowej z backendu, jej wyświetlenie 
    )
    .then(function(backRespons)
    {
        return backRespons.text();
    })

    .then(function(Dane)
    {
        alert("BackEnd: " + Dane);
    })
}

// https://project-715202589180821731.web.app
// 76981