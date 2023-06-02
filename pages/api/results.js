import fetch from 'node-fetch'
const cheerio = require('cheerio');
const fs = require('fs');

export default async function handler(req, res) {
    try {
        const results = [];
        for (let i = 0; i < 2; i++) {
            const url = "http://results.jntuh.ac.in/jsp/home.jsp";
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);
            const result = $("table").eq(i).find("tr");

            result.each(function () {
                const resultLink = $(this).find("td").eq(0).find("a").eq(0).attr("href");
                const resultText = $(this).text();
                const resultTextIndex = resultText.indexOf("Results") + 7;

                const jsonAppended = {
                    "Result_title": resultText.slice(0, resultTextIndex),
                    "Link": "http://results.jntuh.ac.in" + resultLink,
                    "Date": resultText.slice(resultTextIndex)
                };

                results.push(jsonAppended);
            });
        }

        results.sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);
            return dateB - dateA;
        });

        const data = JSON.stringify(results);
        res.status(200).json(results);
        fs.writeFile("public/Notification.json", data, (error) => {
            if (error) {
                console.error(error);
                throw error;
            }
        });
        return res
    } catch (error) {
        fs.readFile("public/Notification.json", (error, data) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                throw error;
            }
            const result = JSON.parse(data);
            res.status(200).json(result);
        });
    }
}
