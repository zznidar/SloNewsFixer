// This code fixes some images (GIFs) being too wide, causing website to scroll left-right on rtvslo.si
// GIFs are not wrapped in <figure>, thus width=100% does not apply to them.
// This code wraps them in figure tags with appropriate classes.

console.log("Now running mmc.js");
slike = [...document.getElementsByTagName("img")].filter(x => x.src) ;
nonnested = slike.filter(x => x.parentElement.parentElement.nodeName === "ARTICLE");

for(let nn of nonnested) {
    let newfig = document.createElement("figure");
    newfig.className = "{hide_class} photoswipe image c-figure-full";
    let article = nn.parentElement.parentElement;
    article.insertBefore(newfig, nn.parentElement);
    newfig.appendChild(nn.parentElement);
}