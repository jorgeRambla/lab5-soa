$(document).ready(function () {
    registerSearch();
    registerTemplate();
});

function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  }

function registerSearch() {
    $("#search").submit(function (ev) {
        event.preventDefault();
        $.get($(this).attr('action'), {q: $("#q").val(), 
                                    count: $("#qcount").val(),
                                    lang: $("#qlang :selected").val()}, function (data) {
            var opt_selected = $("#qsort :selected").val();
            switch(opt_selected) {
                case "f_asc":
                    data = data.sort(
                        function(a, b) {
                            return parseFloat(a.user.followersCount) - parseFloat(b.user.followersCount)
                        }
                    )
                    break;
                case "f_desc":
                    data = data.sort(
                        function(a, b) {
                            return parseFloat(b.user.followersCount) - parseFloat(a.user.followersCount)
                        }
                    )
                    break;
                case "n_asc":
                    data = data.sort(
                        function(a, b) {
                            return a.user.screenName.localeCompare(b.user.screenName);
                        }
                    )
                    break;
                case "n_desc":
                    data = data.sort(
                        function(a, b) {
                            return b.user.screenName.localeCompare(a.user.screenName);
                        }
                    )
                    break;  
                default:
                    break;
            }
            $("#resultsBlock").html(Mustache.render(template, data));
        });
    });
}

function registerTemplate() {
    template = $("#template").html();
    Mustache.parse(template);
}
