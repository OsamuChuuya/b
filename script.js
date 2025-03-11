const countriesContainer = document.getElementById('countries-container')
const searchInput = document.getElementById('search')
const filterSelect = document.getElementById('filter')
let countries = []; // Глобальная переменная для хранения стран


async function fetchCountries() {
    try{
        const response = await fetch("https://restcountries.com/v3.1/all")
        countries = await response.json()
        console.log(countries)
        displayCountries(countries)
    }catch (error){
        console.error("Error", error)
    }
}



function displayCountries(countries){
    countriesContainer.innerHTML=``
    countries.forEach(country => {
        const card = document.createElement('div')
        card.classList.add('country-card')
        card.innerHTML=`
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        
        `;
        countriesContainer.appendChild(card)
    });
}

fetchCountries()

function search(){
    const inputValue= searchInput.value.trim().toLowerCase()
    const filtered = countries.filter(country=>{
        const n = country.name.common.trim().toLowerCase()
        return n.includes(inputValue)
    })
    if(filtered.length > 0){
        displayCountries(filtered)
    }else{
        countriesContainer.innerHTML=`<p>Ниче не найдено</p>`
    }
}

searchInput.addEventListener('input', search)

function filterBy(){
   const select = filterSelect.value.toLowerCase()
   if (select === "all" || select === "") {
    filteredCountries = countries; // Показываем все страны
} else {
    // Фильтруем страны по региону
    filteredCountries = countries.filter(country => {
        return country.region && country.region.toLowerCase() === select;
    });
}

displayCountries(filteredCountries); 
}
filterSelect.addEventListener('input', filterBy)