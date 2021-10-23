function fetchDataIn(book, chapter, lang) {

    // Delete the intro after the first search
    document.querySelector(".instructions").innerHTML = ""

    const urlBOM = `https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=${lang}&uri=/scriptures/bofm/${book}/${chapter}`
    let results = null;

    // Should reset the languages in the HTML, otherwise the chosen order can't be achieved
    resetLanguageHTML(selectedLanguage1, selectedLanguage2);

    function convertToJson(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log("error:", response);
        }
    }

    function displayScripts(data) {
        // console.log(data);
        const outputBOMElement = document.querySelector(`#${lang}`);
        results = data
        const chapterBody = results.content.body;
        // Somewhere over here replace("/study/","https://www.churchofjesuschrist.org/study/") so the footnotes actually work
        outputBOMElement.innerHTML = chapterBody;

        // const footer = document.querySelector("footer");
        // footer.innerHTML = "";
    }

    fetch(urlBOM).then(convertToJson).then(displayScripts);
}

fetchDataIn("jacob", 1, "eng")
fetchDataIn("jacob", 1, "por")