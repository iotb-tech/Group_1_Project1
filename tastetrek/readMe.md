# 🌍 International Food Search Web Application

A simple web application that allows users to search for international meals and recipes using data fetched from **TheMealDB API**. The application displays the meal's image, name, country of origin, cooking instructions, and a link to the original recipe source.

## 📖 Overview

This project demonstrates how to consume a REST API using JavaScript and dynamically display data on a web page. It provides users with an easy way to explore meals from different countries and learn how to prepare them.

## ✨ Features

- 🔍 Search meals by name
- 🌎 Display the meal's country
- 🍽️ Display the meal name
- 🖼️ Display the meal image
- 📜 Display cooking instructions
- 🔗 Provide a link to the original recipe source
- 📟 Pagination for search results
- ⚡ Live search with debounce
- ❌ Error handling for invalid searches
- 📱 Responsive and user-friendly interface

## 🛠️ Technologies Used

- HTML5
- TailwindCSS
- JavaScript (ES6+)
- Fetch API
- TheMealDB API

## 📡 API Used

The project uses the free **TheMealDB API**.

API Documentation:

https://www.themealdb.com/api.php

Search Endpoint:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s={mealName}
```

Example:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

## 📂 Project Structure

```
Food-Search-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💻 How It Works

1. Enter the name of a meal in the search box.
2. Click the **Search** button or begin typing.
3. The application sends a request to TheMealDB API.
4. Matching meal(s) are displayed, including:
   - Meal Name
   - Country/Area
   - Meal Image
   - Cooking Instructions
   - Recipe Source Link


## 🔮 Future Improvements

- Filter meals by category
- Filter meals by country
- Search by ingredient
- Save favorite meals
- Dark mode
- Loading spinner
- Better UI/UX animations

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to your branch.
6. Open a Pull Request.

## 👨‍💻 Team Members

1. Akintobi Abibat Olamide
2. Adisa Kabiru Olaitan
3. Hamzat Jabir Olamide
4. Adigun AbdulRahman Adeyinka

GitHub Host: https://github.com/iotb-tech/Group_1_Project1

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- TheMealDB API
- Open-source community