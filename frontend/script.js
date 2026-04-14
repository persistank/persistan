function afficherPage(idPage){
    const toutesLesPages = document.querySelectorAll('.page');
    toutesLesPages.forEach(page => {page.style.display = 'none';})

    const pageDemandee = document.getElementById(idPage);
    pageDemandee.style.display = 'block';
}

var canvas_filtration = document.getElementById("filtration");
var ctx_filtration = canvas_filtration.getContext("2d");
ctx_filtration.fillStyle = "black";
ctx_filtration.fillRect(10, 10, 500, 500);

/* valeur dans la filtration et tableau a inserer dans la filtration gudhi et position "couple (x,y)" 
par exemple sommets[0] = (1, [0], (10.0,11.0))*/
let sommets = [];
let arretes = [];
let triangles = [];

let filtration = [];

let sommets_courant = [];

function ajouterSimplexe(){
    value = "";
    if (value=="0"){
        
    }
    else if (value =="1"){

    }
    else if (value=="2"){

    }
}

function calculPlusProcheVoisin(x_new,y_new){
    if (sommets.length()!=0){
        let min_dist = (x_new-sommets[0][0])^2 + (y_new-sommets[0][1])^2;
        let argmin=0;
        for ((x,y) of sommets){
            let dist = (x_new-x)^2 + (y_new-y)^2;
            if (dist < min_dist){
                argmin = 
            }
        }
    }
}

