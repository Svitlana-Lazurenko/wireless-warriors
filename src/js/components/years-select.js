import { ItcCustomSelect } from '../components/castom-select';

function MarkupYears () {
        const years = [];
        for(let i = 1960; i < 2024; i++) {
            years.push(i);
        }
        const data = years.map((data, index) => {
            return `<li class="itc-select__option" data-select="option" data-value="${index}" data-index="${index}">${data}</li>`
        }).join('');

        document.querySelector('.itc-select__year').insertAdjacentHTML('beforeend', data);
        new ItcCustomSelect('#select-1');
        document.querySelector('.itc-select__toggle').disabled = false;
}

MarkupYears();