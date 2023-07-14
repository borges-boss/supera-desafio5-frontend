import React, { useState, useEffect } from 'react';


const Table = (props) => {
  var itemsPerPage = props.itemsPerPage !== undefined && typeof props.itemsPerPage == 'number' ? Math.floor(props.itemsPerPage) : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(props.data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const [saldoTotal, setSaldoTotal] = useState(0.00);


  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calcSaldo = (data) => {
    let saldo = 0.00;

    if (Array.isArray(data)) {
      data.forEach((item) => {
        saldo = saldo + item.valor;
      })
    }

    return saldo.toFixed(2);
  }


  useEffect(()=> {
    setSaldoTotal(calcSaldo(props.data));
  },[]);

  

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Saldo Total: R$ { saldoTotal }</th>
            <th style={tableHeaderStyle}>Saldo No Periodo: R$ {calcSaldo(props.data)}</th>
            <th style={tableHeaderStyle}></th>
            <th style={tableHeaderStyle}></th>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Data</th>
            <th style={tableHeaderStyle}>Valencia</th>
            <th style={tableHeaderStyle}>Tipo</th>
            <th style={tableHeaderStyle}>Nome Operador Transacionario</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={tableCellStyle}>{new Date(item.dataTransferencia).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td>
              <td style={tableCellStyle}>{item.valor}</td>
              <td style={tableCellStyle}>{item.tipo}</td>
              <td style={tableCellStyle}>{item.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationStyle}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            style={pageNumber === currentPage ? activePageButtonStyle : pageButtonStyle}
            onClick={() => handlePaginationClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  background: '#f2f2f2',
  fontWeight: 'bold',
  padding: '8px',
  border: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '8px',
  border: '1px solid #ddd',
};

const paginationStyle = {
  marginTop: '16px',
  textAlign: 'center',
};

const pageButtonStyle = {
  background: '#f2f2f2',
  border: '1px solid #ddd',
  padding: '4px 8px',
  margin: '4px',
  cursor: 'pointer',
};

const activePageButtonStyle = {
  background: '#555',
  color: '#fff',
  border: '1px solid #ddd',
  padding: '4px 8px',
  margin: '4px',
  cursor: 'pointer',
};

export default Table;
