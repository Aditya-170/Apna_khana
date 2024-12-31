const searchForm = document.querySelector('.search-bar');
searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.querySelector('.search-input').value;
    try {
        const res = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${name}&key=b01f7527-3c95-4abd-969e-6c0e3456a00f`);
        console.log(res);
        func(res);
    } catch (error) {
        console.error('Error fetching the recipes:', error);
        alert('Unable to fetch recipes. Please try again later.');
    }
});



let currentPage = 1; 
const itemsPerPage = 5; 
let currentRecipes = []; 

const func = (res) => {
    const incContainer = document.querySelector('.inc');
    incContainer.innerHTML = ''; 

    currentRecipes = res.data.data.recipes; 
    currentPage = 1; 
    updateRecipesDisplay();
};

const updateRecipesDisplay = () => {
    const incContainer = document.querySelector('.inc');
    incContainer.innerHTML = ''; 

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesToDisplay = currentRecipes.slice(startIndex, endIndex);

    recipesToDisplay.forEach(recipe => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        const img = document.createElement("img");
        img.src = recipe.image_url;
        img.alt = "Recipe Image";

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("contact-name");
        nameDiv.textContent = recipe.title;

        contactCard.appendChild(img);
        contactCard.appendChild(nameDiv);
        incContainer.appendChild(contactCard);
    });

    updatePaginationControls();
};

const updatePaginationControls = () => {
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const pageInfo = document.querySelector('.page-info');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * itemsPerPage >= currentRecipes.length;
    pageInfo.textContent = `Page ${currentPage}`;
};

document.querySelector('.prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateRecipesDisplay();
    }
});

document.querySelector('.next-page').addEventListener('click', () => {
    if (currentPage * itemsPerPage < currentRecipes.length) {
        currentPage++;
        updateRecipesDisplay();
    }
});

