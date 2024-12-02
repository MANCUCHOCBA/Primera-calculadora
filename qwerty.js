let lastResult = null; // Variable para almacenar el resultado de la última operación
const maxDigits = 15; // Límite de dígitos en la pantalla
let lastOperator = null; // Variable para almacenar el último operador presionado

// Event listener para el evento "keydown" en el documento HTML
document.addEventListener("keydown", (event) => {
    // Obtener el carácter correspondiente a la tecla presionada
    const keyPressed = event.key;

    // Verificar si la tecla presionada es un número, operador, o la tecla "Enter"
    const isNumber = /^[0-9]$/.test(keyPressed);
    const isOperator = /^[\+\-\*\/]$/.test(keyPressed);
    const isEnterKey = keyPressed === "Enter";
    const isEscapeKey = keyPressed === "Escape"; // Tecla "Escape"

    // Borrar la pantalla si se presiona "Escape" (igual a la función "C")
    if (isEscapeKey) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del navegador
        pantalla.textContent = "0";
        lastOperator = null; // Reiniciar el último operador
        lastResult = null; // Reiniciar el resultado anterior
        return; // Salir de la función
    }

    // Si es un número y la longitud de la pantalla es menor que el límite, actualizar la pantalla
    if (isNumber && pantalla.textContent.length < maxDigits) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del navegador
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = keyPressed;
        } else {
            pantalla.textContent += keyPressed;
        }
        lastOperator = null; // Reiniciar el último operador
    }

    // Si se presiona un operador, reemplazar el anterior en lugar de agregarlo a la cola
    if (isOperator) {
        event.preventDefault();
        if (lastOperator !== null) {
            pantalla.textContent = pantalla.textContent.slice(0, -1); // Eliminar el operador anterior
        }
        pantalla.textContent += keyPressed;
        lastOperator = keyPressed;
    }

    // Si se presiona la tecla "Enter" y hay un resultado anterior, sumar el resultado al resultado anterior
    if (isEnterKey && lastResult !== null) {
        event.preventDefault();
        try {
            const currentResult = eval(pantalla.textContent); // Evaluar la expresión actual
            lastResult += currentResult; // Sumar el resultado actual al resultado anterior
            const formattedResult = lastResult.toString().slice(0, maxDigits); // Limitar el resultado a 15 dígitos
            pantalla.textContent = formattedResult;
        } catch {
            pantalla.textContent = "Error!";
        }
    }

    // Si se presiona la tecla "Enter" y no hay un resultado anterior, evaluar la expresión y guardar el resultado
    if (isEnterKey && lastResult === null) {
        event.preventDefault();
        try {
            lastResult = eval(pantalla.textContent); // Guardar el resultado de la operación
            const formattedResult = lastResult.toString().slice(0, maxDigits); // Limitar el resultado a 15 dígitos
            pantalla.textContent = formattedResult;
        } catch {
            pantalla.textContent = "Error!";
        }
    }

    // Si se presiona la tecla "Backspace", borrar el último carácter
    if (keyPressed === "Backspace") {
        event.preventDefault();
        if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
            pantalla.textContent = "0";
        } else {
            pantalla.textContent = pantalla.textContent.slice(0, -1);
        }
        lastOperator = null; // Reiniciar el último operador
    }
});
