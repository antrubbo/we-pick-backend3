// const express = require("express")
// const movies = express.Router()
const db = require("../models");
const Movie = db.Movies;
const List = db.Lists;
const axios = require('axios');
const { post } = require("../routes/movie.routes");

require('dotenv').config()
const KEY = process.env.KEY

const getAllMovies = async (req, res) => {
    const allMovies = await Movie.findAll()
    .then(all => {
        res.send(all)
    })
}

const getByTitle = (req, res) => {
    const { title } = req.query
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${title}&page=1&include_adult=false`)
    .then(response => {
        const { results } = response.data 
        if (results.length) res.status(200).json(results)
        else res.status(422).json( {error: "No results to display!"} )
    })
}

// use getById inside of create method if movie does not already exist, then create it. 
// let movie = await Movie.findByPk(id)
// if (!movie){
//     await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
//     .then(response => {res.json(response.data)})
// }
const getById = async (id) => {
    console.log("running")
    // const { id } = req.body
    let movieToFind = await Movie.findByPk(id)
    return movieToFind
    // .then(response => {
    //     res.send(response)
    // })
    // console.log(movie)
    // .catch(error => res.json({error: "No movie with that id!"}))
    // .catch(error => {
    //     res.status(404).json( {error: "No movie with that ID!"} )
    // })
    // if (!movie){
    //     axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
    //     .then(response => {res.json(response.data)})
    // }

    // axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
    // .then(response => res.json(response.data))
    // .catch(error => res.status(404).json( {error: "No movie with that ID!"} ))
}

const getPopular = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`)
    .then(response => {res.json(response.data)})
    .catch(response => response.status(404).json( {error: "Unable to get popular movies."} ))
}

const findOrCreate = (req, res) => {
    const {id} = req.params
    let movieToFind = getById(id)
    .then(movie => {
        if(!movie){
            let newMovie = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
            .then(movie => {
                const { title, release_date, runtime, poster_path } = movie.data
                Movie.create({ id, title, release_date, runtime, poster_path })
                .then(movie => {
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
                    .then(response => res.json(response.data))
                })
            })
            // let list = await List.findAll({ where: { id: list_id } }) // find list with id from req.body
            // await newMovie.addList(list[0].dataValues.id) //create join table assoc.
        } else {
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
            .then(response => res.json(response.data))
        }
    })
}

// can this functionality be included in the create method? this method is adding an existing movie to another users' list
const addToList = async (req, res) => {
    const { id, list_id } = req.body
    let movie = await Movie.findByPk(id)
    let list = await List.findByPk(list_id)
    await movie.addList(list.dataValues.id)
    res.status(200).json({status: "Movie Added To List", data: list})
}

module.exports = { getByTitle, getById, getPopular, findOrCreate, addToList, getAllMovies }