
## Inlämningsuppgift 2

Denna uppgift är praktisk och görs individuellt. Lycka till!

## Bedömning

  
IG & G

_Om kraven för G inte uppnås bedöms uppgiften med IG. Du får flera tillfällen för att komplettera om kraven inte skulle uppnås._

Om du går för G följer du kraven för G och endast beskrivningen för G. Om du går för VG följer du kraven för VG och endast beskrivningen för VG.

  

Krav för G:

1. Följ instruktionerna i G beskrivningen
2. Formatera koden: Små misstag ignoreras men större fel ger IG (om du blir osäker så kan du fråga läraren)
3. Använd git för versionshantering

Krav för VG:

4. För instruktionerna för VG beskrivningen
5. Formatera koden: Små misstag ignoreras men större fel ger IG (om du blir osäker så kan du fråga läraren)
6. Använd git för versionshantering

  

Det finns inga krav på design. Applikationen måste inte vara snygg, endast funktionell enligt kraven.

## Beskrivning (för G)

Du skall i denna uppgift bygga en mini-reddit klon med inlägg och kommentarer. Applikationen (webbsidan) ska innehålla en sida med alla inlägg som ska visa:

- Titel
- Innehåll (visa max 60 tecken, även om själva innehållet kan innehålla mer)
- Kommentarer på inlägget

  
Man skall kunna skapa nya inlägg på valfritt sätt (e.g. formulär) där man väljer titel och innehåll, och detta skall visas på sidan, bland alla andra inlägg, när man är klar. Inläggen kopplas inte till någon specifik person. Inlägg behöver inte finnas kvar om sidan laddas om.


Man skall också kunna kommentera på inlägg. Kommentarer kopplas inte till någon specifik person. Kommentarer behöver inte finnas kvar om sidan laddas om.

Det finns inga användare (även om detta är ovanligt och orealistiskt).

## Beskrivning (för VG)

Du skall i denna uppgift bygga en mini-reddit klon med hjälp av **posts**, **users**, och **comments** från [DummyJSON](https://dummyjson.com/docs/) för att implementera funktionalitet. Det är helt okej att använda Reddits riktiga API, om du vill försöka få det att fungera. Spendera dock ingen större tid på att felsöka det, om det skulle uppstå problem; fokusera och använd isåfall DummyJSON istället.

Inlägg och kommentarer skall laddas in från API:et, så fort webbsidan laddas in. Dessa inlägg och kommentarer skall sparas i localStorage. Om det redan finns saker i localStorage skall dessa användas och API:et skall inte anropas.

Applikationen (webbsidan) ska innehålla en huvudsida med alla inlägg (posts). Dessa inlägg skall komma från API:et eller localStorage. Inlägg på huvudsidan ska visa:

- Titel
- En del av innehållet (max 60 tecken) (kallad body i API:et)
- Taggar
- Namn på skaparen (användaren)


På huvudsidan skall man kunna skapa nya inlägg:

- Implementera detta genom att välja vilken användare som ska skapa inlägget. Detta är inte realistiskt och inte hur Reddit egentligen fungerar eftersom man vanligtvis är inloggad på en användare, men för uppgiftens omfattning skall det fungera så. Vid skapandet av inlägget ska man alltså få välja vilken användare (utav de som API:et innehåller) som skapar inlägget
- Nya inlägg skall sparas i localStorage


Man skall även kunna trycka på ett inlägg vilket skickar en till en "ny" sida som visar hela inlägget. Detta kan implementeras på olika sätt, exempelvis genom ett separat HTML dokument. På denna sida ska följande visas:

- Titel
- Hela innehållet (kallad body i API:et)
- Taggar
- Namn på skaparen (användaren)
- Antal reaktioner (kallad reactions i API:et)
- Kommentarer, som består av dess innehåll (också kallad body i API:et) samt namnet på skaparen (användaren) av kommentaren

På (inlägg-)sidan skall också följande vara möjligt:

- Skriva ny kommentar på inlägget (som också skall sparas i localStorage)
- Reagera på inlägget (likes, dislikes, reactions, och detta skall också sparas i localStorage)

Övrig information:

- API objekten innehåller all information du kan behöva
- Nya användare kan inte skapas. De som kommer från API:et är alla som ska finnas
- Det finns ingen "inloggning"