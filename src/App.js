import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';


function App() {

  const [data, setData] = useState([]);
  const [dataTransferenciaStart, setDataTransferenciaStart] = useState(null);
  const [dataTransferenciaEnd, setDataTransferenciaEnd] = useState(null);
  const [nomeOperadorTransacao, setNomeOperadorTransacao] = useState(null);

  //Functions
  function search(dataTransferenciaStart, dataTransferenciaEnd, nomeOperadorTransacao) {
    //Alterar endpoint quando testar
    const endpoint = 'https://8080-superainova-psjavareact-dtg4g265t05.ws-us101.gitpod.io/api/transferencias/getTransferenciasByFilter/';
    const formData = new URLSearchParams();
    if (dataTransferenciaStart)
      formData.append('dataTransferenciaStart', dataTransferenciaStart);

    if (dataTransferenciaEnd)
      formData.append('dataTransferenciaEnd', dataTransferenciaEnd);

    if (nomeOperadorTransacao)
      formData.append('nomeOperadorTransacao', nomeOperadorTransacao);

    console.log(dataTransferenciaStart, dataTransferenciaEnd, nomeOperadorTransacao);

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setData(data);
        }
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  function formatDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.000+03:00';
  }

  //Handlers
  const handleDateChangeStart = (event) => {
    const selectedValue = new Date(event.target.value);
    setDataTransferenciaStart(event.target.value ? formatDate(selectedValue.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })) : null);
  };

  const handleDateChangeEnd = (event) => {
    const selectedValue = new Date(event.target.value);
    setDataTransferenciaEnd(event.target.value ? formatDate(selectedValue.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })) : null);
  };

  const handleButtonClick = () => {
    search(dataTransferenciaStart, dataTransferenciaEnd, nomeOperadorTransacao);
  }

  useEffect(() => {
    search(null, null, null);
  }, []);


  return (
    <div className="App">
      <div style={{ padding: '10%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '10px' }}>
            <div>
              <label style={{ marginBottom: '5px' }} htmlFor="dataInicial">
                Data Inicial
              </label>
            </div>
            <input
              style={{ marginBottom: '10px' }}
              type="datetime-local"
              id="dataInicial"
              onChange={handleDateChangeStart}
            />
          </div>
          <div style={{ marginRight: '10px' }}>
            <div>
              <label style={{ marginBottom: '5px' }} htmlFor="dataFinal">
                Data Final
              </label>
            </div>
            <input
              style={{ marginBottom: '10px' }}
              type="datetime-local"
              id="dataFinal"
              onChange={handleDateChangeEnd}
            />
          </div>
          <div>
            <div>
              <label style={{ marginBottom: '5px' }} htmlFor="nomeOperador">
                Nome Operador Transacionado
              </label>
            </div>
            <input
              style={{ marginBottom: '10px' }}
              type="text"
              id="nomeOperador"
              value={nomeOperadorTransacao}
              maxLength={200}
              onChange={(event) => {
                setNomeOperadorTransacao(event.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: '24px' }}>
            <button style={{ background: '#000', color: 'white' }} onClick={handleButtonClick}>Pesquisar</button>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
