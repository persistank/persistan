function afficherPage(idPage){
    const toutesLesPages = document.querySelectorAll('.page');
    toutesLesPages.forEach(page => {page.style.display = 'none';})

    const pageDemandee = document.getElementById(idPage);
    pageDemandee.style.display = 'block';
}