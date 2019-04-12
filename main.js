const fetchTranslation = async lang => 
    await (await fetch(`local/${lang}.json`)).json();

const populateTranslation = dict => 
  Object.keys(dict).forEach(t => {
      document.querySelector(`#${t}`).innerText = dict[t];
  });

const translate = lang => {
  fetchTranslation(lang)
    .then(dict => populateTranslation(dict));
};

window.onload = _ => {
  // plz work i don't have catch block
  translate('English');
}