const ingresos = [
  new Ingreso('Salario', 2200),
  new Ingreso('Venta auto', 1500)
];

const egresos = [
  new Egreso('Renta', 900),
  new Egreso('Ropa', 400)
];



let totalIngresos = () => {
  let totalIngresos = 0;
  for (let ingreso of ingresos) {
    totalIngresos += ingreso.valor;
  }
  return totalIngresos;
};


let totalEgresos = () => {
  let totalEgresos = 0;
  for (let egreso of egresos) {
    totalEgresos += egreso.valor;
  }
  return totalEgresos;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

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

  
    console.log(`Presupuesto: ${formatoMoneda(presupuesto)}`);
    console.log(`Porcentaje de Egreso: ${formatoPorcentaje(porcentajeEgreso)}`);
    console.log(`Total Ingresos: ${formatoMoneda(totalIngresos())}`);
    console.log(`Total Egresos: ${formatoMoneda(totalEgresos())}`)
  };
  
  
  cargarCabecero();