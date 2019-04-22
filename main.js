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
  document.body.scrollTop > height - 1 || document.documentElement.scrollTop > height - 1 ?
    document.querySelector('header').style.backgroundColor = "rgba(0, 0, 0, 1)" :
    document.querySelector('header').style.backgroundColor = "rgba(0, 0, 0, 0)";
}

const loadSubscription = e => {
  console.log(e);
  // const button = document.querySelector('#real-signup-button');
  // const work = document.querySelector('')
  // button.addEventListener('click', _ => {
  //   emailjs.send("mailjet", "template_kvgAjN6o", {
  //     "work":"rewrew",
  //     "email_address":"543543",
  //     "name":"432432"
  //   })
  // });
}

window.onload = _ => {
  // plz work i don't have catch block
  translate('English');
}

window.onscroll = _ => {
  changeHeaderOnScroll();
}
