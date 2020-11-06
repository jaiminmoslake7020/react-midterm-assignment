const ApiDataConfig = {
    InsideSelectionAllowed : [
        "movie",
        "tv",
    ],
    Default : {
        Category : "movie",
        ListType : "now_playing"
    },
    DefaultLinks : {
        Movie : "now_playing",
        TV : "airing_today",
        Search : "movie"
    },
    Category : {
        Movie : "Movie",
        TV : "TV",
        Search : "Search",
    },
    CategoryPathToCategory : {
        movie : "Movie",
        tv : "TV",
        search : "Search",
    },
    CategoryPath : {
        Movie : "movie",
        TV : "tv",
        Search : "search",
    },
    TabCategoryPathSelectedItem : {
        movie : 0,
        search : 1,
        tv : 2
    },
    Movie : {
        now_playing : "now_playing",
        popular: "popular",
        top_rated : "top_rated",
        upcoming : "upcoming"
    },
    TV : {
        airing_today : "airing_today",
        on_the_air: "on_the_air",
        popular : "popular",
        top_rated : "top_rated"
    },
    Search : {
        movie : "movie",
        multi : "multi",
        tv : "tv"
    },
    SearchMsgs : {
        searchQueryEntered : "Please initiate search.",
        noSearchResults : "Sorry, there were no results.",
        emptySearccQuery : "Please enter a search"
    }
};
export default ApiDataConfig;

export function getDefaultCategory(){
   return ApiDataConfig.Default.Category ;
}

export function getCategoryListTypesArrayByCategoryPath( categoryPath ){
    let category = ApiDataConfig.CategoryPathToCategory[categoryPath];
    return getCategoryListTypesArrayFromCategoryName( category );
}

export function getCategoryListTypesArrayFromCategoryName(category ){
    return Object.keys(ApiDataConfig[ category ]);
}

export function getCategoryList( category ){
    return Object.keys(ApiDataConfig.Category);
}

export function getCategoryPathList( category ){
    return Object.values(ApiDataConfig.CategoryPath);
}

export function getCategoryPath( category ){
    return ApiDataConfig.CategoryPath[ category ];
}

export function isInsideSelectionAllowed( category ){
    return ApiDataConfig.InsideSelectionAllowed.includes( category );
}