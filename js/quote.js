const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

/**
 * https://api.quotable.io/random
 */

const apiKey = "mxZijLkf9V9Sbx86kwfvqCgvijn3WovHGpH2BtA8";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.quotable.io/random";

async function getQuote() {
  try {
    quote.innerText = "Updating...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btnEl.disabled = false;
    btnEl.innerText = "Get a quote";

    //console.log(data[0].joke);
    quoteEl.innerText = data.content;
    authorEl.innerText = "~ " + data.author;
  } catch (error) {
    quoteEl.innerText = "An error happened, please try again later.";
    authorEl.innerText = "An error happened.";
    quoteEl.disabled = false;
    quoteEl.innerText = "Get a quote";
    console.log(error);
  }
}

btnEl.addEventListener("click", getQuote);
