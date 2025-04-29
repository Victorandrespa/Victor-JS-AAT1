
// Pagina Lista de Empleados --------------------

// Agregar Empleado
let nombre, fecha, puesto, salario;
let bonificacion, comisiones;
let ahorro, iggs, prestamos;

let tablaBody = document.getElementById("tablaDinamica");

document.addEventListener('DOMContentLoaded', function () {
    let btnGuardarInfo = document.getElementById("btn-calcularSueldo");

    if (btnGuardarInfo) {
        btnGuardarInfo.addEventListener("click", function () {

            nombre = document.getElementById("inputNombre").value.trim();
            fecha = document.getElementById("inputFecha").value;
            puesto = document.getElementById("inputPuesto").value.trim();
            salario = document.getElementById("inputSalario").value.trim();

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

    let btnEliminarFila = document.getElementById("btn-eliminaPrimera");
    btnEliminarFila.addEventListener("click", function () {
        if (tablaBody.firstChild) {
            tablaBody.removeChild(tablaBody.firstChild);
        } else {
            alert('No hay registros para eliminar.');
        }
    });

    // Función para eliminar último registro

    let btnUltimaFila = document.getElementById("btn-eliminaUltima");
    btnUltimaFila.addEventListener("click", function () {
        if (tablaBody.lastChild) {
            tablaBody.removeChild(tablaBody.lastChild);
        } else {
            alert('No hay registros para eliminar.');
        }
    });
});


// Calculo Sueldo liquido --------------------

// Funcion para realizar calculos 

document.addEventListener('DOMContentLoaded', function () {

    // Obtener Boton 

    btnCalcular = document.getElementById("btn-calcularSueldo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {
            let salario = parseFloat(document.getElementById("inputSalarioBase").value) || 0;
            let bonificacion = parseFloat(document.getElementById("inputBonificacion").value) || 0;
            let comisiones = parseFloat(document.getElementById("inputComisiones").value) || 0;

            let ahorro = parseFloat(document.getElementById("inputAhorro").value) || 0;
            let iggs = parseFloat(document.getElementById("inputIGSS").value) || 0;
            let prestamos = parseFloat(document.getElementById("inputPrestamos").value) || 0;
            //alert(salario + bonificacion + comisiones + ahorro + iggs + prestamos);

            // Calculo de totales
            let resultadoGanado = salario + bonificacion + comisiones;
            let resultadoDeducciones = ahorro + iggs + prestamos;
            let salarioLiquido = resultadoGanado - resultadoDeducciones;
            //alert(resultadoGanado + resultadoDeducciones + salarioLiquido);

            // Formato de salida
            let totalGanado = `
                <div class="fila mt-4">
                    <span>Salario:</span> <span>Q${salario.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>Bonificación:</span> <span>Q${bonificacion.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>Comisiones:</span> <span>Q${comisiones.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <strong>Total Ganado:</strong> <strong>Q${resultadoGanado.toFixed(2)}</strong>
                </div>
                <br>
            `;
            let totalDeducciones = `
                <div class="fila mt-4">
                    <span>Ahorro:</span> <span>Q${ahorro.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>IGSS:</span> <span>Q${iggs.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>Préstamos:</span> <span>Q${prestamos.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <strong>Total Deducciones:</strong> <strong>Q${resultadoDeducciones.toFixed(2)}</strong>
                </div>
                <br>
            `;
            let totalLiquido = `
                <div class="fila mt-2">
                    <strong>Salario Líquido:</strong> <br> Q${salarioLiquido.toFixed(2)}
                </div>
            `;

            // Agregar valores a tabla
            document.getElementById("outputTotalGanado").innerHTML = totalGanado;
            document.getElementById("outputTotalDescuento").innerHTML = totalDeducciones;
            document.getElementById("outputSueldoLiquido").innerHTML = totalLiquido;
        });
    }
});


// Calculo Idenmizacion --------------------

// Funcion para realizar calculos 

document.addEventListener('DOMContentLoaded', function () {

    // Obtener Boton

    btnCalcular = document.getElementById("btn-calcularTotal");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {

            // Obtener valores
            let salario = parseFloat(document.getElementById("inputSalarioBaseI").value) || 0;
            let años = parseFloat(document.getElementById("inputAñostrabajados").value) || 0;
            let salarioPendiente = parseFloat(document.getElementById("inputSalarioPendiente").value) || 0;
            let deudas = parseFloat(document.getElementById("inputDeudas").value) || 0;
            //alert(salario + "funciona");

            // Calculo de totales
            let mesesTrabajados = (años * 12);
            let bono = (salario / mesesTrabajados) || 0;
            let aguinaldo = (salario / mesesTrabajados) || 0;
            let sueldoByA = (salario * años);
            let Idenmizacion = ((salario * años) + (bono + aguinaldo + salarioPendiente - deudas)) || 0;
            //alert(mesesTrabajados + bono);

            let totalIndemnizado = `
                <div class="fila mt-4">
                    <span>Sueldo base * Años trabajados:</span> <span>Q${sueldoByA.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>Bono 14 Proporcional:</span> <span>Q${bono.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <span>Aguinaldo Proporcional:</span> <span>Q${aguinaldo.toFixed(2)}</span>
                </div>
                <div class="fila">
                    <strong>Salario Pendiente:</strong> <strong>Q${salarioPendiente.toFixed(2)}</strong>
                </div>
                 <div class="fila">
                    <strong>Deudas:</strong> <strong> - Q${deudas.toFixed(2)}</strong>
                </div>
                 <div class="fila">
                    <strong>Total Idenmizacion:</strong> <strong>Q${Idenmizacion.toFixed(2)}</strong>
                </div>
                <br>
            `;

            document.getElementById("outputIndemnizacion").innerHTML = totalIndemnizado;
        });
    }
});