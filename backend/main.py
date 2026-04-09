from fastapi import FastAPI
from pydantic import BaseModel
import gudhi
import numpy as np

#necessaire pour des raisons de sécurité
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title = 'persistan.fr API', description='moteur de calcul topologique interactif')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NuageDePoints(BaseModel):
    points: list[list[float]]


@app.post("/calculer_persistance")
async def calcul_persisance(donnees:NuageDePoints):
    points_np = np.array(donnees.points)

    complex = gudhi.RipsComplex(points = points_np)
    simplex_tree = complex.create_simplex_tree()
    simplex_tree.compute_persistence()

    diagramme_brut = simplex_tree.persistence()

    diagramme_propre = []

    for dim,(b,d) in diagramme_brut:
        if d != float('inf'):
            diagramme_propre.append({
                "dim": dim,
                "birth": float(np.sqrt(b)), 
                "death": float(np.sqrt(d))
            })
    return {"diagramme": diagramme_propre}

