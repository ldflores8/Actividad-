class ListaParidad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <div id="contenedor-lista"></div>
    `;

    document.addEventListener('rango-generado', (e) => {
      this.generarLista(e.detail);
    });
  }

  generarLista({ inicio, fin }) {
    const contenedor = this.shadowRoot.getElementById('contenedor-lista');
    let html = `
      <style>
        .lista-numeros {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0 auto;
        }
        .item-numero {
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
        }
        .par {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        .impar {
          background-color: #ffebee;
          color: #c62828;
        }
        .valor {
          font-weight: bold;
        }
      </style>
      <div class="lista-numeros">
        <h3>Resultados (${inicio} - ${fin})</h3>
    `;

    for (let i = inicio; i <= fin; i++) {
      const esPar = i % 2 === 0;
      html += `
        <div class="item-numero ${esPar ? 'par' : 'impar'}">
          <span class="valor">${i}</span>
          <span>${esPar ? 'PAR' : 'IMPAR'}</span>
        </div>
      `;
    }

    html += `</div>`;
    contenedor.innerHTML = html;
  }
}

customElements.define('lista-paridad', ListaParidad);