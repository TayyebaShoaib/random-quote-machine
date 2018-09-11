$(document).ready(function () {

    function getNewQuote() {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                method: "getQuote",
                lang: "en",
                format: "jsonp"
            },
            success: function (response) {
                var quote = response.quoteText;
                var author = response.quoteAuthor;
                var sentence = encodeURI(quote) + "%20" + encodeURI(author) + "%20%23quote";
                var twitterText = "https://twitter.com/intent/tweet?text=" + sentence;
                $(".twitter").attr("href", twitterText);
                $("#quote").text(quote);
                if (author) {
                    $("#author").text("- " + author);
                } else {
                    $("#author").text("- " + "Anonymus");
                }
            }
        });
    }

    function changeColour() 
    {
        var color = makeColor();

        $("#quote, #author, i").css("color", color);
        $("i").css("border-color", color).css("color", color);
        $("#button").css("background-color", color);

        $(".twitter").hover(function () {
            $(".twitter, .twitter i").css("background-color", color);
            $(".twitter i").css("color", "#fff");
        }, function () {
            $(".twitter, .twitter i").css("background-color", "#fff");
            $(".twitter i").css("color", color);
        });
        $(".facebook").hover(function () {
            $(".facebook, .facebook i").css("background-color", color);
            $(".facebook i").css("color", "#fff");
        }, function () {
            $(".facebook, .facebook i").css("background-color", "#fff");
            $(".facebook i").css("color", color);
        });
        $("#button").hover(function () {
            $("#button").css("opacity", "0.8");
        }, function () {
            $("#button").css("opacity", "1");
        });
    }

    function makeColor() 
    {
        var arr = [];
        for(var i = 0; i < 3; i++) {
            var num = Math.floor(Math.random() * 256);
            arr.push(num);
        }
        var newRgb = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
        return newRgb;
    }
    $("#button").on("click", function () {
        getNewQuote();
        changeColour();
    });

});