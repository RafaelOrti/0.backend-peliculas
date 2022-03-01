const axios = require('axios');
const PeliculasController = {};
const { Pelicula } = require('../models/index');
const { Op } = require('sequelize')



//Funciones del controlador
const key = '210d6a5dd3f16419ce349c9f1b200d6d'




//////////////////////// ENDPOINTS A Propia DB //////////////////////


//Random number between two limits function
const minMaxRoundedRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

// https://api.themoviedb.org/3/discover/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=5}&with_watch_monetization_types=flatrate

    //Film methods
PeliculasController.clonarPeliculas = async () => {
        let TMDBimgUrlRoot = "https://image.tmdb.org/t/p/original";
        let firstScan = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        let numbOfPagesTMDB = firstScan.data.total_pages
        let numbOfFilmsTMDB = firstScan.data.total_results
        for(let j=1 ; j<=25 ; j++) {
            let results1 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${minMaxRoundedRandom(1, 25)}&with_watch_monetization_types=flatrate`);
            let numbOfResultsPerPageTMDB = results1.data.results.length
            for(let i=0; i<numbOfResultsPerPageTMDB ; i++) {
                // let gen="";
                // for(res in results1.data.results[i].genre_ids){
                //     gen+=res+",";
                // }
                var res = results1.data.results[i].overview.substring(0, 2);
                Pelicula.create({
                    titulo : results1.data.results[i].original_title,
                    genero :  results1.data.results[i].genre_ids[0],
                    sinopsis : res,
                    adult : results1.data.results[i].adult,
                    popularity : results1.data.results[i].popularity,
                    imagen : (TMDBimgUrlRoot + "/" + results1.data.results[i].poster_path),
                    fecha : results1.data.results[i].popularity,
                    idioma : results1.data.results[i].original_language
                })
            }
        }

        return (`${25} páginas se han clonado con una cantidad de ${500} peliculas`)
};



//Registro de Peliculas en la BD propia
PeliculasController.registraPelicula = (req, res) => {

    let titulo = req.body.titulo;
    let genero = req.body.genero;
    let sinopsis = req.body.sinopsis;
    let adult = req.body.adult;
    let popularity = req.body.popularity;
    let imagen = req.body.imagen;
    let fecha = req.body.fecha;
    let idioma = req.body.idioma;

    Pelicula.findAll({
        where: { titulo: titulo }
    }).then(peliculaRepetida => {
        if (peliculaRepetida == 0) {
            Pelicula.create({
                titulo: titulo,
                genero: genero,
                sinopsis: sinopsis,
                adult: adult,
                popularity: popularity,
                imagen:imagen,
                fecha: fecha,
                idioma:idioma
            }).then(pelicula => {
                res.send(`${pelicula.titulo} ha sido registrada`)
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("La pelicula ya esta registrada")
        }

    }).catch(error => {
        res.send(error)
    });

};




//ACTUALIZAR Pelicula DB propia
PeliculasController.actualizarPelicula = (req, res) => {

    let id = req.body.id
    console.log("hola",id);
    let datos = req.body;
    try {

        Pelicula.update(datos,{
            where: { id: id }
        })
            .then(peliculaDel => {
                res.send(`La pelicula ${id} ha sido actualizada`)
            })

    } catch (error) {
        res.send(error)
    }

}



//Leer todos las Peliculas de nuestra propia DB
PeliculasController.traePeliculas = (req, res) => {

    Pelicula.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send(error)
        })

};



//Busca peliculas por Genero En propia BD
PeliculasController.peliculasGenero = (req, res) => {

    let genero = req.body.genero;

    Pelicula.findAll({
        where: { genero: genero }
    }).then(pelicula => {
        res.send(pelicula)
    }).catch(error => {
        res.send(error)
    })

}



//Buscar Peliculas por Genero y Titulo en propia DB
PeliculasController.peliculasGeneroTitulo = (req, res) => {

    let titulo = req.body.titulo
    let genero = req.body.genero

    Pelicula.findAll({
        where: {

            [Op.and]: [
                {
                    titulo: {
                        [Op.like]: titulo
                    }
                },
                {
                    genero: {
                        [Op.like]: genero
                    }
                }
            ]

        }
    }).then(pelicula => {

        if (pelicula != 0) {
            res.send(pelicula);
        } else {
            res.send(`Película no encontrada`);
        };

    }).catch(error => {
        res.send(error);
    })
};

//Busca peliculas por Adult En propia BD
PeliculasController.peliculasAdultos = (req, res) => {

    Pelicula.findAll({
        where: {
            [Op.not]: [
                {
                    adult: {
                        [Op.like]: 0
                    }
                }
            ]
        }
    }).then(pelicula => {
        res.send(pelicula)
    }).catch(error => {
        res.send(error)
    })

}




PeliculasController.peliculasAdultoTitulo = (req,res) => {


    let titulo = req.query.titulo;
    let adult = req.query.adult;


    Pelicula.findAll({
        where : {

            [Op.and] : [
                {
                    titulo : {
                        [Op.like] : titulo
                    }
                },
                {
                    adult : {
                        [Op.like] : adult
                    }
                },
            ]

        }
    }).then(films => {

        if(films != 0){
            res.send(films);
        }else {
            res.send(`Película no encontrada`);
        };

    }).catch(error => {
        res.send(error);
    })
};



PeliculasController.peliculasFavoritas = (req,res) => {

    let popularity = req.query.popularity;

    Pelicula.findAll({
        where : {

            [Op.and] : [
                {
                    popularity : {
                        [Op.like] : popularity
                    }
                }
            ]

        }
    }).then(films => {

        if(films != 0){
            res.send(films);
        }else {
            res.send(`Película no encontrada`);
        };

    }).catch(error => {
        res.send(error);
    })
};





//Borrar Pelicula todos las Peliculas de nuestra propia DB
PeliculasController.borrarPeliculas = (req, res) => {

    // Pelicula.findAll()
    //     .then(data => {
    //         res.send(data)
    //     })
    //     .catch(error => {
    //         res.send(error)
    //     })
    try {

        Pelicula.destroy({
            where: {},
            truncate: false
        })
            .then(peliculaDel => {
                res.send(`Las peliculas  han  sido eliminadaS`)
            })

    } catch (error) {
        res.send(error)
    }

};


//Borrar Pelicula DB propia
PeliculasController.borrarPelicula = (req, res) => {

    let id = req.body.id

    try {

        Pelicula.destroy({
            where: { id: id },
            truncate: false
        })
            .then(peliculaDel => {
                res.send(`La pelicula ${id} ha sido eliminada`)
            })

    } catch (error) {
        res.send(error)
    }

}








//////////////////////// ENDPOINTS A MOVIE DB //////////////////////





//Busqueda de peliculas por titulo
PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.titulo;

    try {

        let resultado = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${busqueda}&page=1&include_adult=false`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Trae novedades de MOvieDB
PeliculasController.traeNovedades = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}



// Traemos las peliculas con mejor nota -- /mejor_valoradas
PeliculasController.peliculasValoradas = async (req, res) => {

    try {
        let result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
        res.send(result.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}




//Busca Ultimas peliculas en MovieDB
PeliculasController.peliculasUltimas = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}




//Traemos las peliculas relacionadas con la pelicula ID
PeliculasController.peliculasRelacionadas = async (req, res) => {

    let id = req.params.id

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}



//Busca reviws de pelicula por ID en MOvieDB
PeliculasController.peliculasIdReviews = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Busca peliculas por ID en MovieDB
PeliculasController.peliculasPorId = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}





module.exports = PeliculasController;