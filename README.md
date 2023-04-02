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
Een Serviceworker word gebruik om je appli
<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- ...you should implement an explanation of client- server rendering choices 🍽 -->

<!-- ...and an activity diagram including the Service Worker 📈 -->

<!-- This would be a good place for a list of enhancements to optimize the critical render path implemented your app  -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->
