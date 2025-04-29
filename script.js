
// Declarar Variables

let nombre, fecha, puesto, salario;
let bonificacion, comisiones;
let ahorro, iggs, prestamos;


// Pagina Lista de Empleados --------------------

document.addEventListener('DOMContentLoaded', function () {

    let btnGuardarInfo = document.getElementById("btn-guardarInfo");
    let tablaBody = document.getElementById("tablaDinamica");

    if (btnGuardarInfo) {
        btnGuardarInfo.addEventListener("click", function () {
            nombre = document.getElementById("inputNombre").value.trim();
            fecha = document.getElementById("inputFecha").value;
            puesto = document.getElementById("inputPuesto").value.trim();
            salario = parseFloat(document.getElementById("inputSalario").value);
            //alert(nombre);

            let salarioFormateado = Number(salario).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ'
            });

            // analizar valores y agregar a tabla

            if (nombre && fecha && puesto && salario) {
                let newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${nombre}</td>
                    <td>${fecha}</td>
                    <td>${puesto}</td>
                    <td>${salarioFormateado}</td>
                    `;

                tablaBody.appendChild(newRow);

                // Limpiar campos
                document.getElementById("inputNombre").value = '';
                document.getElementById("inputFecha").value = '';
                document.getElementById("inputPuesto").value = '';
                document.getElementById("inputSalario").value = '';
            } else {
                alert("Por favor completa todos los campos correctamente.");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // Función para eliminar primer registro
    let btnPrimeraFila = document.getElementById("btn-eliminaPrimera");
    let btnUltimaFila = document.getElementById("btn-eliminaUltima");
    let tablaBody = document.getElementById("tablaDinamica");

    if (btnPrimeraFila) {
        btnPrimeraFila.addEventListener("click", function () {
            if (tablaBody.firstElementChild) {
                tablaBody.removeChild(tablaBody.firstElementChild);
            } else {
                alert('No hay registros para eliminar.');
            }
        });
    }

    // Función para eliminar último registro
    if (btnUltimaFila) {
        btnUltimaFila.addEventListener("click", function () {
            if (tablaBody.lastChild) {
                tablaBody.removeChild(tablaBody.lastChild);
            } else {
                alert('No hay registros para eliminar.');
            }
        });
    }

});



// Calculo Sueldo liquido --------------------

document.addEventListener('DOMContentLoaded', function () {

    function formatearGTQ(numero) {
        return Number(numero).toLocaleString('es-GT', {
            style: 'currency',
            currency: 'GTQ',
            minimumFractionDigits: 2
        });
    }


    // Obtener Boton 

    btnCalcular = document.getElementById("btn-calcularSueldo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {
            let salario = parseFloat(document.getElementById("inputSalarioBase").value) || 0;
            let bonificacion = parseFloat(document.getElementById("inputBonificacion").value) || 0;
            let comisiones = parseFloat(document.getElementById("inputComisiones").value) || 0;
            let ahorro = parseFloat(document.getElementById("inputAhorro").value) || 0;
            let prestamos = parseFloat(document.getElementById("inputPrestamos").value) || 0;
            //alert(salario + bonificacion + comisiones + ahorro + prestamos);

            // Calculo de totales
            let iggs = (salario * 0.0483);
            let resultadoGanado = salario + bonificacion + comisiones;
            let resultadoDeducciones = ahorro + iggs + prestamos;
            let salarioLiquido = resultadoGanado - resultadoDeducciones;

            //alert(resultadoGanado + resultadoDeducciones + salarioLiquido);

            // Formato de salida
            let totalGanado = `
                <div class="fila mt-4">
                    <span>Salario:</span> <span>${formatearGTQ(salario)}</span>
                </div>
                <div class="fila">
                    <span>Bonificación:</span> <span>${formatearGTQ(bonificacion)}</span>
                </div>
                <div class="fila">
                    <span>Comisiones:</span> <span>${formatearGTQ(comisiones)}</span>
                </div>
                <div class="fila">
                    <strong>Total Ganado:</strong> <strong>${formatearGTQ(resultadoGanado)}</strong>
                </div>
                <br>
            `;
            let totalDeducciones = `
                <div class="fila mt-4">
                    <span>Ahorro:</span> <span>- ${formatearGTQ(ahorro)}</span>
                </div>
                <div class="fila">
                    <span>IGSS (4.83%):</span> <span>- ${formatearGTQ(iggs)}</span>
                </div>
                <div class="fila">
                    <span>Préstamos:</span> <span>- ${formatearGTQ(prestamos)}</span>
                </div>
                <div class="fila">
                    <strong>Total Deducciones:</strong> <strong>- ${formatearGTQ(resultadoDeducciones)}</strong>
                </div>
                <br>
            `;
            let totalLiquido = `
                <div class="fila">
                    <span>Total Ganado:</span> <span>${formatearGTQ(resultadoGanado)}</span>
                </div>
                <div class="fila">
                    <span>Total Deducciones:</span> <span>- ${formatearGTQ(resultadoDeducciones)}</span>
                </div>
                <div class="fila mt-2">
                    <strong>Salario Líquido:</strong> <strong>${formatearGTQ(salarioLiquido)}</strong>
                </div>
            `;

            // Agregar valores a tabla
            document.getElementById("outputIggs").textContent = iggs;
            document.getElementById("outputTotalGanado").innerHTML = totalGanado;
            document.getElementById("outputTotalDescuento").innerHTML = totalDeducciones;
            document.getElementById("outputSueldoLiquido").innerHTML = totalLiquido;
        });
    }
});



// Calculo Idenmizacion --------------------

document.addEventListener('DOMContentLoaded', function () {

    function formatearGTQ(numero) {
        return Number(numero).toLocaleString('es-GT', {
            style: 'currency',
            currency: 'GTQ',
            minimumFractionDigits: 2
        });
    }

    function mesesDesdeUltimoJulio() {
        let hoy = new Date();
        let añoActual = hoy.getFullYear();
    
        // Definir el 1 de julio más reciente
        let ultimoJulio = new Date(`${añoActual}-07-01`);
        if (hoy < ultimoJulio) {
            ultimoJulio = new Date(`${añoActual - 1}-07-01`);
        }
    
        let años = hoy.getFullYear() - ultimoJulio.getFullYear();
        let meses = hoy.getMonth() - ultimoJulio.getMonth();
        let dias = hoy.getDate() - ultimoJulio.getDate();
    
        let totalMeses = (años * 12) + meses;
    
        return Number(totalMeses.toFixed(2));
    }

    function mesesDesdeUltimoDiciembre() {
        let hoy = new Date();
        let añoActual = hoy.getFullYear();
    
        // Obtener el 1 de diciembre más reciente
        let ultimoDiciembre = new Date(`${añoActual}-12-01`);
        if (hoy < ultimoDiciembre) {
            ultimoDiciembre = new Date(`${añoActual - 1}-12-01`);
        }
    
        let años = hoy.getFullYear() - ultimoDiciembre.getFullYear();
        let meses = hoy.getMonth() - ultimoDiciembre.getMonth();
        let dias = hoy.getDate() - ultimoDiciembre.getDate();
    
        let totalMeses = (años * 12) + meses;
    
        return Number(totalMeses.toFixed(2));
    }
    
    
    // Obtener Boton

    btnCalcular = document.getElementById("btn-calcularTotal");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {

            // Obtener valores
            let salario = parseFloat(document.getElementById("inputSalarioBaseI").value) || 0;
            let añosT = parseFloat(document.getElementById("inputAñostrabajados").value) || 0;
            let salarioPendiente = parseFloat(document.getElementById("inputSalarioPendiente").value) || 0;
            let deudas = parseFloat(document.getElementById("inputDeudas").value) || 0;
            //alert(salario + "funciona");

            // Calculo de totales
            let salarioByA = (salario * añosT);
            let bono = (salario / 12) * (mesesDesdeUltimoJulio()) || 0;
            let aguinaldo = (salario / 12) * (mesesDesdeUltimoDiciembre()) || 0;
            let Idenmizacion = ((salario * añosT) + (bono + aguinaldo + salarioPendiente - deudas)) || 0;
            //alert(mesesTrabajados + bono);

            let totalIndemnizado = `
                <div class="fila mt-4">
                    <span>Sueldo base * Años trabajados:</span> <span>${formatearGTQ(salarioByA)}</span>
                </div>
                <div class="fila">
                    <span>Bono 14 Proporcional (hasta hoy):</span> <span>${formatearGTQ(bono)}</span>
                </div>
                <div class="fila">
                    <span>Aguinaldo Proporcional (hasta hoy):</span> <span>${formatearGTQ(aguinaldo)}</span>
                </div>
                <div class="fila">
                    <span>Salario Pendiente:</span> <span>${formatearGTQ(salarioPendiente)}</span>
                </div>
                 <div class="fila">
                    <span>Deudas:</span> <span>- ${formatearGTQ(deudas)}</span>
                </div>
                 <div class="fila">
                    <strong>Total Idenmizacion:</strong> <strong>${formatearGTQ(Idenmizacion)}</strong>
                </div>
                <br>
            `;

            document.getElementById("outputIndemnizacion").innerHTML = totalIndemnizado;
        });
    }
});