const fs = require('fs');


export default async function handler(req, res) {
    fs.writeFile("public/Notification.json", data, (error) => {

        if (error) {
            console.error(error);

            throw error;
        }

    });
}