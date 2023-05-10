const inputChangeThemem = document.querySelector('.header__input');
const animateUlm = document.querySelector('.header__animation');

inputChangeThemem.addEventListener('click', changeBtnOnThemem);
setupTheme ();
function changeBtnOnThemem () {

        currentScheme = localStorage.getItem('color-scheme');

if (currentScheme===null){
 
    localStorage.setItem('color-scheme',"theme__white");
    document.body.classList.add('theme__white'); 
}else if (currentScheme==='theme__white'){

    localStorage.setItem('color-scheme',"theme__dark");
    document.body.classList.remove('theme__white'); 
}else{

    document.body.classList.add('theme__white'); 
    localStorage.setItem('color-scheme',"theme__white");
}
}
function setupTheme () {
 
    currentScheme = localStorage.getItem('color-scheme');

if (currentScheme===null){
  
    localStorage.setItem('color-scheme',"theme__dark");
    document.body.classList.remove('theme__dark')

}else if (currentScheme==='theme__white'){
 
    localStorage.setItem('color-scheme',"theme__white");
    document.body.classList.add('theme__white');
 
}else{
   
    document.body.classList.remove('theme__white')
    
}
}

