# IPTV Neo (iOS) 📱✨

En modern, elegant IPTV-klient för iPhone och iPad inspirerad av **Apple TV**, **Infuse** och **Netflix**. Ersätter IPTV Smarters Pro med ett modernt mörkt UI, flytande glasövergångar (*glassmorphism*) och en skräddarsydd videospelare.

---

## 🌟 Funktioner

* **Xtream Codes API**: Fullt stöd för server-URL, användarnamn och lösenord med automatisk avläsning av utgångsdatum och max antal anslutningar.
* **M3U / M3U8 Spellistor**: Snabb lokal parser som extraherar kanallogotyper, EPG-id:n och kategorier.
* **Live TV Hub**:
  * Horisontella kategoriflikar (Sverige HD, Sport, Film & Serier, Nyheter etc.).
  * Blixtsnabb sökning på kanalnamn och kanalnummer.
  * Favoritsystem med lokal sparning och haptisk feedback.
  * "Direkt"-indikatorer och EPG-tablå.
* **VOD Hub (Filmer & Serier)**:
  * Netflix-liknande hemvy med stor "Utvalt just nu"-herobanner.
  * 3-kolumnigt affischrutnät med IMDb-betyg och släppår.
  * Detaljvy för filmer med handling och 4K HDR-upplösningsindikatorer.
  * Detaljvy för serier med säsongsväljare och avsnittslista.
* **Professionell Videospelare**:
  * Automatisk rotation till helskärm i landskapsläge.
  * **Snabbkanalväljare (Zapping)**: Byt livekanal direkt inuti spelaren utan att lämna helskärmsläget!
  * Frostat glaskontrollfält med autogömning efter 4 sekunder.
  * Spola framåt/bakåt 10 sekunder med precision.
  * Bildförhållandeväljare (*Fit*, *Fill*, *16:9*).
  * Stöd för bakgrundsljud och Picture-in-Picture (PiP).
* **Snabbstart / Demoläge**:
  * Förinstallerat med fungerande HLS-testströmmar så att du kan provköra appen och spelaren omedelbart på din iPhone utan att behöva skriva in inloggningsuppgifter först.

---

## 🚀 Hur du startar appen på din iPhone

### Steg 1: Installera Expo Go på din iPhone
Ladda ner gratisappen **Expo Go** från Apple App Store på din iPhone:
👉 Sök efter "Expo Go" i App Store eller hämta den via Apples länk.

### Steg 2: Starta utvecklingsservern
Öppna PowerShell i projektmappen och kör:
```powershell
cd "F:\AI projekt\iptv-app"
npx expo start
```

### Steg 3: Scanna och titta!
* Se till att din dator och din iPhone är anslutna till **samma WiFi-nätverk**.
* Öppna **Kamera-appen** på din iPhone och rikta den mot QR-koden som visas i terminalen.
* Tryck på den gula länken *"Öppna i Expo"* som dyker upp på skärmen.
* Appen laddas över WiFi och öppnas direkt på din iPhone!

*(Tips: Om datorn och telefonen är på olika nätverk kan du köra `npx expo start --tunnel` för att streama över internet).*
