// Product info page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get product data from URL parameters or localStorage
    loadProductData();
});

// Back button functionality
function goBackToHomepage() {
    window.location.href = 'homepage.html';
}

// Load product data
function loadProductData() {
    // In a real application, you would get this data from URL parameters
    // or fetch from backend API using the barcode
    
    // For demo, we'll use sample data
    // You can change this to show different products
    const sampleProducts = {
        '3948764012273': {
            name: 'Coca Cola',
            id: '3948764012273',
            rating: 'BAD',
            nutrition: {
                'Energy': '44.0 kcal',
                'Total Sugars': '10.6 g',
                'Added Sugars': '10.6 g',
                'Sodium': '8.5 mg',
                'Total Fats': '0.0 g',
                'Carbohydrates': '10.9 g',
                'Protein': '0.0 g'
            }
        },
        '6294003539054': {
            name: 'KitKat',
            id: '6294003539054',
            rating: 'AVERAGE',
            nutrition: {
                'Energy': '509.0 kcal',
                'Total Sugars': '47.0 g',
                'Added Sugars': '38.8 g',
                'Sodium': '60.0 mg',
                'Total Fats': '25.9 g',
                'Carbohydrates': '60.9 g',
                'Protein': '6.7 g'
            }
        },
        '8901262200011': {
            name: 'Amul Masti Curd',
            id: '8901262200011',
            rating: 'GOOD',
            nutrition: {
                'Energy': '91.0 kcal',
                'Total Sugars': '6.4 g',
                'Added Sugars': '0.0 g',
                'Sodium': '70 mg',
                'Total Fats': '4.3 g',
                'Carbohydrates': '6.4 g',
                'Protein': '5.6 g'
            }
        }
    };
    
    // Get barcode from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const barcode = urlParams.get('barcode') || '3948764012273'; // Default to Coca Cola
    
    const productData = sampleProducts[barcode] || sampleProducts['3948764012273'];
    
    // Update the page with product data
    updateProductDisplay(productData);
}

// Update product display
function updateProductDisplay(productData) {
    // Update product name and ID
    document.getElementById('productName').textContent = productData.name;
    document.getElementById('productId').textContent = productData.id;
    
    // Update rating box
    updateRatingBox(productData.rating);
    
    // Update nutrition facts
    updateNutritionFacts(productData.nutrition);
}
// Update rating box based on rating - UPDATED
function updateRatingBox(rating) {
    const ratingBox = document.getElementById('ratingBox');
    const ratingText = document.getElementById('ratingText');
    const ratingDescription = document.getElementById('ratingDescription');
    
    // Remove all rating classes
    ratingBox.className = 'rating-box';
    
    // Add appropriate class and content based on rating
    switch(rating.toLowerCase()) {
        case 'good':
            ratingBox.classList.add('good');
            ratingText.textContent = 'GOOD'; // Uppercase
            ratingDescription.innerHTML = 'Good to go!<br>Enjoy without worry';
            break;
            
        case 'average':
            ratingBox.classList.add('average');
            ratingText.textContent = 'AVERAGE'; // Uppercase
            ratingDescription.innerHTML = 'Okay Sometimes, but not<br>everyday';
            break;
            
        case 'bad':
            ratingBox.classList.add('bad');
            ratingText.textContent = 'BAD'; // Already uppercase
            ratingDescription.innerHTML = 'High in unhealthy ingredients<br>- Avoid regular use';
            break;
            
        case 'worst':
            ratingBox.classList.add('worst');
            ratingText.textContent = 'WORST'; // Uppercase
            ratingDescription.innerHTML = 'Strongly avoid this product';
            break;
            
        default:
            ratingBox.classList.add('bad');
            ratingText.textContent = 'BAD';
            ratingDescription.innerHTML = 'High in unhealthy ingredients<br>- Avoid regular use';
    }
}

// Update nutrition facts
function updateNutritionFacts(nutritionData) {
    const nutritionList = document.getElementById('nutritionList');
    nutritionList.innerHTML = '';
    
    // Create nutrition items
    Object.entries(nutritionData).forEach(([nutrient, value]) => {
        const nutritionItem = document.createElement('div');
        nutritionItem.className = 'nutrition-item';
        
        nutritionItem.innerHTML = `
            <span class="nutrient-name">${nutrient}</span>
            <span class="nutrient-value">${value}</span>
        `;
        
        nutritionList.appendChild(nutritionItem);
    });
}

// Function to simulate API call for product data
async function fetchProductData(barcode) {
    try {
        // In a real application, this would be your API endpoint
        // const response = await fetch(`/api/products/${barcode}`);
        // const productData = await response.json();
        
        console.log('Fetching product data for barcode:', barcode);
        
        // For demo purposes, return sample data
        return {
            success: true,
            data: {
                name: 'Sample Product',
                id: barcode,
                rating: 'AVERAGE',
                nutrition: {
                    'Energy': '100 kcal',
                    'Total Sugars': '5.0 g',
                    'Sodium': '50 mg'
                }
            }
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return { success: false, error: 'Failed to fetch product data' };
    }
}
