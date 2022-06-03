searchFormBtn.addEventListener("click", () => {
    location.hash = "search="
})
trendingBtn.addEventListener("click", () => {
    location.hash = "trends"
})
arrowBtn.addEventListener("click", () => {
    location.hash = "home"
})

window.addEventListener("hashchange", navigator, false)
window.addEventListener("load", navigator, false)

function navigator() {
    console.log({ location })

    if (location.hash.startsWith("#trends")) {
        trendsPage()
    }

    else if(location.hash.startsWith("#search=")){
        searchPage()
    }

    else if(location.hash.startsWith("#movie=")){
        movieDetailsPage()
    }
    
    else if(location.hash.startsWith("#category=")){
        categoriesPage()
    }

    else(
        homePage()
    )
}



function homePage() {
    console.log("Home!!")

    //header

    headerSection.classList.remove("header-container--long")
    headerSection.style.background  = ""
    arrowBtn.classList.add("inactive")
    headerTitle.classList.remove("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.remove("inactive")

    //Trending preview

    trendingPreviewSection.classList.remove("inactive")
    categoriesPreviewSection.classList.remove("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")



    trendingPreviewSection
    getTrendingMoviesPreview()
    getCategoriesPreview()
}

function trendsPage() {
    console.log("Trends!!")

    headerSection.classList.remove("header-container--long")
    // headerSection.style.background  = ""
    arrowBtn.classList.remove("header-arrow--white")
    arrowBtn.classList.remove("inactive")
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")

    //Trending preview

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")
}

function searchPage() {
    console.log("Search!!")

    headerSection.classList.remove("header-container--long")
    // headerSection.style.background  = ""
    arrowBtn.classList.remove("inactive")
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.remove("inactive")

    //Trending preview

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")
}

function movieDetailsPage() {
    headerSection.classList.add("header-container--long")
    // headerSection.style.background  = ""
    arrowBtn.classList.add("header-arrow--white")
    arrowBtn.classList.remove("inactive")
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.add("inactive")

    //Trending preview

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.remove("inactive")
}

function categoriesPage() {
    console.log("categories!!")

    //header

    headerSection.classList.remove("header-container--long")
    headerSection.style.background  = ""
    arrowBtn.classList.remove("header-arrow--white")
    arrowBtn.classList.remove("inactive")
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")

    //Trending preview

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")
}