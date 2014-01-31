/// <reference path="jQuery.js" />
/// <reference path="taffyDB.js" />

(function () {
    $("#start-screen").fadeIn();
    $("#start").on("click", function () {
        $("#start-screen").fadeOut();
        $("#play-screen").css("display", "inline-block").fadeIn();
    });

    var generateSecretNumber = function () {
        var secretNumberArr = [4];
        var found = false;
        var count = 0;

        while (count < 4) {
            number = Math.random() * 10;
            var numberA = number.toFixed(0);

            if (numberA != 0 & numberA < 10) {
                if (numberA !== secretNumberArr[0] & numberA !== secretNumberArr[1] & numberA !== secretNumberArr[2] & numberA !== secretNumberArr[3]) {
                    secretNumberArr[count] = numberA;
                    count++;
                }
            }
        }

        return secretNumberArr;
    };

    var secretNumber = generateSecretNumber();

    var scores = TAFFY();

    var submitScore = function () {
        var userName = $("#userName").val();
        var totalCount = $("#guessCount").text();
        $("#newGame-screen").css("display", "block");

        scores.insert({ user: userName, counts: totalCount });

        $("#bestScore").text(scores().order("totalCount").first().user + " " + scores().order("totalCount").first().counts);

        scores().order("user").first().user + " " + scores().order("totalCount").first().counts

        scores().each(function (r) {
            console.log(r.user + " " + r.counts)
        })
    }

    var newGame = function () {
        secretNumber = generateSecretNumber();

        $("#cantStatus").text("0");
        $("#watStatus").text("0");
        $(".input").val("");
        $("#guessCount").text("0");
        $("#newGame-screen").css("display", "none");
        $("#win-scrn").css("display", "none");
        $("#play-screen").css("display", "block");
        $("#userName").val("");
    };

    var searchForMelons = function () {
        var currentNumberOfGuesses = $("#guessCount").text();

        var guessNumbers = [];
        guessNumbers[0] = $("#firstNumber").val();
        guessNumbers[1] = $("#secondNumber").val();
        guessNumbers[2] = $("#thirdNumber").val();
        guessNumbers[3] = $("#fourthNumber").val();

        var melonsCount = 0;
        var watermelonsCount = 0;

        for (var melonCheckIndex = 0; melonCheckIndex < secretNumber.length; melonCheckIndex++) {
            if (guessNumbers[melonCheckIndex] === secretNumber[melonCheckIndex]) {
                melonsCount++;
            }
        }

        for (var currentSecretNumberIndex = 0; currentSecretNumberIndex < secretNumber.length; currentSecretNumberIndex++) {
            for (var watermelonCheckIndex = 0; watermelonCheckIndex < secretNumber.length; watermelonCheckIndex++) {
                if (watermelonCheckIndex !== currentSecretNumberIndex) {
                    if (guessNumbers[watermelonCheckIndex] === secretNumber[currentSecretNumberIndex]) {
                        watermelonsCount++;
                    }
                }
            }
        }

        $("#cantStatus").text("x" + melonsCount);
        $("#watStatus").text("x" + watermelonsCount);

        var guessCount = 0;
        for (var checkNumbers = 0; checkNumbers < secretNumber.length; checkNumbers++) {
            if (secretNumber[checkNumbers] === guessNumbers[checkNumbers]) {
                guessCount++;
            }
        }

        var print = parseInt(currentNumberOfGuesses);
        $("#guessCount").empty();
        $("#guessCount").text(print + 1);

        if (melonsCount === 4) {
            $("#win-scrn").css("display", "block");
        }
    }

    $("#bam").on("click", function () { searchForMelons() });
    $("#btn-submit").on("click", function () { submitScore() });
    $("#btn-newGame").on("click", function () { newGame() });
}());