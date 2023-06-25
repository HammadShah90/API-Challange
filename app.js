// ===========Current Country===========>>>>>>

const currentCountryFlag = document.querySelector(".currentCountryFlag")
// console.log(currentCountryFlag);
const currentCountry = document.querySelector(".currentCountry")
// console.log(currentCountry);
const currentRegion = document.querySelector(".currentRegion")
// console.log(currentRegion);
const currentCity = document.querySelector(".currentCity")
// console.log(currentCity);
const currentStreet = document.querySelector(".currentStreet")
// console.log(currentStreet);
const currentCountryPopulation = document.querySelector(".currentCountryPopulation")
// console.log(currentCountryPopulation);
const currentCountryLanguage = document.querySelector(".currentCountryLanguage")
// console.log(currentCountryLanguage);
const currentCountryCurrency = document.querySelector(".currentCountryCurrency")
// console.log(currentCountryCurrency);


// ===========Neighbour Country 1===========>>>>>>

const neighbourCountry1Flag = document.querySelector(".neighbourCountry1Flag")
// console.log(neighbourCountry1Flag);
const neighbourCountry1 = document.querySelector(".neighbourCountry1")
// console.log(neighbourCountry1);
const neighbourRegion1 = document.querySelector(".neighbourRegion1")
// console.log(neighbourRegion1);
const neighbourCity1 = document.querySelector(".neighbourCity1")
// console.log(neighbourCity1);
const neighbourCountry1Population = document.querySelector(".neighbourCountry1Population")
// console.log(neighbourCountry1Population);
const neighbourCountry1Language = document.querySelector(".neighbourCountry1Language")
// console.log(neighbourCountry1Language);
const neighbourCountry1Currency = document.querySelector(".neighbourCountry1Currency")
// console.log(neighbourCountry1Currency);


// ===========Neighbour Country 2===========>>>>>>

const neighbourCountry2Flag = document.querySelector(".neighbourCountry2Flag")
// console.log(neighbourCountry2Flag);
const neighbourCountry2 = document.querySelector(".neighbourCountry2")
// console.log(neighbourCountry2);
const neighbourRegion2 = document.querySelector(".neighbourRegion2")
// console.log(neighbourRegion2);
const neighbourCity2 = document.querySelector(".neighbourCity2")
// console.log(neighbourCity2);
const neighbourCountry2Population = document.querySelector(".neighbourCountry2Population")
// console.log(neighbourCountry2Population);
const neighbourCountry2Language = document.querySelector(".neighbourCountry2Language")
// console.log(neighbourCountry2Language);
const neighbourCountry2Currency = document.querySelector(".neighbourCountry2Currency")
// console.log(neighbourCountry2Currency);


// ===========Search Country Button===========>>>>>>

const searchCountryButton = document.querySelector(".searchButton")
// console.log(searchCountryButton);






const whereAmI = (latitude, longitude) => {
    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Problem with geocoding ${response.status}`);
            }
            return response.json()
        })
        .then((getCurrentData) => {
            // console.log(getCurrentData)
            // console.log(`You are in ${getCurrentData.city}, ${getCurrentData.country}`);
            return findCountry(getCurrentData)
        })
        .catch((error) => console.log(error))
}




const findCountry = (getCurrentData) => {
    // console.log(getCurrentData.country);
    fetch(`https://restcountries.com/v3.1/name/${getCurrentData.country}/`)
        .then((response) => {
            // console.log(response);
            if (!response.ok) {
                throw new Error(`Status text is ${response.statusText}`)
            }
            return response.json()
        })
        .then((getCountryData) => {
            // console.log(getCountryData);
            searchCountry(getCurrentData, getCountryData[0])

            const neighbourCountryData = getCountryData[0].borders[0];

            if (!neighbourCountryData) return;

            return fetch(`https://restcountries.com/v3.1/name/${neighbourCountryData}/`)

        })
        .then((response) => response.json())
        .then((neighbourCountryData) => {
            console.log(neighbourCountryData[0]);

            neighbourCountry1Function(neighbourCountryData[0])

            const neighbourCountry2Data = neighbourCountryData[0].borders[0];

            console.log(neighbourCountry2Data);

            if (!neighbourCountry2Data) return;

            return fetch(`https://restcountries.com/v3.1/name/${neighbourCountry2Data}/`)

        })
        .then((response) => response.json())
        .then((neighbourCountry2Data) => {
            console.log(neighbourCountry2Data[0]);

            neighbourCountry2Function(neighbourCountry2Data[0])
        })
        .catch((error) => {
            // console.log(error)
        });

}


// const neighbourCountry = (getNeighbourData) => {

//     console.log(getNeighbourData.name.common);

//     getNeighbourData = getNeighbourData

//     searchCountry(getCurrentData,getCountryData,getNeighbourData)

//     // fetch(`https://restcountries.com/v3.1/name/${getNeighbourData[0].name.common}/`)
//     //     .then((response) => {
//     //         // console.log(response);
//     //         response.json()
//     //     })
//     //     .then((getNeighbourData) => {
//     //         console.log(getNeighbourData);
//     //         // searchCountry(getCurrentData, getCountryData[0], getNeighbourData)
//     //     })
// }


const searchCountry = (getCurrentData, getCountryData) => {

    console.log(getCurrentData, "====>>>>searchCurrentData");
    console.log(getCountryData, "====>>>>searchCountryData");
    // console.log(getNeighbourData, "====>>>>searchNeighbourData");

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }

    getPosition()
        .then((currentPosition) => whereAmI(`${currentPosition.coords.latitude}, ${currentPosition.coords.longitude}`));


    // ====>>>>Karachi, Pakistan;
    // whereAmI(24.87522766620665, 67.0158787611368)

    // ======>>>>Mumbai, India
    // whereAmI(19.070123188517456, 72.8784331295297);

    // ======>>>>Beijing, China
    // whereAmI(39.900831, 116.410345);

    // ======>>>>Kabul, Afganistan
    // whereAmI(34.53545809061983, 69.20559353358169);

    currentCountryFunction(getCurrentData, getCountryData)
    // neighbourCountry1Function()
    // neighbourCountry2Function(getCurrentData, getCountryData)

}


const currentCountryFunction = (getCurrentData, getCountryData) => {

    console.log(getCurrentData, getCountryData, "====>>>>currentCountryFunction");

    currentCountryFlag.src = getCountryData.flags.png
    currentCountry.textContent = getCurrentData.country
    currentRegion.textContent = getCountryData.region
    currentCity.textContent = getCurrentData.city
    currentStreet.textContent = getCurrentData.staddress
    currentCountryPopulation.textContent = `${getCountryData.population} People`;
    currentCountryLanguage.textContent = `${getCountryData.languages.urd}, ${getCountryData.languages.eng}`
    currentCountryCurrency.textContent = getCountryData.currencies.PKR.name
}


const neighbourCountry1Function = (getNeighbourData) => {

    console.log(getNeighbourData, "====>>>>neighbourCountry1Function");

    neighbourCountry1Flag.src = getNeighbourData.flags.png
    neighbourCountry1.textContent = getNeighbourData.name.common
    neighbourRegion1.textContent = getNeighbourData.region
    neighbourCity1.textContent = getNeighbourData.capital[0]
    neighbourCountry1Population.textContent = `${getNeighbourData.population} People`;
    neighbourCountry1Language.textContent = `${getNeighbourData.languages.prs}, ${getNeighbourData.languages.pus}, ${getNeighbourData.languages.tuk}`
    neighbourCountry1Currency.textContent = getNeighbourData.currencies.AFN.name
}



const neighbourCountry2Function = (getNeighbour2Data) => {

    console.log(getNeighbour2Data, "====>>>>neighbourCountry2Function");

    neighbourCountry2Flag.src = getNeighbour2Data.flags.png
    neighbourCountry2.textContent = getNeighbour2Data.name.common
    neighbourRegion2.textContent = getNeighbour2Data.region
    neighbourCity2.textContent = getNeighbour2Data.capital[0]
    neighbourCountry2Population.textContent = `${getNeighbour2Data.population} People`;
    neighbourCountry2Language.textContent = `${getNeighbour2Data.languages.eng}`;
    neighbourCountry2Currency.textContent = getNeighbour2Data.currencies.NZD.name
}



searchCountryButton.addEventListener("click", searchCountry)






