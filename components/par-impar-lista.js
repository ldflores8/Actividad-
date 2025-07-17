class NumeroRango extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .contenedor-rango {
          background: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0 auto 30px;
        }
        .grupo-input {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #5d3fd3;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 2px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        button {
          background-color: #5d3fd3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          width: 100%;
        }
        .mensaje-error {
          color: #e74c3c;
          margin-top: 10px;
          font-size: 0.9em;
        }
      </style>
      <div class="contenedor-rango">
        <form>
          <div class="grupo-input">
            <label for="inicio">Desde:</label>
            <input type="number" id="inicio" placeholder="Ej: 1" />
          </div>
          <div class="grupo-input">
            <label for="fin">Hasta:</label>
            <input type="number" id="fin" placeholder="Ej: 10" />
          </div>
          <button type="submit">Generar Lista</button>
          <div id="error" class="mensaje-error"></div>
        </form>
      </div>
    `;

    const form = this.shadowRoot.querySelector('form');
    const inicioInput = this.shadowRoot.getElementById('inicio');
    const finInput = this.shadowRoot.getElementById('fin');
    const errorMsg = this.shadowRoot.getElementById('error');

    form.addEventListener('submit', e => {
      e.preventDefault();
      errorMsg.textContent = '';

      const inicio = parseInt(inicioInput.value);
      const fin = parseInt(finInput.value);

      if (isNaN(inicio) || isNaN(fin)) {
        errorMsg.textContent = 'Ambos valores deben ser números válidos.';
        return;
      }

      if (inicio > fin) {
        errorMsg.textContent = 'El valor inicial no puede ser mayor al final.';
        return;
      }

      this.dispatchEvent(new CustomEvent('rango-generado', {
        detail: { inicio, fin },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('numero-rango', NumeroRango);