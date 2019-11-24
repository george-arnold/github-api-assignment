//You've been assigned to work on one feature for the app - 
//to display a list of repos belonging to a particular GitHub handle.

// The user must be able to search for a GitHub user handle.
// The search must trigger a call to GitHub's API.
// You must display the repo name and link to the repo URL.
// The user must be able to make multiple searches and see only the results for the current search.

'use strict';

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {

  console.log(responseJson);

  $('#js-results').empty();

  for (let i = 0; i < responseJson.length; i++){
// The repos associated with that handle must be displayed on the page.
// You must display the repo name and link to the repo URL.
    $('#js-results').append(
  
      `<li>    
      <h2> ${responseJson[i].name} </h2>
      <h3><a href="${responseJson[i].url}">Link to Repo</a></h3>

     
      </li>`
    )};
};

function getUser(query) {

  const userName = query;
  const url = searchURL + userName  + '/repos';

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#user-search').val();
    getUser(searchTerm);
  });
}

$(watchForm);