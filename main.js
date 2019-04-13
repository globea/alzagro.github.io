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

const changeHeaderOnScroll = () => {
  const height = document.querySelector('.main').clientHeight;
  document.body.scrollTop > height || document.documentElement.scrollTop > height ?
    document.querySelector('header').style.backgroundColor = "rgba(0, 0, 0, 1)" :
    document.querySelector('header').style.backgroundColor = "rgba(0, 0, 0, 0)";
}

window.onload = _ => {
  // plz work i don't have catch block
  translate('English');
}

window.onscroll = _ => {
  changeHeaderOnScroll();
}
