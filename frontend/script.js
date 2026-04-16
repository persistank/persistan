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
canvas_filtration.addEventListener('click', function(event) {
   ajouterSimplexe(event)
});


/* valeur dans la filtration et tableau a inserer dans la filtration gudhi et position "couple (x,y)" 
par exemple sommets[0] = (1, [0], (10.0,11.0)) - > pour la fitration finale on a just à insérer le contenu des 3 listes dans gudhi*/
let sommets = [];
let arretes = [];
let triangles = [];
let filtration_value_courant = 1;
let sommets_courant = [];

let epsilon = 250;


function ajouterSimplexe(event){
    let value = document.querySelector('input[name="simplexe"]:checked').value;
    const rect = canvas_filtration.getBoundingClientRect();
    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;
    if (value=="0"){
        let [_,dist] = calculPlusProcheVoisin(posX,posY)
        if (dist > epsilon){
            sommets.push([filtration_value_courant, [sommets.length], [posX,posY]])
            filtration_value_courant+=1;
            ctx_filtration.fillStyle = "blue"; 
            ctx_filtration.beginPath();        
            ctx_filtration.arc(posX, posY, 8, 0, 2 * Math.PI);
            ctx_filtration.fill();             
        }
    }
}

let limite_n_sommets = 15;

function calculPlusProcheVoisin(x_new,y_new){
    let n_sommets = sommets.length;
    if (n_sommets>0 && n_sommets<limite_n_sommets){
        let x_0 = sommets[0][2][0];
        let y_0 = sommets[0][2][1];
        let min_dist = (x_new - x_0)**2 + (y_new - y_0)**2;
        let argmin=0;
        for (let i=0;i<n_sommets;i++) {
            let numero_i = sommets[i][1][0];
            let [x,y] = sommets[i][2];
            let dist = (x_new-x)**2 + (y_new-y)**2;
            if (dist <min_dist){
                argmin = numero_i;
                min_dist=dist;
                /* ce sera utile de connaitre le numero des plus proches voisins pour la création de 1-simplexe et 2-simplexe.*/
            }
        }
        return [argmin, min_dist]
    }
    else if (n_sommets==0){
        return [0,10000000]
    }
    else{
        console.log("too much");
        return [0,0];
    }

}
