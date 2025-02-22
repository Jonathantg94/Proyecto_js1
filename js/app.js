document.addEventListener('DOMContentLoaded', function () {

  const ingresosLocalStorage = JSON.parse(localStorage.getItem('ingresos'));
  const ingresos = ingresosLocalStorage ? ingresosLocalStorage.map(ingreso => new Ingreso(ingreso._descripcion, parseFloat(ingreso._valor), ingreso._id)) : [
      new Ingreso('Salario', 2200),
      new Ingreso('Venta auto', 1500)
  ];

  const egresosLocalStorage = JSON.parse(localStorage.getItem('egresos'));
  const egresos = egresosLocalStorage ? egresosLocalStorage.map(egreso => new Egreso(egreso._descripcion, parseFloat(egreso._valor), egreso._id)) : [
      new Egreso('Renta', 900),
      new Egreso('Ropa', 400)
  ];

  let totalIngresos = () => {
      let sumaIngresos = 0;
      for (let ingreso of ingresos) {
          sumaIngresos += ingreso.valor;
      }
      return sumaIngresos;
  };

  let totalEgresos = () => {
      let sumaEgresos = 0;
      for (let egreso of egresos) {
          sumaEgresos += egreso.valor;
      }
      return sumaEgresos;
  };

  let formatoMoneda = (valor) => {
      return valor.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2
      });
  };

  let formatoPorcentaje = (valor) => {
      return valor.toLocaleString('es-MX', {
          style: 'percent',
          minimumFractionDigits: 2
      });
  };

  let cargarCabecero = () => {
      let presupuesto = totalIngresos() - totalEgresos();
      let porcentajeEgreso = totalEgresos() / totalIngresos();

      document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
      document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
      document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
      document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
  };

  let cargarIngresos = () => {
      let ingresosHTML = '';
      for (let ingreso of ingresos) {
          ingresosHTML += crearIngresoHTML(ingreso);
      }
      document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

      let eliminarBtnsIngresos = document.querySelectorAll('#lista-ingresos .elemento_eliminar--btn');
      eliminarBtnsIngresos.forEach(btn => {
          let id = parseInt(btn.dataset.id);
          btn.onclick = () => eliminarIngreso(id);
      });
  };

  let crearIngresoHTML = (ingreso) => {
      let ingresoHTML = `
          <div class="elemento limpiarEstilos">
              <div class="elemento_descripcion">${ingreso.descripcion}</div>
              <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                  <button class="elemento_eliminar--btn" data-id="${ingreso.id}"> <ion-icon name="close-circle-outline"></ion-icon></button>
              </div>
          </div>
      `;
      return ingresoHTML;
  };

  let eliminarIngreso = (id) => {
      const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);

      if (indiceEliminar !== -1) {
          ingresos.splice(indiceEliminar, 1);
          cargarCabecero();
          cargarIngresos();
          localStorage.setItem('ingresos', JSON.stringify(ingresos));
      } else {
          console.error("No se encontró el ingreso con el ID:", id);
      }
  };

  let cargarEgresos = () => {
      let egresosHTML = '';
      for (let egreso of egresos) {
          egresosHTML += crearEgresoHTML(egreso);
      }
      document.getElementById('lista-egresos').innerHTML = egresosHTML;

      let eliminarBtnsEgresos = document.querySelectorAll('#lista-egresos .elemento_eliminar--btn');
      eliminarBtnsEgresos.forEach(btn => {
          let id = parseInt(btn.dataset.id);
          btn.onclick = () => eliminarEgreso(id);
      });
  };

  let crearEgresoHTML = (egreso) => {
      let egresoHTML = `
          <div class="elemento limpiarEstilos">
              <div class="elemento_descripcion">${egreso.descripcion}</div>
              <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_eliminar">
                  <button class="elemento_eliminar--btn" data-id="${egreso.id}"> <ion-icon name="close-circle-outline"></ion-icon></button>
              </div>
          </div>
      `;
      return egresoHTML;
  };

  let eliminarEgreso = (id) => {
      const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);

      if (indiceEliminar !== -1) {
          egresos.splice(indiceEliminar, 1);
          cargarCabecero();
          cargarEgresos();
          localStorage.setItem('egresos', JSON.stringify(egresos));
      } else {
          console.error("No se encontró el egreso con el ID:", id);
      }
  };

  let agregarDato = (event) => {
      event.preventDefault();

      let forma = document.getElementById('forma');
      let tipo = forma.tipo.value;
      let descripcion = forma.descripcion.value;
      let valor = parseFloat(forma.valor.value);

      if (descripcion.trim() !== '' && !isNaN(valor)) {
          if (tipo === 'ingreso') {
              ingresos.push(new Ingreso(descripcion, valor));
          } else if (tipo === 'egreso') {
              egresos.push(new Egreso(descripcion, valor));
          }

          localStorage.setItem('ingresos', JSON.stringify(ingresos));
          localStorage.setItem('egresos', JSON.stringify(egresos));

          cargarCabecero();
          cargarIngresos();
          cargarEgresos();
          forma.reset();
      } else {
          alert("Por favor, ingrese una descripción y un valor numérico.");
      }
  };

  let cargarApp = () => {
      cargarCabecero();
      cargarIngresos();
      cargarEgresos();
  };

  cargarApp(); // Llamar a cargarApp DENTRO del evento DOMContentLoaded

  let agregarBtn = document.querySelector('.agregar_btn');
  if (agregarBtn) {
      agregarBtn.onclick = agregarDato;
  }
});