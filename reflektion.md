### Namngivning (Kapitel 2)

#### Tabell över Identifierare:
| Namn och förklaring | Reflektion och regler från Clean Code |
|----------------------|----------------------------------------|
| `BarChart`          | Klassnamn som tydligt speglar dess syfte och innehåll. **Relevanta Regler:** *Use Intention-Revealing Names*, *Avoid Disinformation* |
| `PieChart`          | Liksom `BarChart` är detta klassnamn självförklarande och informativt. **Relevanta Regler:** *Use Intention-Revealing Names*, *Avoid Disinformation* |
| `draw()`            | Metodnamn som implicerar visuell rendering av data. **Relevanta Regler:** *Use Action Words in Function Names* |
| `updateData(data)` | Metodnamn och parameter som signalerar uppdatering av data. **Relevanta Regler:** *Use Descriptive Names*, *Function Arguments* |
| `updateColor(color)`| Metodnamn och parameter som signalerar uppdatering av färg. **Relevanta Regler:** *Use Descriptive Names*, *Function Arguments* |

#### Reflektion (Kapitel 2)
Kapitel 2 i "Clean Code" lyfter fram viktiga aspekter av namngivning som jag aktivt har försökt implementera i min kodning. I detta kapitel framhävs hur avgörande tydliga, intention-avslöjande namn är för att upprätthålla kodens läsbarhet och underhållbarhet. Genom att reflektera över min kod i ljuset av denna kunskap, upptäckte jag att mitt engagemang för att följa riktlinjer som *Use Intention-Revealing Names* och *Avoid Disinformation* har haft en betydande positiv påverkan i början av mitt kodande. När min modul växte i storlek och jag var tvungen att bryta ut koden till olika klasser insåg jag att namndupliseringen och förvirringen av likadana namn inte alls var bra. Till exempel den publika metoden `draw()` som finns i både `BarChart` och `PieChart` klasserna och kan förvirra andra utvecklare som kanske arbetar med min kod i framtiden.

Jag märkte att genom att namnge klasser och metoder på ett genomtänkt sätt, skapades en klarare bild av vad varje del av koden syftar till att uppnå. Detta minimerar risken för desinformation och förenklar underhållsarbetet, vilket sparar både tid och ansträngning i det långa loppet. Dock, trots mina ansträngningar, är jag medveten om att det finns rum för förbättring. En fördjupad insikt i skillnaden mellan domännamn och lösning-domännamn kan förbättra min kod ytterligare och hjälpa till att undvika potentiell förvirring för andra utvecklare som kanske arbetar med min kod i framtiden.

Genom denna övning har jag blivit mer medveten om vikten av att välja meningsfulla identifierare och att vara konsekvent i namngivningskonventioner. Detta kapitel har inte bara förbättrat den aktuella koden utan har också utrustat mig med viktiga verktyg och perspektiv för att fortsätta att skriva renare och mer underhållbar kod framöver.

---

### Funktioner (Kapitel 3)

#### Tabell över Metoder:
| Metodnamn och kod  | antal rader (ej ws) | Reflektion |
|---------------------|----------------------|-------------|
| `drawGrid()`       | 50                   | **Relevanta Regler:** *Do One Thing*, *Small Functions*. Metoden har en klar uppgift men kunde möjligtvis brytas ner ytterligare för bättre läsbarhet och underhåll. |
| `drawBars()`       | 40                   | **Relevanta Regler:** *Do One Thing*, *Small Functions*. Liksom `drawGrid` kunde denna metod brytas ner i mindre delar för att följa regeln om små funktioner. |
| `drawSingleBar()`  | 30                   | **Relevanta Regler:** *Do One Thing*, *Function Arguments*. Metoden gör en sak och är relativt kompakt, men kunde kanske vara mer deskriptiv i sin namngivning. |
| `updateData(data)` | 20                   | **Relevanta Regler:** *Do One Thing*, *Function Arguments*. Metoden gör en sak och tar emot ett argument, vilket är bra. Men namngivningen av argumentet kunde varit mer deskriptiv. |
| `updateColor(color)`| 15                  | **Relevanta Regler:** *Do One Thing*, *Function Arguments*. Likt `updateData`, gör metoden en sak och är bra på att hantera argument, men kunde vara mer deskriptiv i namngivningen. |

#### Reflektion (Kapitel 3)
Kapitel 3 i "Clean Code" belyste viktigheten av välstrukturerade funktioner, en insikt som var central under min kodgranskning. En av huvudpunkterna var principen om att en funktion bör göra en sak, vilket resonerade med mig när jag analyserade mina metoder som `drawGrid()`, `drawBars()` och `drawSingleBar()`. Jag insåg att även om de hade tydliga uppgiftsområden, fanns det utrymme för att dela upp dem ytterligare för att förbättra läsbarheten.

Kapitlet betonade också att hålla funktioner små, vilket underlättar förståelse och underhåll. Jag identifierade flera metoder i min kod som kunde ha segmenterats ytterligare som alla olika draw metoder där alla användes av det inbyggda canvas-api:t. Man kan alltid bryta ut dessa metoder i en separat klass och sedan ärva från den klassen. Detta skulle minska upprepning av kod och göra det lättare att underhålla och utöka koden i framtiden.

Namngivning framhölls återigen som kritisk, och även om mina metodnamn var deskriptiva, insåg jag att argumentnamnen kunde vara mer illustrativa för att bättre återspegla deras syfte. När jag använder mig av Vanilla Javascript så blev jag ännu mer medveten om att jag inte kan använda mig av typade argument som i Java. Detta gör att jag måste vara extra noga med att namnge argumenten så att de är så beskrivande som möjligt.

Denna genomgång har varit ögonöppnande och har rustat mig med nyttiga insikter för att förbättra min kodstruktur och namngivningskonventioner framåt.


Sammanfattande Reflektion över Kapitel 2 och 3:

Genom att djupdyka i "Clean Code", kapitel 2 och 3, har jag fått värdefulla insikter som har fått mig att inse vikten av en bra kodningspraxis. Kapitel 2, med sitt fokus på namngivning, underströk betydelsen av tydliga identifierare, något som återspeglas i vissa delar i min kod genom namn som `BarChart` och `PieChart`. Dessa namn inte bara illustrerar kodens syfte utan främjar även läsbarheten och underhållet, vilket understryker kraften i intention-avslöjande namn. Dessutom skapade det en medvetenhet om vikten av att skilja mellan domännamn och lösning-domännamn, en insikt som jag kommer att bära med mig framåt.

Kapitel 3, som utforskar funktionernas struktur och storlek, väckte min medvetenhet om att hålla mina funktioner små och fokuserade. Jag insåg att medan metoder som `drawGrid()` hade tydliga uppgiftsområden, finns det utrymme för att göra dem mer fokuserade och mer kortfattade, vilket framhäver principen om att varje funktion bör göra 'en sak'. Denna insikt har utrustat mig med en solid förståelse om hur jag kan förbättra min kodstruktur genom att segmentera och organisera mina funktioner effektivt. Förslag på ändringar är att jag skulle kunna bryta ut likvärdiga metoder som finns i de olika graferna i en separat klass, och sedan ärva från den klassen. Detta skulle minska upprepning av kod och göra det lättare att underhålla och utöka koden i framtiden. Tanken var att `MyChart.js` skulle vara en template där både `BarChart` och `PieChart` skulle ärva ifrån. Projektet av modulen tog många olika vändingar och i slutet så blev ``MyChart.js` en klass som fungerar som en factory.

Sammantaget har dessa kapitel erbjudit en robust plattform för att reflektera över min nuvarande kodningspraxis. De har inte bara hjälpt mig att identifiera och adressera områden för förbättring i min befintliga kod, utan har också förändrat mitt perspektiv på hur jag ska närma mig kodning framåt. Nu, med en djupare uppskattning av beskrivande namngivning och välstrukturerade funktioner, känner jag mig mer rustad att skapa kod som är ren, effektiv och framför allt, lätt att förstå och underhålla. Detta kommer inte bara att gynna mig, utan även andra utvecklare som interagerar med min kod i framtiden. Jag ser fram emot att uppgift 3 där vi ska skriva nästintill "perfekt kod" och tillämpa de kunskaper vi har fått från föregående uppgifter.