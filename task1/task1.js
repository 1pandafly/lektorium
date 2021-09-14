console.log(someFunction(6, 6, 2, 2, 'right'));

function someFunction(columns, rows, startColumn, startRow, direction) {
    const numberOfElements = columns * rows;
    const mainArray = [];
    let result = [];
    let currentItem = 1;
    let dir = direction;
    let stepLength = 1;
    let turnStep = 0;
    let i = 0;
    let currentRow = startRow - 1;
    let currentColumn = startColumn - 1;

    for (let i = 0; i < rows; i++) {
        mainArray.push([]);

        for (let j = 0; j < columns; j++) {
            mainArray[i].push(currentItem);
            currentItem++;
        }
    }

    while (result.length < numberOfElements) {
        i = 0;

        do {
            if (currentRow >= 0 && currentRow < rows && currentColumn >= 0 && currentColumn < columns) {
                result.push(mainArray[currentRow][currentColumn]);
            }

            switch (dir) {
                case 'top':
                    currentRow--;
                    break;
                case 'right':
                    currentColumn++;
                    break;
                case 'bottom':
                    currentRow++;
                    break;
                case 'left':
                    currentColumn--;
                    break;
            }

            i++;
        } while (i < stepLength - 1);

        turnStep++;

        switch (dir) {
            case 'top':
                dir = 'right';
                break;
            case 'right':
                dir = 'bottom';
                break;
            case 'bottom':
                dir = 'left';
                break;
            case 'left':
                dir = 'top';
                break;
        }

        if (turnStep === 2) {
            if (stepLength === 1) {
                stepLength += 2;
            } else {
                stepLength++;
            }

            turnStep = 0;
        }
    }

    return result;
}
