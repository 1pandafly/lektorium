document.addEventListener("DOMContentLoaded", () => {
    const field = document.getElementById('field');
    const formField = document.getElementById('form-field');
    const formStart = document.getElementById('start');
    const startRowInput = document.getElementById('start-row');
    const startColumnInput = document.getElementById('start-column');
    const formFinish = document.getElementById('finish');
    const finishRowInput = document.getElementById('finish-row');
    const finishColumnInput = document.getElementById('finish-column');
    const numberRows = document.getElementById('rows');
    const numberColumns = document.getElementById('columns');
    const goButton = document.getElementById('go');

    let rows;
    let columns;
    let currentPositions = [];
    let tempPositions = [];
    let fieldMatrix = [];
    let startRow;
    let startColumn;
    let finishRow;
    let finishColumn;

    formField.addEventListener('submit', (e) => {
        e.preventDefault();

        rows = numberRows.value;
        columns = numberColumns.value;

        createField(field, rows, columns, fieldMatrix);

        formStart.style.display = 'flex';
        formFinish.style.display = 'flex';

        if (rows && columns) {
            formStart.style.display = 'flex';
            formFinish.style.display = 'flex';

            startRowInput.setAttribute('max', rows);
            startColumnInput.setAttribute('max', columns);
            finishRowInput.setAttribute('max', rows);
            finishColumnInput.setAttribute('max', columns);

            createField(field, rows, columns, fieldMatrix);
        }
    });

    formStart.addEventListener('submit', (e) => {
        e.preventDefault();

        startRow = startRowInput.value - 1;
        startColumn = startColumnInput.value - 1;

        if (fieldMatrix[startRow][startColumn] === 1) {
            formStart.insertAdjacentHTML('beforeend', '<p class="red-text">Set another values</p>');
            formStart.reset();
        } else {
            formStart.reset();
            formStart.style.visibility = 'hidden';
            field.querySelector(`tr:nth-child(${startRow + 1}) td:nth-child(${startColumn + 1})`).style.background = 'green';

            if (finishRow >= 0 && finishColumn >= 0) {
                console.log(2)
                goButton.style.visibility = 'visible';
            }
        }
    });

    formFinish.addEventListener('submit', (e) => {
        e.preventDefault();

        finishRow = finishRowInput.value - 1;
        finishColumn = finishColumnInput.value - 1;

        if (fieldMatrix[finishRow][finishColumn] === 1) {
            formFinish.insertAdjacentHTML('beforeend', '<p class="red-text">Set another values</p>');
            formFinish.reset();
        } else {
            formFinish.reset();
            formFinish.style.visibility = 'hidden';
            field.querySelector(`tr:nth-child(${finishRow + 1}) td:nth-child(${finishColumn + 1})`).style.background = 'blue';

            if (startRow >= 0 && startColumn >= 0) {
                goButton.style.visibility = 'visible';
            }
        }
    });

    let finish = false;

    document.getElementById('go').addEventListener('click', () => {
        tempPositions = [{x: startRow, y: startColumn}];

        do {
            currentPositions = tempPositions;
            tempPositions = [];

            currentPositions.forEach(el => {
                if (el.x > 0) {
                    if (el.x - 1 === finishRow && el.y === finishColumn) {
                        fieldMatrix[el.x - 1][el.y] = el;
                        finish = true;
                    } else if ((el.x - 1 !== finishRow || el.y !== finishColumn) && (el.x - 1 !== startRow || el.y !== startColumn) && fieldMatrix[el.x - 1][el.y] === 0) {
                        tempPositions.push({x: el.x - 1, y: el.y});
                        fieldMatrix[el.x - 1][el.y] = el;
                    }
                }

                if (el.y < columns - 1) {
                    if (el.x === finishRow && el.y + 1 === finishColumn) {
                        fieldMatrix[el.x][el.y + 1] = el;
                        finish = true;
                    } else if ((el.x !== finishRow || el.y + 1 !== finishColumn) && (el.x !== startRow || el.y + 1 !== startColumn) && fieldMatrix[el.x][el.y + 1] === 0) {
                        tempPositions.push({x: el.x, y: el.y + 1});
                        fieldMatrix[el.x][el.y + 1] = el;
                    }
                }

                if (el.x < columns - 1) {
                    if (el.x + 1 === finishRow && el.y === finishColumn) {
                        fieldMatrix[el.x + 1][el.y] = el;
                        finish = true;
                    } else if ((el.x + 1 !== finishRow || el.y !== finishColumn) && (el.x + 1 !== startRow || el.y !== startColumn) && fieldMatrix[el.x + 1][el.y] === 0) {
                        tempPositions.push({x: el.x + 1, y: el.y});
                        fieldMatrix[el.x + 1][el.y] = el;
                    }
                }

                if (el.y > 0) {
                    if (el.x === finishRow && el.y - 1 === finishColumn) {
                        fieldMatrix[el.x][el.y - 1] = el;
                        finish = true;
                    } else if ((el.x !== finishRow || el.y - 1 !== finishColumn) && (el.x !== startRow || el.y - 1 !== startColumn) && fieldMatrix[el.x][el.y - 1] === 0) {
                        tempPositions.push({x: el.x, y: el.y - 1});
                        fieldMatrix[el.x][el.y - 1] = el;
                    }
                }
            });
        } while (tempPositions.length !== 0 && !finish)

        if (finish) {
            field.insertAdjacentHTML('beforeend', '<h3 style="color:green;">Way is possible!</h3>');

            let wayX = fieldMatrix[finishRow][finishColumn].x;
            let wayY = fieldMatrix[finishRow][finishColumn].y;
            let tempX;
            let tempY;

            field.querySelector(`tr:nth-child(${wayX + 1}) td:nth-child(${wayY + 1})`).style.background = 'yellow';

            do {
                tempX = fieldMatrix[wayX][wayY].x;
                tempY = fieldMatrix[wayX][wayY].y;

                wayX = tempX;
                wayY = tempY;

                field.querySelector(`tr:nth-child(${wayX + 1}) td:nth-child(${wayY + 1})`).style.background = 'yellow';

            } while (wayX !== startRow && wayY !== startColumn)
        } else {
            field.insertAdjacentHTML('beforeend', '<h3 style="color:red;">Way is impossible!</h3>');
        }
    });

    const createField = (field, rows, columns, fieldMatrix) => {
        let html = '<table class="field-table">';

        for (let i = 0; i < rows; i++) {
            html += '<tr>';

            fieldMatrix[i] = [];

            for (let j = 0; j < columns; j++) {
                let currentElement = Math.round(Math.random());

                fieldMatrix[i].push(currentElement);

                html += `<td>${currentElement}</td>`;
            }

            html += '</tr>';
        }

        html += '</table>';


        field.innerHTML = '';
        field.insertAdjacentHTML('afterbegin', html);
    }
});
