const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  params: {
    "api_key": api_key,
    "language": "es-ES"
  },

  Headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

// utils ------------------------------------------------
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      const url = entry.target.getAttribute("data-img",)
      // console.log(entry.target)
      entry.target.setAttribute("src", url)

    }
  })
})

function createMovies(movies, container, {lazyLoad = false, clean = true} = {}) {
  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener("click", () => {
      location.hash = `movie=${movie.id}`
    })

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
    lazyLoad ? 'data-img': "src",
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    if(movie.poster_path == null){
      let titleName = document.createElement("h2")
      titleName.classList.add("titleMovie")
      titleName.innerHTML = movie.title

      movieContainer.append(titleName)

      movieImg.style.backgroundColor = "#8B48BF"
      movieImg.setAttribute('alt', "");
      movieImg.style.height = "183px"
      movieImg.style.position = "relative"
    }

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getPaginatedMovies(path, parametrosAdicionales){
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
  const pageIsNotBottom = page < maxPage;


  if (scrollIsBottom && pageIsNotBottom) {
    page++
    console.log(page)

    const { data } = await api(path, {
      params: {
        parametrosAdicionales,
      }
    });

    const movies = data.results;

    createMovies(movies, genericSection, {lazyLoad: true, clean: false})
    
  }
}

// utils ------------------------------------------------


async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, true)
}


async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;
  maxPage = data.total_pages

  createMovies(movies, genericSection)
}

async function getPaginatedTrendingMovies() {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
  const pageIsNotBottom = page < maxPage;


  if (scrollIsBottom && pageIsNotBottom) {
    page++
    console.log(page)

    const { data } = await api("trending/movie/day", {
      params: {
        page,
      }
    });

    const movies = data.results;
    const maxPage = data.total_pages

    createMovies(movies, genericSection, {lazyLoad: true, clean: false})
    
  }
}

async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}`);

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`

  movieDetailTitle.textContent = movie.title
  movieDetailDescription.textContent = movie.overview
  movieDetailScore.textContent = movie.vote_average

  createCategories(movie.genres, movieDetailCategoriesList)
  getRelatedMoviesId(id)
}


async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/similar`);
  const relatedMovies = data.results

  createMovies(relatedMovies, relatedMoviesContainer)
}


async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList)
}


async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages

  createMovies(movies, genericSection, true)
}


function getPaginatedMoviesByCategory(id) {
  return async function () {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;
    
      createMovies(
        movies,
        genericSection,
        { lazyLoad: true, clean: false },
      );
    }
  }
}



async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages
  console.log(maxPage)

  createMovies(movies, genericSection)
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
    const pageIsNotBottom = page < maxPage; 
    
    if (scrollIsBottom && pageIsNotBottom) {
      page++
      console.log(page)   
      const { data } = await api("discover/movie", {
        params: {
          query,
          page,
        }
      });  
      const movies = data.results;
      createMovies(movies, genericSection, {lazyLoad: true, clean: false})    
    }
  }
}


async function getPaginatedMoviesById() {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)

  const pageIsNotBottom = page < maxPage;

  if (scrollIsBottom && pageIsNotBottom) {
    page++

    const { data } = await api('trending/movie/day', {
      params: {
        page,
      }
    });

    const movies = data.results;

    createMovies(movies, genericSection, {lazyLoad: true, clean: false})
    
  }
}