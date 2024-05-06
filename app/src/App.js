import './App.css';
import { useState} from 'react';


function App() {
  const [partite, setPartite] = useState([]);
  const [num, setNum] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [inLoad, setinLoad] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [numero, setnumero] = useState("");

  function gestisciCambioNumero(e){
    setnumero(e.target.value);
  }

  async function loadPartita() {
    num.tentativi=0;
    setnumero("");
    setShowForm(false);
    setinLoad(true);
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/partita`, { method: "POST" });
    const a = await response.json();
    setPartite(a);
    setInCaricamento(false);
  };
  async function tentativo() {
    const response = await fetch(`http://localhost:8080/partita/${partite.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero: numero}),
    });
    const a = await response.json();
    setNum(a);
    setShowForm(true);
  };

  return (
    <div className="App">
      <h1>Indovina numero</h1>
      <button onClick={loadPartita}>Nuova partita</button>
      <p></p>
      {
      inLoad &&
        <>
        {
          inCaricamento ?
            <div>In caricamento... </div>
            :
            <>
            
            ID:{partite.id}<br></br>

            Tentativo:{num.tentativi}<p></p>
            Inserisci un numero tra 1 e 100:<p></p>
            <input type="number" onChange={gestisciCambioNumero} value={numero}></input>
            <button onClick={tentativo}>invia</button>
            </>
            
        }
        </>
      }

      {showForm &&
      
        <>
          {num.risultato === 0 &&
          <>
          hai vinto in : {num.tentativi}
          </>
          
          }
          {num.risultato === -1 &&
          <>
          Il numero inserito è troppo piccolo
          </>
          
          }
          {num.risultato === +1 &&
          <>
          Il numero inserito è troppo grande
          </>
          
          }
          
        </>
      }

    </div>
  );
}

export default App;




