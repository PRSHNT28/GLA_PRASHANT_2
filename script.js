document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById('products');
    const sortSelect = document.getElementById('sort');
    const categorySelect = document.getElementById('category');

    // Fetch data from API
    function fetchData() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => renderProducts(data));
    }

    // Render products
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        const sortedProducts = sortProducts(products);
        sortedProducts.forEach(product => {
            if (!categorySelect.value || product.category === categorySelect.value) {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                `;
                productsContainer.appendChild(productDiv);
            }
        });
    }

    // Sort products
    function sortProducts(products) {
        const sortBy = sortSelect.value === 'asc' ? 1 : -1;
        return products.sort((a, b) => sortBy * (a.price - b.price));
    }

    // Event listeners
    sortSelect.addEventListener('change', fetchData);
    categorySelect.addEventListener('change', fetchData);

    // Initial load
    fetchData();
});
