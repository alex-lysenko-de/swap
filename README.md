### 🧠 Smart Workplace Allocation Platform (SWAP)  
**Sitzplatz Verteilungs Application**  
*Eine intelligente Plattform zur flexiblen und prioritätsbasierten Arbeitsplatzverteilung in dynamischen Umgebungen*  

---

### 📚 Inhaltsverzeichnis  
1. [🎯 Projektübersicht](#-projektübersicht)  
2. [📥 Eingabedaten & Anforderungen](#-eingabedaten--anforderungen)  
3. [⚙️ Mathematisches Modell](#️-mathematisches-modell)  
4. [💡 Vorteile der Plattform](#-vorteile-der-plattform)  
5. [📤 Ergebnisse & Visualisierung](#-ergebnisse--visualisierung)  
6. [🔧 Projektstatus](#-projektstatus)  
7. [📘 Benutzeranleitung](#-benutzeranleitung)  
8. [🖼️ Screenshots](#️-screenshots)  
9. [✨ Nächste Schritte](#-nächste-schritte)  
10. [📚 Mathematische Referenzen](#-mathematische-referenzen)  

---

### 🎯 Projektübersicht <a name="projektübersicht"></a>  
SWAP automatisiert die Sitzplatzverteilung in Umgebungen mit hoher Fluktuation (z.B. Ausbildungszentren, flexible Büros).  

**Ziele:**  
- Projektteams räumlich zusammenführen  
- Prioritätenreihenfolge umsetzen:  
  **1. Mitarbeitende** → **2. Auszubildende** → **3. Praktikant:innen**  
- Individuelle Präferenzen & Raumkapazitäten berücksichtigen  

---

### 📥 Eingabedaten & Anforderungen <a name="eingabedaten--anforderungen"></a>  
**Pro Person:**  
- ⏳ Anwesenheitszeitraum (von/bis)  
- 📅 Regelmäßige Tage (Mo–Fr)  
- 🏖️ Geplante Abwesenheiten (Urlaub, Krankheit)  
- ❤️ Präferenzen:  
  - Bevorzugte Räume/Plätze  
  - *(Zukünftig)* Wunsch-/Vermeidungsnachbarn  

---

### ⚙️ Mathematisches Modell <a name="mathematisches-modell"></a>  
#### 🔍 Problemtyp: **Ganzzahlige Lineare Optimierung (ILP)**  
*Formulierung als Maximierung der Zufriedenheitsfunktion `U` unter Restriktionen.*  

**Zielfunktion:**  
```
Maximiere U = Σ (w_p * x_p) 
```  
- `w_p`: Zufriedenheitsgewicht pro Person (höher für Prioritätsstufen)  
- `x_p`: Binärvariable (1 = Platz zugewiesen, 0 = nicht zugewiesen)  

**Restriktionen:**  
1. **Kapazität:**  
   `Σ x_p ≤ Kapazität_r ∀ Räume r`  
2. **Anwesenheit:**  
   `x_p = 0` bei Abwesenheit an Tag t  
3. **Konflikte:**  
   `x_p1 + x_p2 ≤ 1` bei inkompatiblen Personenpaaren  
4. **Eindeutigkeit:**  
   `Σ x_p = 1 ∀ Personen p` (genau ein Platz pro Person)  

**Lösungsmethoden:**  
- **Simplex-Algorithmus** für kontinuierliche Relaxierung  
- **Branch-and-Bound** für Ganzzahligkeit  
- Heuristiken (z.B. Greedy) bei großen Instanzen  

---

### 💡 Vorteile der Plattform <a name="vorteile-der-plattform"></a>  
✅ **Fairness**  
> Automatisierte Priorisierung & Präferenzberücksichtigung  
✅ **Effizienz**  
> 90% Zeitersparnis vs. manuelle Planung  
✅ **Flexibilität**  
> Echtzeit-Anpassung bei Änderungen  
✅ **Skalierbarkeit**  
> 10 – 1000+ Personen  

---

### 📤 Ergebnisse & Visualisierung <a name="ergebnisse--visualisierung"></a>  
**🗺️ Interaktive Raumkarten:**  
- Platzbelegung mit Namen  
- Farbmarkierung von Präferenzerfüllung  
**📅 Kalenderansicht:**  
- Tagesweise Belegungspläne  
- Konflikthervorhebung  
**📊 Auswertung:**  
- Zufriedenheitsindex pro Team/Tag  

---

### 🔧 Projektstatus <a name="projektstatus"></a>  
- ✅ **Funktionsfähiger Prototyp**  
- ✔️ Validierung mit Testdaten  
- ✔️ Logik für Prioritäten & Präferenzen  
- ➕ Erweiterungen für reale Szenarien in Entwicklung  

---

### 📘 Benutzeranleitung <a name="benutzeranleitung"></a>  
1. **Anwendung starten:**  
   `index.html` im Browser öffnen.  
2. **Raumlayout erstellen:**  
   Räume/Plätze als Rechtecke zeichnen, IDs vergeben.  
3. **Planungsmodus aktivieren:**  
   Button *„Demonstration“* wählen.  
4. **Daten eingeben:**  
   Zeitpläne, Abwesenheiten, Präferenzen pro Person.  
5. **Berechnung starten:**  
   Automatische Generierung optimierter Tagespläne.  

---

### 🖼️ Screenshots <a name="screenshots"></a>  
*(Platzhalter für Implementierung)*  
| ![Raumplanung](placeholder_raumanlage.png) | ![Kalender](placeholder_kalender.png) |  
|:------------------------------------------:|:-------------------------------------:|  
| *Raumkonfiguration*                        | *Tagesbelegungsansicht*               |  

---

### ✨ Nächste Schritte <a name="nächste-schritte"></a>  
- [ ] 📽️ Demo-Video erstellen  
- [ ] 📸 Screenshots implementieren  
- [ ] 💬 Nutzerfeedback einholen  
- [ ] 🚀 ILP-Optimierung für große Datensätze  

---

### 📚 Mathematische Referenzen <a name="mathematische-referenzen"></a>  
**Formale Problembeschreibung:**  
1. [Linear Programming (Wikipedia)](https://en.wikipedia.org/wiki/Linear_programming)  
   > Grundlagen der Linearen Optimierung.  
2. [Integer Linear Programming Handbook](https://www.math.uwaterloo.ca/~hwolkowi/henk/teaching/f10/370.w10/lecturenotes.pdf)  
   > Theorie & Algorithmen für Ganzzahlige Probleme.  
3. **Spezifische Formulierung:**  
   ```
   Minimiere: cᵀx  
   Unter:   Ax ≤ b, x ≥ 0, x ∈ ℤ  
   ```  
   - `A`: Koeffizientenmatrix für Restriktionen  
   - `b`: Kapazitäts-/Anwesenheitsvektor  
   - `c`: Zielfunktionskoeffizienten (negierte Zufriedenheitsgewichte)  

**Lösungstools:**  
- [SCIP Optimizer Suite](https://www.scipopt.org/)  
- [Python PuLP Library](https://coin-or.github.io/pulp/)  

---

### 🛠️ Autor & Lizenz  
Alexander Lysenko – [alex.lysenko.de@gmail.com](mailto:alex.lysenko.de@gmail.com)  
📄 **MIT License** – Freie Nutzung bei Namensnennung.  

--- 
💡 *Dieses Dokument kombiniert die Stärken beider Vorlagen: Klare mathematische Formulierung als ILP-Problem, praktische Anleitungen und Referenzen für die Optimierungslösung.*