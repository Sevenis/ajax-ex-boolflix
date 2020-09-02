$(document).ready(function(){
    //search tramite pulsante
    $('#search-button').click(function(){
        //memorizza il valore inserito e ripulisce il campo
        var thisFilm = $('#search-text').val();
        $('#search-text').val('');
        //richiama funzione search
        search(thisFilm);
    });
    //search tramite tasto invio
    $('#search-text').on('keypress',function(e) {
    if(e.which == 13 || e.keyCode == 13) {
        //memorizza il valore inserito e ripulisce il campo
        var thisFilm = $('#search-text').val();
        $('#search-text').val('');
        //richiama funzione search
        search(thisFilm);
        }
    });
});

//** FUNZIONI
//funzione di ricerca tramite chiamata AJAX
function search(data) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        data:   {
                    'api_key': '4da0218809ca2f6f521556b2d525d050',
                    'query': data,
                    'language': 'it-IT'
                },

        success: function (risposta) {
            print(risposta);
        }
    });
}

//funzione di stampa tramite append del risultato
function print(risultato){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    $('.movies-container').empty();

    for (var i = 0; i < risultato.results.length; i++){
        var context = risultato.results[i];
        var html = template(context);
        $('.movies-container').append(html);
    }
}
