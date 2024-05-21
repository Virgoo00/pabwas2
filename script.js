document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2bbd134c-e258-4cc2-8751-72c770dfd744';
    const defaultItemCount = 10; // Default number of items to display
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`;

    const coinContainer = document.getElementById('coin-container');
    const itemCountInput = document.getElementById('item-count');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const posElement = document.getElementById('pos');

    // Fungsi untuk mendapatkan nilai tukar USD ke IDR
    const getExchangeRate = async () => {
        const exchangeRateApiUrl = 'https://open.er-api.com/v6/latest/USD'; // API untuk nilai tukar USD ke IDR
        try {
            const response = await fetch(exchangeRateApiUrl);
            const data = await response.json();
            return data.rates.IDR; // Mengembalikan nilai tukar IDR
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    };

    // Fungsi untuk mengambil data cryptocurrency dan menampilkannya
    const fetchDataAndDisplay = async () => {
        const exchangeRate = await getExchangeRate(); // Dapatkan nilai tukar
        if (!exchangeRate) {
            console.error('Failed to fetch exchange rate.');
            return;
        }

        // Clear existing coins
        coinContainer.innerHTML = '';

        // Fetch data from API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                let coins = data.data.slice(0, itemCountInput.value || defaultItemCount); // Get only required number of items

                // Filter coins based on search input
                const searchText = searchInput.value.trim().toLowerCase();
                if (searchText !== '') {
                    coins = coins.filter(coin => coin.name.toLowerCase().includes(searchText));
                }

                coins.forEach(coin => {
                    const coinPriceInUSD = parseFloat(coin.quote.USD.price).toFixed(2);
                    const coinPriceInIDR = (coin.quote.USD.price * exchangeRate).toFixed(2);

                    // Create elements for coin
                    const coinElement = document.createElement('div');
                    coinElement.classList.add('coin', 'col-md-4', 'mb-4');

                    const coinCard = document.createElement('div');
                    coinCard.classList.add('card', 'h-100');

                    const coinCardBody = document.createElement('div');
                    coinCardBody.classList.add('card-body');

                    const coinInfo = document.createElement('div');
                    coinInfo.classList.add('coin-info');

                    const coinImage = document.createElement('img');
                    coinImage.src = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;
                    coinImage.alt = coin.name;

                    const coinName = document.createElement('h5');
                    coinName.classList.add('card-title');
                    coinName.textContent = coin.name;

                    const coinSymbol = document.createElement('p');
                    coinSymbol.classList.add('card-text', 'text-muted');
                    coinSymbol.textContent = `(${coin.symbol})`;

                    const coinPriceUSD = document.createElement('div');
                    coinPriceUSD.classList.add('coin-price');
                    coinPriceUSD.textContent = `USD: $${coinPriceInUSD}`;

                    const coinPriceIDR = document.createElement('div');
                    coinPriceIDR.classList.add('coin-price');
                    coinPriceIDR.textContent = `IDR: Rp${coinPriceInIDR}`;

                    const coinActions = document.createElement('div');
                    coinActions.classList.add('coin-actions');

                    const addButton = document.createElement('button');
                    addButton.classList.add('btn', 'btn-primary', 'btn-sm', 'add-button');
                    addButton.textContent = 'Add';

                    // Event listener for add button click
                    addButton.addEventListener('click', () => {
                        addToPOS(coin);
                    });

                    const detailButton = document.createElement('button');
                    detailButton.classList.add('btn', 'btn-info', 'btn-sm', 'detail-button');
                    detailButton.textContent = 'Detail';

                    // Event listener for detail button click
                    detailButton.addEventListener('click', () => {
                        showDetail(coin);
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-button');
                    deleteButton.textContent = 'Delete';

                    // Event listener for delete button click
                    deleteButton.addEventListener('click', () => {
                        coinElement.remove(); // Menghapus elemen coin
                    });

                    // Append elements
                    coinInfo.appendChild(coinImage);
                    coinInfo.appendChild(coinName);
                    coinInfo.appendChild(coinSymbol);

                    coinCardBody.appendChild(coinInfo);
                    coinCardBody.appendChild(coinPriceUSD);
                    coinCardBody.appendChild(coinPriceIDR);

                    coinActions.appendChild(addButton);
                    coinActions.appendChild(detailButton);
                    coinActions.appendChild(deleteButton);

                    coinCardBody.appendChild(coinActions);

                    coinCard.appendChild(coinCardBody);
                    coinElement.appendChild(coinCard);

                    coinContainer.appendChild(coinElement);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to add coin to POS
    const addToPOS = (coin) => {
        const posItem = document.createElement('div');
        posItem.classList.add('pos-item');
        posItem.innerHTML = `
            <p>${coin.name} (${coin.symbol}) - $${parseFloat(coin.quote.USD.price).toFixed(2)}</p>
            <button class="btn btn-danger btn-sm delete-pos-item">Delete</button>
        `;
        posElement.appendChild(posItem);
        posElement.style.display = 'block';

        // Update total price
        updateTotalPrice();
    };

    // Function to update total price in POS
    const updateTotalPrice = () => {
        const posItems = document.querySelectorAll('.pos-item');
        let totalPrice = 0;
        posItems.forEach(posItem => {
            const priceString = posItem.querySelector('p').textContent.split('-')[1].trim().slice(1); // Extracting price from text
            totalPrice += parseFloat(priceString);
        });
        const totalElement = document.querySelector('.pos-total');
        if (totalElement) {
            totalElement.textContent = `Total: $${totalPrice.toFixed(2)} (${posItems.length} items)`;
        } else {
            const newTotalElement = document.createElement('div');
            newTotalElement.classList.add('pos-total');
            newTotalElement.textContent = `Total: $${totalPrice.toFixed(2)} (${posItems.length} items)`;
            posElement.appendChild(newTotalElement);
        }
    };

    // Function to show detail and redirect to detail page
    const showDetail = (coin) => {
        // Redirect to detail page with coin symbol as query parameter
        window.location.href = `detail.html?symbol=${coin.symbol.toUpperCase()}`;
    };

    // Fetch and display data initially
    fetchDataAndDisplay();

    // Event listener for item count input change
    itemCountInput.addEventListener('change', fetchDataAndDisplay);

    // Event listener for search button click
    searchButton.addEventListener('click', fetchDataAndDisplay);

    // Event listener for delete POS item button
    posElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-pos-item')) {
            event.target.parentElement.remove();
            if (posElement.childElementCount === 1) { // Check if only the total element remains
                posElement.style.display = 'none';
            }
            updateTotalPrice(); // Update total price after deleting item
        }
    });
});
