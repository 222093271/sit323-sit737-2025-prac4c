# SIT737-2025-Prac4C – Enhanced Calculator Microservice

### Author: Inwang Ubong Marshal (222093271)

### Repository: https://github.com/222093271/sit323-sit737-2025-prac4c.git 


## Overview

This project, part of the SIT737-2025-Prac4C task, builds upon the previous calculator microservice developed in Task 4.1P. The goal is to expand its capabilities by incorporating additional arithmetic functions, refining error handling mechanisms, and improving the overall user experience via enhanced frontend presentation. The project is developed using Node.js and Express, with Winston used for logging system activities, including request tracking and error reporting.

The newly added features include:

*	Exponentiation (e.g., 2^3)

*	Square root (e.g., √16)

*	Modulo (e.g., 10 % 3)

The updated version also includes more thorough validation, user-friendly error messages, and an improved home page using basic HTML and CSS styling. Testing, logging, and proper GitHub management were performed as per submission guidelines.

All work was completed using VS Code installed on a local machine, with Node.js and Git tools properly configured. No online IDEs such as GitHub Codespaces were used.


## Development Environment Setup

Tools and Software Used:

*	Visual Studio Code: https://code.visualstudio.com

*	Node.js & NPM: https://nodejs.org

*	Git: https://git-scm.com

*	Winston Logging Library


# Step-by-Step Development Process

## Step 1: Cloning and Renaming the Base Project

The previously submitted project (sit323-sit737-2025-prac4p) was copied into a new folder manually and renamed to sit323-sit737-2025-prac4c. This ensured all existing functionality (addition, subtraction, multiplication, division, logging, validation) was retained, and only enhancements were added.

## Step 2: Creating GitHub Repository

A new public repository was created on GitHub named:
`sit323-sit737-2025-prac4c`

The local folder was linked to this repository using:

git init

git remote add origin https://github.com/222093271/sit323-sit737-2025-prac4c.git 


## Step 3: Adding New Calculator Operations

Three new routes were implemented using app.get() in server.js:

➕ Exponentiation (/power)
```
app.get('/power', (req, res) => {
    const { base, exp } = req.query;
    if (isNaN(base) || isNaN(exp)) {
        logger.error(`Power Error: Inputs must be numbers | base=${base}, exp=${exp}`);
        return res.status(400).json({ error: 'Both base and exponent must be numbers.' });
    }
    const result = Math.pow(parseFloat(base), parseFloat(exp));
    logger.info(`Power: ${base}^${exp} = ${result}`);
    res.json({ result });
});
```

➕ Square Root (/sqrt)
```
app.get('/sqrt', (req, res) => {
    const { num } = req.query;
    if (isNaN(num)) {
        logger.error(`Sqrt Error: Invalid number | num=${num}`);
        return res.status(400).json({ error: 'Input must be a number.' });
    }
    if (parseFloat(num) < 0) {
        logger.error(`Sqrt Error: Cannot take square root of negative | num=${num}`);
        return res.status(400).json({ error: 'Cannot calculate square root of a negative number.' });
    }
    const result = Math.sqrt(parseFloat(num));
    logger.info(`Sqrt: sqrt(${num}) = ${result}`);
    res.json({ result });
});
```

➕ Modulo (/modulo)
```
app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error(`Modulo Error: Inputs must be numbers | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error: 'Both inputs must be numbers.' });
    }
    if (parseFloat(num2) === 0) {
        logger.error(`Modulo Error: Modulo by zero is not allowed | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error: 'Modulo by zero is not allowed.' });
    }
    const result = parseFloat(num1) % parseFloat(num2);
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
    res.json({ result });
});
```

## Step 4: Enhancing Homepage Design

The root route (/) was updated with a styled HTML template using inline CSS and tables to provide a cleaner and more user-friendly interface.

The new homepage includes links to all operations, neatly presented in a table with padding, hover effects, spacing, and headings. This improves the visual quality and usability, especially for non-technical users.


## Step 5: Testing and Validation

All routes were tested manually in the browser and using Postman. The following scenarios were tested:

✅ Valid Inputs
*	/power?base=2&exp=3 → 8
*	/sqrt?num=16 → 4
*	/modulo?num1=10&num2=3 → 1

❌ Invalid Inputs
*	/power?base=abc&exp=3 → error: non-numeric input
*	/sqrt?num=-25 → error: square root of negative
*	/modulo?num1=10&num2=0 → error: modulo by zero

Errors were correctly returned in the response and also logged in logs/error.log.

## Step 6: GitHub Push

After verifying the code and logs, the following commands were used to push to GitHub:

git add .

git commit -m "Enhanced calculator microservice with advanced operations"*
git push -u origin main

## Logging Setup

Logging was done using Winston, configured to log:
*	Console output for development
*	File output for errors and general activity
*	Custom log messages for every route using logger.info() and logger.error()


##  Final Notes

*	The enhanced calculator microservice introduces advanced arithmetic features while preserving core functionalities.
*	All new routes include robust error handling with appropriate responses and logging.
*	The homepage was visually improved with HTML/CSS enhancements.
*	All runtime logs are excluded from Git using .gitignore.
*	Logging is implemented using Winston to ensure observability and traceability.
*	The code was thoroughly tested, documented, and pushed to GitHub as per submission guidelines.


## Short Summary

The SIT323-SIT737-2025-Prac4C task involved expanding the calculator microservice with advanced operations like exponentiation, square root, and modulo. The application was enhanced with additional validation, professional logging using Winston, and a user-friendly homepage interface. All errors were effectively handled and logged, while the code was structured cleanly for maintainability. The entire project was developed and tested locally using VS Code and Node.js, and submitted to GitHub under the appropriate repository name.

