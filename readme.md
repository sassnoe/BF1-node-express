# BF1 Artists App

Dette projekt er en full-stack web-applikation. Backend er REST API implementeret med Node.js og Express.js, hvor en JSON fil er brugt som datakilde. CRUD operationer bruges til at læse denne JSON fil. Der bliver routes med endpoint for HTTP metoderne til GET, POST, PUT/PATCH, DELETE.

I applikationen er det muligt at filtrere kunstnere efter hvilken musikgenre de har, samt at sortere fra hvilket årstal de har været aktive. Det er også muligt at sætte en kunstner som "favorit", hvorefter man kan se kunstnerne på en favoritliste.

## Installation

Installationen går ud fra at Node.js og Node Package Manager (npm) allerede er installeret på din computer.

1. Klon applikationens repository.

2. Åben projektets mappe i terminalen (bash)

3. Gå ind i backend-mappen

```bash
cd backend
```

4. Installer dependencies.

```
npm install
```

5. Åben `index.html` i en live-server.

## Brug af applikation

I den kørende applikation ses et overblik af kunstnere. Det er muligt enten at scrolle igennem listen af kunstnere, eller filtere efter ønskede genre. Det er også muligt at sortere efter hvornår kunstnere har været aktiv.

Det er muligt at tilføje kunstnere til en favoritliste, som kan tilgås i toppen af applikationen. For at se alle kunstnere igen, findes der også en "Alle kunstnere" liste.

Der er også en form til at opdatere og tilføje nye kunstnere til listen.

Hvis du ikke vil have en kunstner på listen, kan der trykkes på "DELETE" knappen, hvorefter kunstneren vil blive fjernet fra listen.

## Lavet af

Joakim Sass Nørgaard
