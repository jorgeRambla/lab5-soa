$(document).ready(function () {
    registerSearch();
    registerTemplate();
});

function registerSearch() {
    $("#search").submit(function (ev) {
        event.preventDefault();
        $.get($(this).attr('action'), {q: $("#q").val(), 
                                    count: $("#qcount").val(),
                                    lang: $("#qlang :selected").val()}, function (data) {
            $("#resultsBlock").html(Mustache.render(template, data));
        });
    });
}

function registerTemplate() {
    template = $("#template").html();
    Mustache.parse(template);
}
