const fetchTranslation = async lang =>
  await (await fetch(`local/${lang}.json`)).json();

const populateTranslation = dict =>
  Object.keys(dict).forEach(t => {
    document.querySelector(`#${t}`).innerText = dict[t];
  });

const translate = lang => {
  fetchTranslation(lang).then(dict => populateTranslation(dict));
};

const changeHeaderOnScroll = () => {
  const height = document.querySelector(".main").clientHeight;
  document.body.scrollTop > height - 1 ||
  document.documentElement.scrollTop > height - 1
    ? (document.querySelector("header").style.backgroundColor =
        "rgba(0, 0, 0, 1)")
    : (document.querySelector("header").style.backgroundColor =
        "rgba(0, 0, 0, 0)");
};

const formListenerInit = _ => {
  document.querySelector("#subscribe").addEventListener("submit", function(e) {
    e.preventDefault();
    if (e.isTrusted) {
      emailjs.send("mailjet_alzagro", "template_kvgAjN6o", {
        name: e.target[0].value,
        email_address: e.target[1].value,
        work: e.target[2].innerText
      });
      e.target.classList.toggle("hidden");
      document.querySelector("#signup_success").classList.toggle("hidden");
    }
    return false;
  });
};

window.onload = _ => {
  // plz work i don't have catch block
  translate("English");
  formListenerInit();
};

window.onscroll = _ => {
  changeHeaderOnScroll();
};
