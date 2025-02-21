let ingresos = [Quincena= 9000,
    Venta= 400];
let egresos = [Renta=900,
    Ropa=400];



const totalIngresos = () => {
  let totalIngresos = 0;
  for (let ingreso of ingresos) {
    totalIngresos += ingreso;
  }
  return totalIngresos;
};


const totalEgresos = () => {
  let totalEgresos = 0;
  for (let egreso of egresos) {
    totalEgresos += egreso;
  }
  return totalEgresos;
};



const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', {
      style: 'percent',
      minimumFractionDigits: 2
    });
};

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
  
    console.log(`Presupuesto: ${formatoMoneda(presupuesto)}`);
    console.log(`Porcentaje de Egreso: ${formatoPorcentaje(porcentajeEgreso)}`);
    console.log(`Total Ingresos: ${formatoMoneda(totalIngresos())}`);
    console.log(`Total Egresos: ${formatoMoneda(totalEgresos())}`)
  };
  
  
  cargarCabecero();


  