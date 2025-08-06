# 🧠 Smart Workplace Allocation Platform (SWAP)

> **Sitzplatz Verteilungs Application**

Ein intelligentes Tool zur automatisierten Zuweisung von Arbeitsplätzen in dynamischen Umgebungen wie Ausbildungszentren oder flexiblen Büros.

---

## 📚 Inhaltsverzeichnis

1. [🎯 Projektübersicht](#-projektübersicht)
2. [📥 Eingabedaten & Anforderungen](#-eingabedaten--anforderungen)
3. [🧩 Problemstellung](#-problemstellung)
4. [⚙️ Mathematisches Modell](#️-mathematisches-modell)
5. [💡 Vorteile der Plattform](#-vorteile-der-plattform)
6. [📤 Ergebnisse & Visualisierung](#-ergebnisse--visualisierung)
7. [🔧 Projektstatus](#-projektstatus)
8. [📘 Benutzeranleitung](#-benutzeranleitung)
9. [🖼️ Screenshots (Platzhalter)](#️-screenshots-platzhalter)
10. [✨ Nächste Schritte](#-nächste-schritte)

---

## 🎯 Projektübersicht

**SWAP** ist eine Plattform zur automatischen, flexiblen und prioritätsbasierten Sitzplatzverteilung, insbesondere für:

- Ausbildungszentren mit hoher Personalfluktuation
- Büros mit Raumknappheit
- Projektteams mit Bedarf an gemeinsamer Platzierung

### 🔍 Zielsetzung:

- Mitarbeitende desselben Projekts möglichst in einem Raum zusammenbringen
- Verfügbarkeit und Ausstattung der Räume berücksichtigen
- Nutzerpräferenzen und -einschränkungen integrieren
- Prioritätenreihenfolge einhalten:

  1. **Mitarbeitende**
  2. **Auszubildende**
  3. **Praktikant:innen**

---

## 📥 Eingabedaten & Anforderungen

Jede teilnehmende Person definiert:

- Zeitraum der Anwesenheit (von/bis)
- Regelmäßige Anwesenheitstage (z. B. Mo–Fr)
- Geplante Abwesenheiten (Urlaub, Krankheit, etc.)
- Individuelle Präferenzen:

  - Gewünschte Räume und Arbeitsplätze
  - (zukünftig) Wunsch-Nachbarn oder auszuschließende Personen

---

## 🧩 Problemstellung

Das System soll einen **automatischen Sitzplan** generieren, der:

- Raum- und Platzverfügbarkeit berücksichtigt
- Überschneidungen und Konflikte vermeidet
- Individuelle Wünsche möglichst erfüllt
- Prioritäten fair umsetzt

---

## ⚙️ Mathematisches Modell

- **Optimierungsproblem** mit Ziel: Maximierung der **Zufriedenheitsfunktion** `U`
- Restriktionen:

  - Raumkapazitäten
  - Anwesenheitszeiten
  - Konflikte & Präferenzen

- Lösung durch:

  - Lineare oder ganzzahlige Programmierung (z. B. Simplex)
  - Heuristische Methoden bei Komplexität

---

## 💡 Vorteile der Plattform

✅ Anpassungsfähig bei Änderungen (Personal, Räume, Zeiten)  
✅ Automatisierte, faire und nachvollziehbare Entscheidungen  
✅ Zeitersparnis gegenüber manueller Planung  
✅ Skalierbar für kleine und große Teams

---

## 📤 Ergebnisse & Visualisierung

### 🗺️ Raumübersicht

- Interaktive Visualisierung der Räume
- Jeder Platz zeigt den zugewiesenen Namen

### 📅 Kalenderansicht

- Tagesaktuelle Sitzplatzanzeige
- Anzeige von Abweichungen zu den Wünschen
- Ansicht der Raumbelegung über die Zeit

---

## 🔧 Projektstatus

- ✅ **Funktionsfähiger Prototyp vorhanden**
- Unterstützt Testdaten & mehrere Nutzertypen
- Bereits nutzbare Planungslogik im Frontend

---

## 📘 Benutzeranleitung

### ⚙️ 1. Anwendung starten

- Datei `index.html` im Browser öffnen

### 🗺️ 2. Raumlayout erstellen

- Räume und Plätze manuell als Rechtecke zeichnen
- Eindeutige Raum- und Platz-IDs vergeben

### ▶️ 3. In Planungsmodus wechseln

- Klick auf **„Demonstration“**

### 📅 4. Zeitpläne & Präferenzen eingeben

- Anwesenheitszeitraum & regelmäßige Tage
- Abwesenheiten eintragen
- Sitzpräferenzen pro Person

### 🤖 5. Automatisierte Planung starten

- System erstellt Tagespläne
- Live-Aktualisierung bei Änderungen
- Ziel: max. Wunsch- & Prioritätserfüllung

---

## 🖼️ Screenshots (Platzhalter)

> Hier können später Screenshots eingefügt werden, sobald verfügbar:

- ![Startbildschirm](./screenshots/startseite.png)  
- ![Raumplanungsmodus](./screenshots/raumplanung.png)  
- ![Kalenderansicht](./screenshots/kalender.png)  
- ![Sitzverteilung Ergebnis](./screenshots/sitzplan_ergebnis.png)

---

## ✨ Nächste Schritte

- [ ] 📽️ Demo-Video aufnehmen  
- [ ] 📸 Screenshots erstellen und einbinden  
- [ ] 📄 Anwendungsfälle dokumentieren  
- [ ] 💬 Nutzerfeedback einholen  
- [ ] 🚀 Weiterentwicklung für reale Umgebungen starten

---

## 🛠️ Autor

Alexander Lysenko – [alex.lysenko.de@gmail.com](mailto:alex.lysenko.de@gmail.com)

---

## 📄 Lizenz

MIT License – frei nutzbar, mit Namensnennung.

