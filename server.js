const express = require('express');
const winston = require('winston');
const fs = require('fs');
const app = express();
const port = 3000;

// Ensure 'logs' folder exists
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// Set up Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// ✅ Middleware to log every incoming request
app.use((req, res, next) => {
    logger.info({
        message: 'Incoming request',
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        query: req.query
    });
    next();
});

// Input validation
function validate(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return 'Both inputs must be numbers.';
    }
    return null;
}

// Home route
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Calculator Microservice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color:rgb(0, 0, 0);
                    padding: 40px;
                    line-height: 1.6;
                }
                h2 {
                    color: white;
                    text-align: center;
                }
                table {
                    width: 60%;
                    margin: 20px auto;
                    border-collapse: collapse;
                }
                td {
                    padding: 12px 20px;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    text-align: center;
                    font-size: 1rem;
                }
                a {
                    text-decoration: none;
                    color: #007bff;
                }
                a:hover {
                    text-decoration: underline;
                    color: #0056b3;
                }
            </style>
        </head>
        <body>
            <h2>Welcome to the Calculator Microservice</h2>
            <table>
                <tr><td><a href="/add?num1=5&num2=3">Add 5 + 3</a></td></tr>
                <tr><td><a href="/subtract?num1=10&num2=4">Subtract 10 - 4</a></td></tr>
                <tr><td><a href="/multiply?num1=6&num2=7">Multiply 6 * 7</a></td></tr>
                <tr><td><a href="/divide?num1=20&num2=5">Divide 20 / 5</a></td></tr>
                <tr><td><a href="/power?base=2&exp=3">Power 2 ^ 3</a></td></tr>
                <tr><td><a href="/sqrt?num=16">Square Root of 16</a></td></tr>
                <tr><td><a href="/modulo?num1=10&num2=3">Modulo: 10 % 3</a></td></tr>
            </table>
        </body>
        </html>
    `);
});

// Calculator routes

app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Addition Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Subtraction Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Multiplication Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Division Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    if (parseFloat(num2) === 0) {
        const msg = 'You cannot divide by zero!';
        logger.error(`Division Error: ${msg} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error: msg });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ result });
});

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



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});