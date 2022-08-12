const language = document.querySelector('#language')

language.addEventListener('change', (e) => changeLanguage(e))

// let languageOptions = ['en', 'id']

function changeLanguage(e){
    let lang = e.target;

    localStorage.setItem('lang', JSON.stringify({'lang' : lang.value}));

    const htmlElement = document.querySelector(':root')

    let langHistory = JSON.parse(localStorage.getItem('lang'))
    
    htmlElement.lang = langHistory
}