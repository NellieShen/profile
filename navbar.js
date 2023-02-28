var navbar = ` 
<header>
  <a href="index.html" class="logo">Nellie's Home</a>

  <input type="checkbox" id="menu-bar" />
  <label for="menu-bar">Menu</label>
  <!--The <nav> tag defines a set of navigation links.-->
  <nav class="navbar">
    <!--The <ul> tag defines an unordered (bulleted) list.-->
    <ul>
      <li><a href="#">About</a></li>
      <li>
        <a href="#">Javascript +</a>
        <ul>
          <li><a href="joke.html">Joke of the day</a></li>
          <li>
            <a href="#">Tic Tac Toe +</a>
            <ul>
              <li><a href="tickTacToe.html">Tic Tac Toe Simple</a></li>
              <li><a href="tickTacToeAI.html">Tic Tac Toe AI</a></li>
            </ul>
          </li>
          <li><a href="randomQuote.html">Random Quote Generator</a></li>
          <li><a href="toDoList.html">To Do list</a></li>
        </ul>
      </li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>

`;

// inserting navbar in beginning of body
document.body.insertAdjacentHTML("afterbegin", navbar);
