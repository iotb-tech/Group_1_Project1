const inputFood = document.getElementById('input-food');
const submitFood = document.getElementById('submit-food');
const errorMessage = document.getElementById('error-message');
const resultDisplay = document.getElementById('result');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

// Holds all fetched meals and tracks which one we're on
let allMeals = [];
let currentIndex = 0;



// RENDER — displays one meal at currentIndex
function renderSingleMeal() {
    resultDisplay.innerHTML = '';

    // Guard: if no meals, hide pagination and stop
    if (allMeals.length === 0) {
        hidePagination();
        return;
    }

    const food = allMeals[currentIndex];

    const foodContainer = document.createElement('div');
    foodContainer.classList.add('food-result');

    // — Image (max 300px wide) —
    const mealImg = document.createElement('img');
    mealImg.src = food.strMealThumb;
    mealImg.alt = food.strMeal;
    mealImg.style.width = '100%';
    mealImg.style.maxWidth = '300px'; //image never wider than 300px

    // — Meal Name —
    const mealName = document.createElement('h3');
    mealName.textContent = `Meal Name: ${food.strMeal}`;

    // — Meal Country
    const mealCountry = document.createElement('h4');
    mealCountry.textContent = `Meal Country: ${food.strCountry}`;

    // — Instructions with Read More / Show Less toggle —
    const instructionEl = document.createElement('p');
    const fullText = `Instruction: ${food.strInstructions}`  || '';
    const words = fullText.split(' ');
    const WORD_LIMIT = 150;

    if (words.length > WORD_LIMIT) {
        // Text is long — show trimmed version first
        const shortText = words.slice(0, WORD_LIMIT).join(' ') + '...';

        instructionEl.textContent = shortText;

        // Create the toggle link
        const toggleLink = document.createElement('a');
        toggleLink.href = '#';
        toggleLink.textContent = ' Read more';
        toggleLink.style.color = 'blue';

        let isExpanded = false;

        toggleLink.addEventListener('click', (e) => {
            e.preventDefault(); // stop page jumping to top

            if (!isExpanded) {
                // Show full text
                instructionEl.textContent = fullText + ' ';
                toggleLink.textContent = 'Show less';
                isExpanded = true;
            } else {
                // Collapse back
                instructionEl.textContent = shortText;
                toggleLink.textContent = ' Read more';
                isExpanded = false;
            }

            // Re-attach link after textContent wipes it
            instructionEl.appendChild(toggleLink);
        });

        instructionEl.appendChild(toggleLink);
    } else {
        // Short enough — show everything
        instructionEl.textContent = fullText;
    }

    // — Source Link —
    const mealLink = document.createElement('a');
    mealLink.href = food.strSource || '#';
    mealLink.textContent = 'View Full Recipe';
    mealLink.target = '_blank';

    // — Assemble —
    foodContainer.appendChild(mealImg);
    foodContainer.appendChild(mealName);
    foodContainer.appendChild(mealCountry);
    foodContainer.appendChild(instructionEl);
    foodContainer.appendChild(mealLink);
    resultDisplay.appendChild(foodContainer);

    // Update pagination controls
    updatePagination();
}

// PAGINATION HELPERS

function updatePagination() {
    const total = allMeals.length;

    // Show pagination only when there's more than 1 result
    if (total > 1) {
        showPagination();
    } else {
        hidePagination(); // 1 result = no need for Prev/Next
    }

    // Update the page counter text
    pageInfo.textContent = `${currentIndex + 1} of ${total}`;

    // Disable Prev on first item, Next on last item
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === total - 1;
}

function showPagination() {
    pagination.style.display = 'block'; // ✅ reveal pagination
}

function hidePagination() {
    pagination.style.display = 'none'; // ✅ hide pagination
}

// STATUS / ERROR MESSAGE
function setStatus(message) {
    errorMessage.textContent = message;
}

// FETCH
async function fetchFoodData(searchTerm) {
    setStatus('...Loading');
    resultDisplay.innerHTML = '';
    hidePagination(); // hide while loading

    try {
        const response = await fetch(`${API_URL}?s=${encodeURIComponent(searchTerm)}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.meals) {
            allMeals = data.meals;   // store all meals
            currentIndex = 0;        // always start from first result
            setStatus('');
            renderSingleMeal();      // render first meal + show pagination
        } else {
            allMeals = [];
            resultDisplay.innerHTML = '';
            hidePagination();
            setStatus('No results found. Try a different food!');
        }

    } catch (error) {
        allMeals = [];
        hidePagination();
        setStatus('Something went wrong. Please try again later.');
    }
}

// PAGINATION BUTTON EVENTS

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1;       // go back one meal
        renderSingleMeal();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < allMeals.length - 1) {
        currentIndex += 1;       // go forward one meal
        renderSingleMeal();
    }
});

// DEBOUNCE
// Waits until user stops typing for 500ms before firing
function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId); // cancel the previous countdown
        timerId = setTimeout(() => fn.apply(this, args), delay); // restart it
    };
}

const debounceSearch = debounce((term) => {
    if (term.length === 0) {
        // User cleared the input — reset everything
        allMeals = [];
        currentIndex = 0;
        resultDisplay.innerHTML = '';
        hidePagination();
        setStatus('');
        return;
    }
    fetchFoodData(term);
}, 500);



// EVENT LISTENERS

// Live search while typing
inputFood.addEventListener('input', (event) => {
    const term = event.target.value.trim();
    debounceSearch(term);
});

// Manual search on button click
submitFood.addEventListener('click', (event) => {
    event.preventDefault();
    const term = inputFood.value.trim();
    if (term.length > 0) {
        fetchFoodData(term);
    }
});