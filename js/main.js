

  const urlBOM = 'https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=eng&uri=/scriptures/bofm/jacob/1'
  let results = null;

  fetch(urlBOM)
    .then(response => response.json())
    .then(temples => {
        results = temples;
        
  });


alert(results);