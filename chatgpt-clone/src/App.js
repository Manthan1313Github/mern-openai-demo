import "./App.css";

function App() {
  return (
    <div className="app">
      <section className="sidebar">
        <button>New chat</button>
        <ul className="history">
          <li>first item</li>
        </ul>
        <nav>
          <p>history</p>
        </nav>
      </section>
      <section className="main">
        <h1>Chatgpt React Clone</h1>
        <ul className="top-section"></ul>
        <div className="bottom-section">
          <div className="input-container">
            <input />
            <div id="submit">
              <p className="fa fa-angle-double-right"></p>
            </div>
          </div>
          <p className="metadata">Chat GPT version - 14</p>
        </div>
      </section>
    </div>
  );
}

export default App;
