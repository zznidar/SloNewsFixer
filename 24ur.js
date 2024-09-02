// This code fixes unused real screen estate on website 24ur.com
// The title is often cut off with ellipses even though there is still more than half a line free.
// This code retrieves full titles and displays them at their intended locations.

console.log("Now running 24ur.js");
naslovi = [...document.getElementsByTagName("h1")].concat([...document.getElementsByTagName("h2")]);
linki = naslovi.map(x => (x.parentElement.nodeName === "A" ? x.parentElement.href : x.parentElement.parentElement.href));


async function fp(link) {
    try {
        const response = await fetch(link);
        const status = response.status;
        const html = await response.text();
		// Create a temporary element to parse the HTML content
		const tempElement = document.createElement('div');
		tempElement.innerHTML = html;

		let fullTitle = tempElement.getElementsByTagName("h1")[0]?.innerText;
		//let fullTitle = tempElement?.getElementsByTagName("p")[0]?.innerText; // for testing purposes, shows city and date

        if (status !== 200) {
            console.log('Error' + status);
            return;
        }

        if (html.length === 0) {
            console.log('\nNapaka: prazen odgovor!' + html);
        }
        
        return fullTitle;
    } catch (err) {
        console.log('Fetch Error :-S' + err);
    }
}

async function popravi_naslov(link, heading) {
	let fullTitle = await fp(link);
	if (fullTitle === undefined) {
		console.log(link, heading, fullTitle, "is undefined");
		return
	}
	heading.innerText = fullTitle;
}

async function popravi_naslove() {
	naslovi = [...document.getElementsByTagName("h1")].concat([...document.getElementsByTagName("h2")]);
	linki = naslovi.map(x => (x.parentElement.nodeName === "A" ? x.parentElement.href : x.parentElement.parentElement.href));

	for(let i = 0; i < naslovi.length; i++) {
		popravi_naslov(linki[i], naslovi[i]);
	}
}

popravi_naslove();