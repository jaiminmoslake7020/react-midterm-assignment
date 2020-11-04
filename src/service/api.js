import ApiDataConfig from "./ApiDataConfig";

async function makeRequest(path, query = null ) {
    let apiUrl = "https://api.themoviedb.org/3";
    let apiKey = process.env.REACT_APP_API_KEY;

    if( query !== null ){
        apiUrl += path+"?api_key="+apiKey+"&query="+query;
    }else{
        apiUrl += path+"?api_key="+apiKey;
    }
    let result = {};
    let options = {
        method: "GET" ,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    } ;
    await fetch(apiUrl,  options )
        .then(response => response.json())
        .then(resData => {
            result = resData
        })
        .catch(  ( error ) => function(){
            console.error('Error:', error);
            return error;
        });

    return result
}

export function makeAnApiCall( categoryPath , listType , query = null ){
    if( categoryPath === ApiDataConfig.CategoryPath.Search ){
        return makeRequest( '/'+categoryPath+'/'+listType , query )
    }else{
        return makeRequest( '/'+categoryPath+'/'+listType )
    }
}
