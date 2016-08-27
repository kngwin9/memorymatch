/**
 * Created by Weizguy on 8/25/2016.
 */


$(document).ready(function () {

    randomImg();
    gamePlay();
    $(".card").flip({
        trigger: 'manual'
    });
});

// Declare all of the global variables
var cardArray = [1, 2]; //, 3, 4, 5, 6, 7, 8, 9];
cardArray = cardArray.concat(cardArray);
var clickable = true;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

// Create random images based on the available number of cards
function randomImg() {

    var ranArray = [];
    var newCardArray = cardArray.slice();
    while (newCardArray.length != 0) {
        var ran = Math.floor(Math.random() * (newCardArray.length - 1) - 1) + 1;
        ranArray.push(newCardArray[ran]);
        newCardArray.splice(ran, 1);
    }

    $('.back').each(function (val) {

        console.log("current image number: ", ranArray[val]);
        $(this).css('background', 'url(' + 'images/cards/' + ranArray[val] + '.jpg' + ')');
        $(this).css('background-size', '150px 200px');

    });
}

// Gameplay code
function gamePlay() {


    $(".card").click(function () {

        if ($(this).hasClass("revealed")) {
            $(this).flip(false);

            return;
        }
        if (clickable == false) {
            $(this).flip(false);
            console.log("what is clickable???", clickable);
            return;
        }
        $(this).flip(true);
        $(this).addClass("revealed");
        if (first_card_clicked == null) {
            first_card_clicked = $(this);

        } else {
            second_card_clicked = $(this);

            var first_card_background = first_card_clicked.children(".back").css('background');
            var second_card_background = second_card_clicked.children(".back").css('background');

            if (second_card_background == first_card_background) {

                matched();

            } else {
                clickable = false;
                console.log("Just before not_matched function, is it clickable: ", clickable);
                setTimeout(not_matched, 1500);
            }
        }

    });

}

function matched() {
    match_counter = match_counter + 1;

    console.log("In matched function, is it clickable: ", clickable);
    if (match_counter == total_possible_matches) {
        $("#footer p").text("YOU WIN!!!");
    } else {

        $("#footer p").text("GOOD JOB, KEEP GOING!");
    }
    setTimeout(stopFlip, 1000);

}

function not_matched() {
    first_card_clicked.removeClass('revealed').flip(false);
    second_card_clicked.removeClass('revealed').flip(false);
    first_card_clicked = null;
    second_card_clicked = null;
    clickable = true;
    $(".card").flip(false);
    console.log("In not_matched function, is it clickable: ", clickable);
    $("#footer p").text("WHOOPS, WRONG!!");
}

function stopFlip() {
    first_card_clicked.unbind("click");
    second_card_clicked.unbind("click");
    first_card_clicked = null;
    second_card_clicked = null;

}

function reset() {
    $(".card").flip(false);
    randomImg();
    gamePlay();
    $(".card").flip();

}
