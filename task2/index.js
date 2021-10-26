document.addEventListener("DOMContentLoaded", () => {
    const field = document.querySelector('#field');
    const template = document.querySelector('#template-item');

    const fieldWidth = field.offsetWidth;
    const fieldHeight = field.offsetHeight;
    const itemWidth = template.offsetWidth;
    const itemHeight = template.offsetHeight;

    let arrayOfItems = [];

    if (localStorage.getItem('arrayOfItems')) {
        arrayOfItems = JSON.parse(localStorage.getItem('arrayOfItems'));

        arrayOfItems.forEach((el) => {
            // arrayOfItems.push(el);
            paintLoadedItems(el);
        });
    }

    field.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const currentX = window.event.x;
        const currentY = window.event.y;

        addNewItem(currentX, currentY);
    });

    function paintLoadedItems(item) {
        const tempItem = template.cloneNode(true);
        field.appendChild(tempItem);
        tempItem.id = item.id;
        tempItem.classList = 'item';
        tempItem.style.top = `${item.y}px`;
        tempItem.style.left = `${item.x}px`;
        tempItem.querySelector('input').value = item.text || '';

        moveItem(tempItem);
        changeText(tempItem);
        deleteItem(tempItem);
    }

    function addNewItem(x, y) {
        if (x <= fieldWidth - itemWidth && y <= fieldHeight - itemHeight) {
            const tempItem = template.cloneNode(true);
            field.appendChild(tempItem);
            tempItem.id = Date.now();
            tempItem.classList = 'item';
            tempItem.style.top = `${y}px`;
            tempItem.style.left = `${x}px`;

            saveItem(tempItem);
            moveItem(tempItem);
            changeText(tempItem);
            deleteItem(tempItem);
        }
    }

    function saveItem(item) {
        arrayOfItems.push({
            id: item.id,
            x: /\d+/.exec(item.style.left)[0],
            y: /\d+/.exec(item.style.top)[0]
        });

        saveToLocalStorage(arrayOfItems);
    }

    function moveItem(item) {
        item.onmousedown = function(event) {

            if (event.target.className === 'input') {
                let shiftX = event.clientX - item.getBoundingClientRect().left;
                let shiftY = event.clientY - item.getBoundingClientRect().top;

                document.querySelector('#field').append(item);

                moveAt(event.pageX, event.pageY);

                function moveAt(pageX, pageY) {
                    item.style.left = pageX - shiftX + 'px';
                    item.style.top = pageY - shiftY + 'px';

                    arrayOfItems = arrayOfItems.map((el) => {
                        if (el.id === item.id) {
                            el.x = /\d+/.exec(item.style.left)[0];
                            el.y = /\d+/.exec(item.style.top)[0];
                        }

                        return el;
                    });

                    saveToLocalStorage(arrayOfItems);
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                item.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove);

                    if (item.getBoundingClientRect().left + itemWidth > fieldWidth) {
                        item.style.left = `${fieldWidth - itemWidth}px`;
                    }

                    if (item.getBoundingClientRect().top + itemHeight > fieldHeight) {
                        item.style.top = `${fieldHeight - itemHeight}px`;
                    }

                    item.onmouseup = null;
                };
            }
        };

        item.ondragstart = function() {
            return false;
        };
    }

    function changeText(item) {
        item.addEventListener('change', (e) => {
            arrayOfItems = arrayOfItems.map((el) => {
                if (el.id === item.id) {
                    el.text = e.target.value;
                }

                return el;
            });

            saveToLocalStorage(arrayOfItems);
        });
    }

    function deleteItem(item) {
        const deleteButton = item.querySelector('button');

        deleteButton.addEventListener('click', function () {
            item.remove();

            arrayOfItems = arrayOfItems.filter((el) => {
                return el.id !== item.id;
            });

            saveToLocalStorage(arrayOfItems);
        });
    }

    function saveToLocalStorage(arrayOfItems) {
        localStorage.setItem('arrayOfItems', JSON.stringify(arrayOfItems));
    }
});
