const es_bisiesto = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

const day_of_year = (year, month, day) => {
    const daysInMonth = [31, es_bisiesto(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month - 1; i++) {
        day += daysInMonth[i];
    }
    return day;
}

function gregorianToArvelie(year, month, day) {
    const doy = day_of_year(year, month, day);
    const arv_year = year - 2006; // Año cero (mi nacimiento jeje)

    if (es_bisiesto(year) && doy === 366) {
        return `${arv_year}+01`;
    }

    if (doy === 365) {
        return `${arv_year}+00`;
    }

    const arv_month = Math.floor((doy - 1) / 14);
    const arv_day = ((doy - 1) % 14) + 1;

    const month_letter = String.fromCharCode(65 + arv_month);

    return `${arv_year}${month_letter}${String(arv_day).padStart(2, "0")}`;
}

function convertirFecha() {
    const fechaInput = document.getElementById('fecha').value;
    const fecha = new Date(fechaInput);

    if (isNaN(fecha)) {
        document.getElementById('fechaConvertida').textContent = "Introduzca una fecha"
        return;
    }

    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();

    const fechaArvelie = gregorianToArvelie(year, month, day);
    document.getElementById('fechaConvertida').textContent = fechaArvelie;
}
