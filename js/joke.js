const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

function getJoke() {
  console.log("clicked");
}

/**https://api-ninjas.com/
 * sheep100
 * Password01
 * api key: i0EDZiM5n2Dgl+glwh+Ykw==N6RDzmtRiAtzraG4
 */

const apiKey = "i0EDZiM5n2Dgl+glwh+Ykw==N6RDzmtRiAtzraG4";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
  try {
    joke.innerText = "Updating...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";

    //console.log(data[0].joke);
    jokeEl.innerText = data[0].joke;
  } catch (error) {
    jokeEl.innerText = "An error happened, please try again later.";
    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";
    console.log(error);
  }
}

btnEl.addEventListener("click", getJoke);
