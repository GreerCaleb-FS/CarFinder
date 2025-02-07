// Imports your SCSS stylesheet
import "./styles/index.scss";

//importing data from dataset
import carData from "./car-dataset.json";

class Vehicle {
  constructor({
    year,
    model,
    price,
    transmission,
    mileage,
    fuelType,
    tax,
    mpg,
    engineSize,
    Manufacturer,
  }) {
    this.year = year;
    this.model = model;
    this.make = Manufacturer; // Rename Manufacturer to make
    this.price = price;
    this.transmission = transmission;
    this.mileage = mileage;
    this.fuelType = fuelType;
    this.tax = tax;
    this.mpg = mpg;
    this.engineSize = engineSize;
  }

  // Method to display vehicle details as a formatted string
  getDetails() {
    return `
        ${this.year} ${this.make} ${this.model}
        ----------------------------------
        Price: $${this.price}
        Transmission: ${this.transmission}
        Mileage: ${this.mileage} miles
        Fuel Type: ${this.fuelType}
        Tax: $${this.tax}
        MPG: ${this.mpg}
        Engine Size: ${this.engineSize}L
        `;
  }
}

// Utility function to populate dropdowns
const populateDropdown = (dropdown, values) => {
  dropdown.innerHTML = `<option value="">Select ${dropdown.id}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    dropdown.appendChild(option);
  });
};

// Select dropdowns
const yearDropdown = document.getElementById("year");
const makeDropdown = document.getElementById("make");
const modelDropdown = document.getElementById("model");

// Extract unique years & populate the year dropdown
const uniqueYears = [...new Set(carData.map(({ year }) => year))];
populateDropdown(yearDropdown, uniqueYears);

// Enable & Populate Make Dropdown on Year Selection
yearDropdown.addEventListener("change", ({ target }) => {
  if (target.value) {
    makeDropdown.disabled = false;
    const filteredMakes = [
      ...new Set(
        carData
          .filter(({ year }) => year == target.value)
          .map(({ Manufacturer }) => Manufacturer)
      ),
    ];
    populateDropdown(makeDropdown, filteredMakes);
  } else {
    makeDropdown.disabled = true;
    modelDropdown.disabled = true;
  }
});

// Enable & Populate Model Dropdown on Make Selection
makeDropdown.addEventListener("change", ({ target }) => {
  if (target.value) {
    modelDropdown.disabled = false;
    const filteredModels = [
      ...new Set(
        carData
          .filter(
            ({ Manufacturer, year }) =>
              Manufacturer === target.value && year == yearDropdown.value
          )
          .map(({ model }) => model)
      ),
    ];
    populateDropdown(modelDropdown, filteredModels);
  } else {
    modelDropdown.disabled = true;
  }
});

// Handle Form Submission (Only logs details in the console)
document
  .getElementById("car-search-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form refresh

    if (!yearDropdown.value || !makeDropdown.value || !modelDropdown.value) {
      alert("Please select Year, Make, and Model!");
      return;
    }

    const selectedCarData = carData.find(
      ({ year, Manufacturer, model }) =>
        year == yearDropdown.value &&
        Manufacturer === makeDropdown.value &&
        model === modelDropdown.value
    );

    if (selectedCarData) {
      const selectedCar = new Vehicle(selectedCarData);
      console.log(selectedCar.getDetails()); // Log car details in console only
    }
  });
