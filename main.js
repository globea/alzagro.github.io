const fetchTranslation = async lang =>
  await (await fetch(`local/${lang}.json`)).json();

const populateTranslation = dict =>
  Object.keys(dict).forEach(t => {
    document.querySelector(`#${t}`).innerText = dict[t];
  });

const translate = lang => {
  fetchTranslation(lang).then(dict => populateTranslation(dict));
};

const changeLanguage = _ => {
  const languageButton = document.querySelector('#language_button');
  languageButton.addEventListener('click', e => {
    if (languageButton.innerText === 'HU') {
      translate('Hungarian');
      languageButton.innerText = 'ENG';
    } else {
      translate('English');
      languageButton.innerText = 'HU';
    }
    e.preventDefault();
  });
};

const positionBelowMainScreen = _ => {
  const height = document.querySelector('.main').clientHeight;
  return document.body.scrollTop > height - 1 || document.documentElement.scrollTop > height - 1;
}

const changeHeaderOnScroll = () => {
  const visibility = positionBelowMainScreen() ? '1' : '0';
  document.querySelector('header').style.backgroundColor = `rgba(40, 40, 40, ${visibility})`;
};

const formListenerInit = _ => {
  document.querySelector('#subscribe').addEventListener('submit', function(e) {
    e.preventDefault();
    if (e.isTrusted) {
      emailjs.send('mailjet_alzagro', 'template_kvgAjN6o', {
        name: e.target[0].value,
        email_address: e.target[1].value,
        work: e.target[2].innerText
      });
      e.target.classList.toggle('hidden');
      document.querySelector('#signup_success').classList.toggle('hidden');
    }
    return false;
  });
};

const detectCookie = _ => {
  const isConsentAgreed = document.cookie.split(';').filter((item) => item.trim().startsWith('cookieConsentAgreed=')).length === 0;
  const banner = document.querySelector('.banner');
  banner.style.display = isConsentAgreed ? 'flex': 'none';
}

const gimmeCookies = _ => {
  document.cookie = "cookieConsentAgreed=1";
  document.querySelector('.banner').style.display = 'none';
}

const hamburger = _ => {
  const popup = document.querySelector('.popup-list');
  document.querySelector('.hamburger').addEventListener('click', _ => {
    popup.classList.toggle('hidden');
  });
  window.addEventListener('scroll', _ => {
    if (!popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
    }
  })
}

window.onload = _ => {
  // plz work i don't have catch block
  translate('English');
  formListenerInit();
  changeLanguage();
  detectCookie();
  hamburger();
};

window.onscroll = _ => {
  changeHeaderOnScroll();
};
