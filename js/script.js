$(document).ready(function(){
    //search tramite pulsante
    $('#search-button').click(function(){
        //memorizza il valore inserito e ripulisce il campo
        var thisFilm = $('#search-text').val();
        $('#search-text').val('');
        $('.movies-container').empty();
        //richiama funzione search sia per API movie che per API serie tv
        //e passa una stringa che identifica l'API di riferimento
        search(thisFilm, "https://api.themoviedb.org/3/search/movie", "Movie");
        search(thisFilm, "https://api.themoviedb.org/3/search/tv", "TV Series");
    });
    //search tramite tasto invio
    $('#search-text').on('keypress',function(e) {
    if(e.which == 13 || e.keyCode == 13) {
        //memorizza il valore inserito e ripulisce il campo
        var thisFilm = $('#search-text').val();
        $('#search-text').val('');
        $('.movies-container').empty();
        //richiama funzione search sia per API movie che per API serie tv
        //e passa una stringa che identifica l'API di riferimento
        search(thisFilm, "https://api.themoviedb.org/3/search/movie", "Movie");
        search(thisFilm, "https://api.themoviedb.org/3/search/tv", "TV Series");
        }
    });
});

//** FUNZIONI **//
//funzione di ricerca tramite chiamata AJAX
function search(data, url, type) {
    $.ajax({
        url: url,
        method: "GET",
        data:   {
                    'api_key': '4da0218809ca2f6f521556b2d525d050',
                    'query': data,
                    'language': 'it-IT'
                },
        success: function (risposta) {
            print(risposta, type);
        },
        error: function (richiesta, stato, errori) {
            alert("E' avvenuto un errore. " + errore);
        }
    });
}

//funzione di stampa tramite append del risultato
function print(risultato, type){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < risultato.results.length; i++){
        var context = {
            title: risultato.results[i].title || risultato.results[i].name,
            original_title: risultato.results[i].original_title || risultato.results[i].original_name,
            original_language: risultato.results[i].original_language,
            vote_average: stars(risultato.results[i].vote_average),
            type: type,
            poster: risultato.results[i].poster_path,
            overview: risultato.results[i].overview,
            cast: credits(risultato.results[i].id, type)
        }
        var html = template(context);
        $('.movies-container').append(html);

    }
}

//funzione che restituisce il valore del voto in stelle
//approssimato per eccesso
function stars(num){
    var vote = Math.ceil(num/2);
    var star = '';
    for (var i = 0; i < 5; i++){
        if (i <= vote){
            star += '<i class="fas fa-star"></i>';
        } else {
            star += '<i class="far fa-star"></i>';
        }
    }
    return star;
}

function credits(id, type){
    if(type == "TV Series"){
        $.ajax({
            url: "https://api.themoviedb.org/3/tv/" + id + "/credits",
            method: "GET",
            data: {
                'api_key': '4da0218809ca2f6f521556b2d525d050',
                // 'tv_id': id,
                'language': 'it-IT'
            },
            success: function (risposta) {
                var nameCast = "";
                for(var i = 0; i < 3; i++){
                    nameCast += risposta.cast[i].name + " ";
                }
                console.log(nameCast);
                return nameCast;
            },
            error: function (richiesta, stato, errori) {
                alert("E' avvenuto un errore.");
            }
        });
    } else if (type == "Movies"){
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + id ,
            method: "GET",
            data: {
                'api_key': '4da0218809ca2f6f521556b2d525d050',
                // 'movie_id': id,
                'language': 'it-IT'
            },
            success: function (risposta) {
                var nameCast = "";
                for(var i = 0; i < 3; i++){
                    nameCast += risposta.cast[i].name + " ";
                }
                return nameCast;
            },
            error: function (richiesta, stato, errori) {
                alert("E' avvenuto un errore.");
            }
        });
    }
}

//funzione alternativa che gestisce il tipo tra SerieTV e Movie
//sulla base di un campo discrimante di un'api rispetto all'altra
// function type(data){
//     if (data != null){
//         return 'Movie'
//     } else {
//         return 'Serie TV'
//     }
// }
