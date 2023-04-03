# Progressive Web Apps @cmda-minor-web 2022 - 2023

Minor web development 2023 | CMD Jaar 3 | Nigel Fijnheer

# Table of contents
1. [Introductie](#introductie)
2. [How to Install](#HowToInstall)
3. [Proces](#proces)
3. [Checklist](#checklist)
3. [Bronnen](#bronnen)

## Intoduction <a name="introductie"></a>
Voor het vak PWA maak ik een Progressive Web App. Voor deze PWA gebruik ik een applicatie die ik eerder heb gemaakt tijdens WAFS. 
Die kan gevonden worden in de volgende repository:

https://github.com/Neinno/rijksmuseum-app


Dit project maakt gebruik van de rijksmuseum API om data op te halen.

[Link met infomratie over de API](https://www.rijksmuseum.nl/nl/onderzoek/onderzoek-doen/data)

[Object meta data](https://data.rijksmuseum.nl/object-metadata/)

### How to install: <a name="HowToInstall"></a>
Om dit project op je eigen computer te krijgen kan je het volgende doen:

```
git clone https://github.com/Neinno/progressive-web-apps-2223.git
```


Install de npm packages met:

```
npm install
```


Start het project met:

```
node app.js
```


## Proces <a name="proces"></a>
Dit project bevat dezelfde functionaiteiten als de vorige versie. Het verschil is dat deze serverside is opgezet inplaats van clientside. In de applicatie kan je kunstwerken zoeken die in de rijksmuseum API staan. Je kan gebruik maken van de overzicht pagina, zoek functie, en er is een detail pagina aanwezig.

### Van Client naar serverside
Om de applicatie om te zetten ben ik begonnen met nodeJS installeren. In node gebruik ik de volgende packages:
- Express
- Express Handlebars
- DotEnv
- NodeFetch

#### Express
Express gebruik ik zodat ik een server kan starten. Ik gebruik daarvoor de volgende code:
```js
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
```

#### Handlebars
Handlebars is mijn template engine. Template engines gebruik je om je HTML in te schrijven. Maar hier kan je ook data in toevoegen die je mee geeft vanuit je server. (app.js).

Handlebars gebruikt ik in het mapje views, en schrijf hier eigenlijk gewoon HTML in. Ook gebruik ik een partial voor mijn header, deze kan ik dan op iedere pagina waar ik die nodig heb aanroepen. Dit is hoe ik mijn views map heb opgezet:

<img src="/readmeimgs/templateengine.png" height=200px>

#### DotEnv & Nodefetch
Dotenv gebruik ik om mijn informatie te verbergen en ik mijn .env bestand te stoppen. Wat hier in staat is mijn token voor het rijksmuseum. Die heb ik weer nodig bij het fetchen van de data. De data die ik fetch zijn bij het overzicht, zoeken en de detail pagina. Dit ziet er dan zo uit:
```js
router.get('/', (req, res) => {
    fetch(`${process.env.API_URL}?key=${process.env.API_TOKEN}&imgonly=true`)
        .then(async response => {
            const data = await response.json()
        
            res.render('home', {
                data: data.artObjects
            });
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Error fetching');
        });
    });
```

#### Overzetten
Om alles over te zetten heb ik eigenlijk gewoon mijn oude project gekopieërd en naar de public map gezet. De public map gebruik je om je clientside code te typen. Hierin staat bijvoorbeeld mijn CSS, javascript en plaatjes. Maar ook mijn serviceworker en manifest staan hierin.

Ook heb ik gebruik gemaakt van routes. Vanuit mijn app.js gebruik ik de volgende code:
```js
const artRouter = require('./routes/art');
app.use('/', artRouter);
```

Dit zorgt ervoor dat de functie die in /routes/art,js staat uitgevoerd word. Dit is dan de fetch die onder nodefetch staat.

Om dit dan te laten zien gebruik ik een loop in handlebars.

```handlebars
{{#each data}}
    <a href="artwork/{{this.objectNumber}}">
        <figure>
            <figcaption>{{this.title}}</figcaption>
            <img src="{{this.webImage.url}}">
        </figure>
    </a>
{{/each}}
```

### Manifest.json
Een manifest.json word gebruikt om van je applicatie ook echt een Progressive Web App te maken. Hierdoor word je applicatie downloadbaar en kan je hem ook openen vanuit je computer, en niet alleen je browser.

```json
{
	"name": "Rijksmuseum App",
	"short_name": "Rijksmuseum App",
	"theme_color": "#40474F",
	"background_color": "#40474F",
	"display": "standalone",
	"Scope": "/",
	"start_url": "/",
	"icons": [
        {   
            "src": "assets/icons/icon.png",
            "sizes": "512x512",
            "type": "image/png"	
        }
    ]
}
```

Hier geef ik de naam van de applicatie mee, en wat andere dingen zoals kleur, icon, en waar de app moet beginnen.

### Serviceworker
Een Serviceworker word gebruik om je applicatie in je cache van je browser op te slaan. Ook kan ik in de serviceworker een offline pagina meegeven. Een offline pagina word gebruikt om aan te tonen dat je op dit moment geen internet hebt.

```js
const CORE_CACHE_NAME = 'cache-v1';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_ASSETS = [
  '/offline',
  'css/style.css'
]
```

In de serverworker geef ik aan welke pagina's ik wil opslaan in mijn cache. Dit zijn nu mijn offline pagina en mijn style.css. Dit heb ik gedaan zodat ook zonder internet mijn pagina gestyles is. Dit werkt dan vervolgens ook voor de pagina's die zijn opgeslagen in je cache.

### Activity Diagram
<img src="/readmeimgs/activityDiagram.png" height=400px>

### Critical Render Path

Om de snelheid van de PWA te verbeteren ga ik kijken naar critical render path. Om te beginnen heb ik gekeken naar het grootste probleem van mijn pagina. Dat is dat de plaatjes die uit de Rijksmuseum API worden gehaald erg groot zijn en traag inladen. Om dit te verbeteren heb ik lazyload toegevoegd:
```html
<img src="{{this.webImage.url}}" loading="lazy">
```

#### Fonts
Daarna heb ik een custom font toegevoegd aan de pagina. Ik heb hiervoor open-sans gebruikt uit google fonts:
- [OpenSans](https://fonts.google.com/specimen/Open+Sans)

Deze heb ik gedownload en in mijn assets map gezet. Deze heb ik aangeroepen met @fontface. Om ervoor te zorgen dat er nog steeds content geladen word als het font niet aanwezig is heb ik font-display: swap; gebruikt. Dit zorgt ervoor dat je een "Flash of unstyled text" ziet. Dit is beter dan niets:
```css
@font-face {
    font-family: "opensans";
    src: url("../assets/fonts/OpenSans-Regular.woff");
    font-display: swap;
}
```

#### Gzip
Als volgende stap heb ik Gzip toegevoegd aan mijn app.js. Dit heb ik gedaan door de volgende regels toe te voegen aan mijn app.js:
```js
const app = express();
app.use(compression());
```

Dit compressed de resonpse body, en versnelt daarmee de webapp.


#### Gulp
Gulp is een tool die ik heb gebruik om mijn public CSS en JS kleiner te maken. Dit versnelt ook de applicatie. Gulp is een aparte dependency die ik heb geïnstalleerd op mijn NodeJS applicatie. Eerst heb ik al mijn Clientside code naar een andere map gezet, zodat gulp daar makkelek bij kan, en dan vervolgens de compressed versie in de public map kan zetten. Voor CSS gebruik ik Gulp-clean-css en voor JS gebruik ik gulp-uglify.

```js
gulp.task('compressCSS', function() {
  return gulp.src('src/publicCSS/*.css')
    .pipe(minify())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('uglify', function() {
    return gulp.src('src/publicJS/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./public/js/'))
});


gulp.task('serviceworker', function() {
    return gulp.src('src/publicSW/serviceworker.js')
      .pipe(uglify())
      .pipe(gulp.dest('./public/'))
  });
  
gulp.task('default', gulp.series(['compressCSS', 'uglify', 'serviceworker']))
```

Met deze code haal ik mijn zelf geschreven bestand op, en gulp zet ze vervolgens in mijn public map. Dit helpt de grootte van de bestand te verkleinen en daarmee de applicatie sneller te maken.

#### Conclusie

Door al deze dingen uit te voeren bij critical render path is mijn applicatie sneller geworden. Ik heb een lighthouse report uitgevoerd om te kijken wat mijn performance op de site is.

<img src="/readmeimgs/lighthousereport.png" height=400px>

### Deployment
Voor Deployment heb ik gebruik gemaakt van render.com. Dit laat mij mijn app makkelek online zetten.

https://cmdminorwebpwa.onrender.com/


### Checklist <a name="checklist"></a>
- [x] Applicatie overzetten naar NodeJS
- [x] Express 
- [x] Nodemon toevoegen
- [x] Template Engine toevoegen
- [x] Fetch werkend maken
- [x] Data tonen in handlebars
- [x] Clientside code toevoegen
- [x] Routes toevoegen
- [x] App installable maken
- [x] Serviceworker toevoegen
- [x] Critical render path
- [x] Gulp to minify CSS & JS
- [ ] Progressive enhancements
- [ ] Design verbeteren
- [ ] CSS aanpassen

### Bronnen <a name="bronnen"></a>
- [Main repository van dit vak](https://github.com/cmda-minor-web/progressive-web-apps-2223)
- [RijksMuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
- [NodeJS](https://nodejs.org/en/docs/guides/getting-started-guide)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Express](https://expressjs.com/en/starter/installing.html)
- [Handlebars](https://www.npmjs.com/package/express-handlebars)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [NodeFetch](https://www.npmjs.com/package/node-fetch)
- [Manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
- [Serviceworker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Font Display Swap](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Gulp](https://gulpjs.com/)
- [CSSMinify](https://www.npmjs.com/package/gulp-css-minify)
- [Uglify](https://www.npmjs.com/package/gulp-uglify)

