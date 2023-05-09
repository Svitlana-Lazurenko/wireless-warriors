const inputChangeTheme = document.querySelector('.header__input');
const animateUl = document.querySelector('.header__animation');

inputChangeTheme.addEventListener('click', changeBtnOnTheme);
setupTheme ();
function changeBtnOnTheme () {

    animateUl.classList.toggle('changeTheme');
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