window.addEventListener('DOMContentLoaded', () => {
    function cookiesPopupToHTML () {
            return `
<div class="wrapper-cookie">
    <div class="cookie-alert">
        <p>Мы используем файлы cookie, чтобы улучшить работу и повысить эффективность сайта.<br>
Продолжая пользование данным сайтом, вы соглашаетесь с <a href="./privacy-policy.html" target="_blank">использованием файлов cookie</a>.</p>
        <p class="cookie__text-button">
        <button type="button" data-accept class="cookie__button" >Согласен</button>
        </p>
    </div>
</div>
`
//Если в попапе планируется кнопка "Не согласен", то добавить в HTML это:
//  <p class="cookie__text-button">
//<button type="button" data-cancel class="cookie__button" >Нет</button>
//</p>
        }
        document.querySelector('body').insertAdjacentHTML('beforeend', cookiesPopupToHTML());
        class CookieAccept {
            constructor({popup, btnAccept, btnCancel, showClass = '', domain = '' } = {}) {
                this.popup = document.querySelector (popup);
                this.btnAccept = document.querySelector (btnAccept);
                //Если в попапе планируется кнопка "Не согласен", то раскомментировать строку ниже
                //this.btnCancel = document.querySelector (btnCancel);
                this.showClass = showClass;
                this.domain = domain;
                this.acceptPropertyType = 'visitor_accept'
            }
            getItem = (key) => {
                const cookie = document.cookie.split(';')
                                                .map(cookie => cookie
                                                .split('='))
                                                .reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});
                return cookie[key];
            }
            setItem = (key, value) => {
                const cookieString = `${key}=${value};domain=${this.domain};path=/;expires=Sun, 16 Jul 3000 06:23:41 GMT`;
                document.cookie = cookieString;
          }
              hasConsented = () => {
                if (this.getItem(this.acceptPropertyType) === "true") {
                    return true;
                } else {
                    return false;
                }
            }
            changeStatus = (prop) => {
                this.setItem (this.acceptPropertyType, prop);
                if (this.hasConsented ()) {
                    //Подписки, метрики и т.д.
                    myScripts ();
                }
            }
            bindTriggers = () => {
                this.btnAccept.addEventListener ('click', () => {
                    this.changeStatus (true);
                    this.popup.classList.remove (this.showClass);
                    console.log ('Loading...');
                });
                //Если в попапе планируется кнопка "Не согласен", то раскомментировать строки ниже
                //this.btnCancel.addEventListener ('click', () => {
                //    this.changeStatus (false);
                //    this.popup.classList.remove (this.showClass);
                //});
            }
            init = () => {
                try {
                    if (this.hasConsented()) {
                        myScripts ();
                    } else {
                        this.popup.classList.add (this.showClass);
                    }
                    this.bindTriggers();
                } catch(e) {
                    console.error('Переданы не все данные');
                }
            }
        }

		new CookieAccept({
            showClass: 'show',
            popup: '.wrapper-cookie',
            btnAccept: '[data-accept]',
            domain: 'accessoriestest.devops-azard.ru'
            //Если в попапе планируется кнопка "Не согласен", то раскомментировать строку ниже
            //btnCancel: '[data-cancel]'
        }).init();

        function myScripts () {
            console.log ('myScripts is run...')
        }
});