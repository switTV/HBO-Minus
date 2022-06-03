const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",

    params: {
        "api_key": api_key
    },

    Headers:{
        "Content-Type": "application/json;charset=utf-8"
    }
})

async function getTrendingMoviesPreview() {
    const { data } = await api(`trending/movie/day`)
    const movies = data.results
    
    trendingMoviesPreviewList.innerHTML = ""

    movies.forEach(movie => {
        const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")

        const movieContainer = document.createElement("div")
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement("img")
        movieImg.classList.add("movie-img")

        movieImg.setAttribute("alt", movie.title)
        movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)

        movieContainer.appendChild(movieImg)
        trendingMoviesPreviewList.appendChild(movieContainer)

    });

}

async function getCategoriesPreview() {
    const { data } = await api(`genre/movie/list`)
    let counter = 0

    const categories = data.genres

    categoriesPreviewList.innerHTML = ""

    //* por cada elemento del array de categories vamos a poner una imagen de cada pelicula---------

    categories.forEach(movie => {

        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add('movie-container');

        const categoryTitle = document.createElement("h3")
        categoryTitle.classList.add("category-title")

        categoryTitle.setAttribute("id", `id${categories[counter].id}`)
        const categoryTitleText = document.createTextNode(categories[counter].name)

        counter++
        //* agregando las cosas dentro del HTML-------------
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        categoriesPreviewList.appendChild(categoryContainer)
    });

}