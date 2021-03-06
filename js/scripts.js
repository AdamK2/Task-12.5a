$.ajaxSetup({ cache: false });

var prefix = "https://cors-anywhere.herokuapp.com/";
// Stworzenie zmiennej ze standardowym linkiem do wysyłania tweetów na Twittera 
var tweetLink = "https://twitter.com/intent/tweet?text=";
// Stworzenie zmiennej z linkiem do API Quotes on Design, które pozwala nam pobierać losowe cytaty ze swojej bazy 
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// Pobieranie cytatu
function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
}

// Tworzenie tweeta
function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }	
	
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
		
	if (tweetText.length > 140) {
    getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
		}
	$('.tweet').attr('href', tweet);
}

// Po zaladowaniu strony:
$(document).ready(function() {
	// Wygenerowanie cytatu
    getQuote();	
	// Podpięcie cytatu na element o klasie ".trigger" (nasłuchiwanie na zdarzenie kliknięcia, po którym ma się wykonać funkcja generująca cytat).
    $('.trigger').click(function() {
        getQuote();
	})
});