var domainName = "http://pokeapi.co",
    pokemonUrl = "/api/v1/pokemon/",
    defaultUrl = "/api/v1/pokemon/?limit=10";

$(document).ready(function () {
    getPokemons();

    $("#loadMore").click(function (element) {
        togglePreventClick(true);

        getPokemons($(element.target).attr('data-url'));
    });

    $("#pokemonsContainer").on("click", ".pokemonContainer img", function (pokemon) {
        var id = $(pokemon.target).parent().attr('data-id'),
            url = pokemonUrl + id;

        togglePreventClick(true);

        getPokemon(url);
    });
});

var togglePreventClick = function (add) {
    $("body").toggleClass('prevent-click', add);
}


var getPokemons = function (url) {
    url = url || defaultUrl;

    console.log(domainName + url);

    $.get(domainName + url)
        .done(function (data) {
            data.objects.forEach(function (item) {
                var $pokemonContainer = getTemplate("pokemonContainerTemplate");

                $pokemonContainer.attr("data-id", item.pkdx_id);
                $pokemonContainer.find("img").attr("src", "http://pokeapi.co/media/img/" + item.pkdx_id + ".png");
                $pokemonContainer.find(".name").html(item.name);

                item.types.forEach(function (type) {
                    var $pokemonType = getTemplate("pokemonTypeTemplate");
                    $pokemonType.attr("data-type", type.name);
                    $pokemonType.attr("class", "tp tp-" + type.name);
                    $pokemonType.html(type.name);
                    $pokemonContainer.find(".type").append($pokemonType);
                    /*if($pokemonContainer.find(".type p").attr("data-type") === type.name){
                     $pokemonContainer.find(".type p").addClass("tp tp-" + type.name);
                     }*/
                });

                $("#pokemonsContainer").append($pokemonContainer);
            });

            $('#loadMore').attr('data-url', data.meta.next);

            togglePreventClick(false);
        });
};

var getPokemon = function (pokemon) {
    console.log(domainName + pokemon);

    return $.get(domainName + pokemon)
        .done(function (data) {
            console.log(data);

            var $pokemonPopup = getTemplate("pokemonPopupTemplate");

            $pokemonPopup.find(".name").html(data.name);
            $pokemonPopup.find("img").attr("src", "http://pokeapi.co/media/img/" + data.pkdx_id + ".png");
            /*Object.keys(data).forEach(function (key) {
             var stat = data[key],
             $el = $pokemonPopup.find(".stats ." + key);

             if($el.length) {
             $el.html(stat);
             }
             });*/

            data.types.forEach(function (type) {
                $pokemonPopup.find(".stats .types").append(type.name + " ");
            });
            $pokemonPopup.find(".stats .attack").html(data.attack);
            $pokemonPopup.find(".stats .defense").html(data.defense);
            $pokemonPopup.find(".stats .hp").html(data.hp);
            $pokemonPopup.find(".stats .sp_atk").html(data.sp_atk);
            $pokemonPopup.find(".stats .sp_def").html(data.sp_def);
            $pokemonPopup.find(".stats .speed").html(data.speed);
            $pokemonPopup.find(".stats .weight").html(data.weight);
            $pokemonPopup.find(".stats .total_moves").html(data.moves.length);

            $("#myModal .modal-dialog").html($pokemonPopup);

            $('#myModal').modal("toggle");

            togglePreventClick(false);
        });
};

var getTemplate = function (id) {
    return $($("#" + id).html());
};
