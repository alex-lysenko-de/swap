# 🧠 SWAP (Smart Workplace Allocation Platform)

Alternative Bezeichnung: **Sitzplatz Verteilungs Application**

Eine intelligente Plattform zur flexiblen und effizienten Verteilung von Arbeitsplätzen in dynamischen Umgebungen.

---

### 📋 Inhaltsverzeichnis

- [**Projektüberblick**](#projektüberblick)
- [**Problemstellung**](#problemstellung)
- [**Ziele der Plattform**](#ziele-der-plattform)
- [**Funktionsweise**](#funktionsweise)
  - [Algorithmus und Daten](#algorithmus-und-daten)
  - [Mathematisches Modell](#mathematisches-modell)
- [**Features & Vorteile**](#features--vorteile)
- [**Benutzeranleitung**](#benutzeranleitung)
  - [1. Anwendung starten](#1-anwendung-starten)
  - [2. Raum- und Arbeitsplatzplanung](#2-raum--und-arbeitsplatzplanung)
  - [3. Wechsel in den Planungsmodus](#3-wechsel-in-den-planungsmodus)
  - [4. Eingabe von Zeitplänen und Präferenzen](#4-eingabe-von-zeitplänen-und-präferenzen)
  - [5. Automatische Berechnung und Ergebnisse](#5-automatische-berechnung-und-ergebnisse)
- [**Aktueller Status**](#aktueller-status)
- [**Screenshots (Platzhalter)**](#screenshots-platzhalter)

---

### 📝 Projektüberblick <a name="projektüberblick"></a>

SWAP ist eine Webanwendung, die speziell für Unternehmen mit mehreren Standorten und dynamischen Arbeitsumgebungen, wie z.B. Ausbildungszentren, entwickelt wurde. Das System automatisiert die komplexe Aufgabe der Sitzplatzvergabe und sorgt für eine optimale und gerechte Verteilung der Ressourcen.

### 📌 Problemstellung <a name="problemstellung"></a>

Unternehmen mit flexiblen Arbeitsmodellen und hoher Fluktuation (z. B. durch Praktikanten und Studenten) stehen vor folgenden Herausforderungen:
* **Instabile Belegung**: Hohe Fluktuation bei Praktikanten und Studenten.
* **Ressourcenmangel**: Begrenzte Kapazitäten in den Hauptbüros.
* **Teamarbeit**: Die Notwendigkeit, Projektteams zusammen in einem Raum zu platzieren.
* **Priorisierung**: Berücksichtigung unterschiedlicher Nutzerprioritäten.

### 🎯 Ziele der Plattform <a name="ziele-der-plattform"></a>

Die Plattform SWAP wurde mit dem Ziel entwickelt, Arbeitsplätze **intelligent und flexibel** zu verteilen, basierend auf:
* Projektzugehörigkeit und Teamzusammenarbeit.
* Benutzerprioritäten (z. B. Mitarbeiter > Studenten > Praktikanten).
* Verfügbarkeit und Kapazität von Räumen und Arbeitsplätzen.
* Individuellen Präferenzen und Einschränkungen.

### ⚙️ Funktionsweise <a name="funktionsweise"></a>

#### Algorithmus und Daten <a name="algorithmus-und-daten"></a>

Der Planungsalgorithmus von SWAP verwendet die folgenden Eingabedaten für jeden Teilnehmer:
* **Anwesenheitszeitraum**: Von/bis-Datum der Anwesenheit im Zentrum.
* **Regulärer Zeitplan**: An welchen Wochentagen die Person anwesend ist.
* **Abwesenheiten**: Geplante (Urlaub, Dienstreise) und ungeplante (Krankheit) Abwesenheiten.
* **Sitzplatzpräferenzen**: Bevorzugte Räume oder spezifische Arbeitsplätze.
* **Zusätzliche Wünsche** (in zukünftigen Versionen): Präferenzen für das Sitzen neben bestimmten Personen oder die Vermeidung anderer Personen.

#### Mathematisches Modell <a name="mathematisches-modell"></a>

Die Sitzplatzverteilung wird als **Optimierungsproblem** formuliert. Ziel ist es, eine **Nutzenfunktion `U`** zu maximieren, die die Gesamtzufriedenheit aller Benutzer widerspiegelt. Dies geschieht unter Berücksichtigung verschiedener Einschränkungen wie:
* Verfügbarkeit von Arbeitsplätzen.
* Zeitliche Anwesenheit der Benutzer.
* Vermeidung von Konflikten (z. B. zwei Personen am selben Platz).
* Prioritäten und Präferenzen.

Dieses Problem wird als **nichtlineares Programm** modelliert und kann durch Methoden wie den **Simplex-Algorithmus** oder **heuristische Ansätze** gelöst werden.

### ✨ Features & Vorteile <a name="features--vorteile"></a>

* **Flexibilität**: Passt sich dynamisch an neue Benutzer, Zeitpläne oder Einschränkungen an.
* **Gerechtigkeit**: Prioritäten und Präferenzen werden automatisch berücksichtigt.
* **Zeitersparnis**: Eliminiert die Notwendigkeit manueller Planung.
* **Skalierbarkeit**: Funktioniert sowohl für kleine als auch für große Teams (10 bis 1000+ Teilnehmer).
* **Interaktive Ausgabe**: Generiert einen visuellen und interaktiven Sitzplan.

---

### 📖 Benutzeranleitung <a name="benutzeranleitung"></a>

#### 1. Anwendung starten <a name="1-anwendung-starten"></a>

Öffnen Sie die Datei `index.html` in einem Webbrowser. Das initiale Interface für die Raumplanung wird geladen.

#### 2. Raum- und Arbeitsplatzplanung <a name="2-raum--und-arbeitsplatzplanung"></a>

Zeichnen Sie die schematische Darstellung des Ausbildungszentrums.
* Erstellen Sie **Räume** als Rechtecke mit einer eindeutigen ID und optionalem Namen.
* Platzieren Sie **Arbeitsplätze** innerhalb der Räume, ebenfalls mit eindeutigen IDs.

#### 3. Wechsel in den Planungsmodus <a name="3-wechsel-in-den-planungsmodus"></a>

Klicken Sie auf die Schaltfläche **"Demonstration"**, um zur nächsten Phase zu gelangen.

#### 4. Eingabe von Zeitplänen und Präferenzen <a name="4-eingabe-von-zeitplänen-und-präferenzen"></a>

Jeder Teilnehmer gibt seine Anwesenheitsdetails ein, einschließlich:
* Anwesenheitszeitraum
* Regelmäßige Anwesenheitstage
* Geplante Abwesenheiten
* Bevorzugte Räume oder Arbeitsplätze

#### 5. Automatische Berechnung und Ergebnisse <a name="5-automatische-berechnung-und-ergebnisse"></a>

Das System berechnet automatisch den optimalen Sitzplan und visualisiert ihn:
* Ein interaktiver Plan zeigt, **wer an welchem Tag wo sitzt**.
* Ein Kalender ermöglicht die Navigation durch verschiedene Tage, um Änderungen zu sehen.
* Konflikte oder Abweichungen von Präferenzen werden hervorgehoben.

---

### ✅ Aktueller Status <a name="aktueller-status"></a>

* Ein **funktionsfähiger Prototyp** ist verfügbar.
* Die Kernlogik ist implementiert und wurde mit Testdaten validiert.
* Die Anwendung ist flexibel und logisch in ihrem Verhalten.

### 🖼️ Screenshots (Platzhalter) <a name="screenshots-platzhalter"></a>

Hier werden zukünftig visuelle Darstellungen der Plattform eingefügt.

#### Screenshot 1: Raumplanung
![Screenshot der Raum- und Arbeitsplatzplanung.](placeholder_raumanlage.png)

#### Screenshot 2: Eingabemaske für Benutzerpräferenzen
![Screenshot der Eingabemaske für die Zeitpläne und Präferenzen der Benutzer.](placeholder_user_input.png)

#### Screenshot 3: Interaktiver Sitzplan
![Screenshot des finalen, interaktiven Sitzplans mit täglicher Ansicht.](placeholder_sitzplan.png)