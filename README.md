# Fischer Optix — Website

Statische Multi-Page-Website (HTML/CSS/JS, kein Build-Schritt nötig).

## Struktur
```
fischer-optix/
├── index.html          Start
├── arbeiten.html        Arbeiten (mit Kategorie-Filter: Event, Architektur, Street, Winter, Sommer, Cars)
├── projekte.html        Dienstleistungen & Projekte / Kooperationen
├── ueber-mich.html      Über mich
├── kontakt.html         Kontakt
├── css/style.css
├── js/main.js
└── images/              (leer — für deine Fotos)
```

## Auf GitHub Pages veröffentlichen
1. Neues Repository auf GitHub anlegen, z. B. `fischer-optix`.
2. Alle Dateien aus diesem Ordner in das Repository hochladen (Root-Ebene, `index.html` muss im Hauptverzeichnis liegen).
3. Im Repository: **Settings → Pages → Source** auf `main`-Branch und Ordner `/ (root)` stellen.
4. GitHub stellt die Seite dann unter `https://<benutzername>.github.io/fischer-optix/` bereit.
5. Eigene Domain (`fischer-optix.de`): Datei `CNAME` mit Inhalt `fischer-optix.de` ins Root-Verzeichnis legen und beim Domain-Anbieter einen CNAME- bzw. ALIAS-Eintrag auf `<benutzername>.github.io` setzen.

## Noch offen (bewusst als Platzhalter markiert)
- **Fotos:** Alle Bildflächen sind aktuell Platzhalter-Rahmen mit "Bild folgt". Eigene Bilder in `images/` ablegen und in den HTML-Dateien die `<div class="frame">`-Blöcke durch `<img src="images/dein-bild.jpg" alt="...">` ersetzen.
- **Bio-Text auf "Über mich":** Ist deutlich als Entwurf markiert ("Entwurf — bitte ersetzen"). Bitte durch deinen eigenen Text ersetzen.
- **Kontaktformular:** Nutzt aktuell `mailto:`, öffnet also das lokale E-Mail-Programm des Besuchers. Für ein Formular, das Nachrichten direkt an dein Postfach sendet ohne das Mail-Programm zu öffnen, empfiehlt sich ein kostenloser Dienst wie Formspree oder Web3Forms (Formular-`action` entsprechend anpassen).
- **Video-Einbettungen:** Auf der Projekte-Seite eingebunden über die YouTube-IDs, die auf deiner aktuellen Seite verlinkt sind (Cinema Ride, Sony TC-377).
