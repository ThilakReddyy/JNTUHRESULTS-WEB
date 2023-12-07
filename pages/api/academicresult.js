// Import necessary libraries
const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');

// Create a new Redis client and connect to the Redis server
const redis = new Redis(process.env.REDIS_URL);

class ResultScraper {
    constructor(rollNumber) {
        this.url = 'http://results.jntuh.ac.in/resultAction';
        // this.url = "http://202.63.105.184/results/resultAction";
        this.rollNumber = rollNumber;
        this.data = { Details: {}, Results: {} };
        this.examCodes = {
            btech: {
                R18: {
                    '1-1': ['1323', '1358', '1404', '1430', '1467', '1504', '1572', '1615', '1658', '1700','1732'],
                    '1-2': ['1356', '1363', '1381', '1435', '1448', '1481', '1503', '1570', '1620', '1622', '1656', '1705','1730'],
                    '2-1': ['1391', '1425', '1449', '1496', '1560', '1610', '1628', '1667', '1671', '1707','1728'],
                    '2-2': ['1437', '1447', '1476', '1501', '1565', '1605', '1627', '1663', '1711', '1715','1725'],
                    '3-1': ['1454', '1491', '1550', '1590', '1626', '1639', '1645', '1655', '1686', '1697','1722'],
                    '3-2': ['1502', '1555', '1595', '1625', '1638', '1649', '1654', '1682', '1690', '1696','1719'],
                    '4-1': ['1545', '1585', '1624', '1640', '1644', '1653', '1678', '1695','1717'],
                    '4-2': ['1580', '1600', '1623', '1672', '1673', '1677', '1691', '1698','1716']
                },
                R22: {
                    '1-1': ['1662', '1699'],
                    '1-2': ['1704']
                }
            },
            bpharmacy: {
                R17: {
                    '1-1': ['519', '537', '577', '616', '643', '683', '722', '781', '824', '832', '855', '893'],
                    '1-2': ['517', '549', '575', '591', '648', '662', '698', '727', '779', '829', '831', '853', '890'],
                    '2-1': ['532', '570', '638', '673', '717', '769', '819', '849', '860', '886'],
                    '2-2': ['558', '611', '650', '661', '693', '711', '774', '814', '845', '882', '897'],
                    '3-1': ['597', '633', '668', '712', '759', '799', '837', '873'],
                    '3-2': ['655', '660', '688', '710', '764', '804', '841', '869', '877'],
                    '4-1': ['663', '705', '754', '794', '832', '836', '865'],
                    '4-2': ['678', '700', '789', '809', '861', '878']
                },
                R22: {
                    '1-1': ['859', '892'],
                    '1-2': ['898']
                }
            },
            mtech: {
                R19:
                {
                    '1-1': ['319', '332', '347', '356', '371', '382', '388', '395'],
                    '1-2': ['328', '336', '344', '353', '368', '379', '387', '393'],
                    '2-1': ['337', '350', '365', '376', '386', '391'],
                    '2-2': ['340', '374', '385', '390']
                },
                R22:
                {
                    '1-1': ['389', '394'],
                    '1-2': ['392']
                }
            },
            mpharmacy: {
                R19:
                {
                    '1-1': ['161', '177', '185', '198', '209', '215', '222'],
                    '1-2': ['157', '165', '174', '182', '195', '206', '214', '220'],
                    '2-1': ['166', '180', '194', '204', '213', '218'],
                    '2-2': ['169', '203', '212', '217']
                },
                R22:
                {
                    '1-1': ['216', '221'],
                    '1-2': ['219']
                }
            },
            mba: {
                R19:
                {
                    '1-1': ['297', '316', '323', '350', '362', '368', '374'],
                    '1-2': ['122', '293', '302', '313', '320', '347', '359', '367', '372'],
                    '2-1': ['303', '310', '344', '356', '366', '376'],
                    '2-2': ['120', '307', '341', '353', '365', '375']
                },
                R22:
                {
                    '1-1': ['369', '373'],
                    '1-2': ['371']
                }
            }
        };
        this.gradesToGPA = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, 'D': 0, F: 0, 'P': 0, Ab: 0, '-': 0 };
        this.payloads = {
            btech: ['&degree=btech&etype=r17&result=null&grad=null&type=intgrade&htno=', '&degree=btech&etype=r17&result=gradercrv&grad=null&type=rcrvintgrade&htno='],
            bpharmacy: ["&degree=bpharmacy&etype=r17&result=null&grad=null&type=intgrade&htno=", "&degree=bpharmacy&etype=r17&result=gradercrv&grad=null&type=rcrvintgrade&htno="],
            mtech: ["&degree=mtech&grad=pg&etype=null&result=grade17&type=intgrade&htno=", "&degree=mtech&grad=pg&etype=r16&result=gradercrv&type=rcrvintgrade&htno="],
            mpharmacy: ["&degree=mpharmacy&grad=pg&etype=null&result=grade17&type=intgrade&htno=", "&degree=mpharmacy&grad=pg&etype=r16&result=gradercrv&type=rcrvintgrade&htno="],
            mba: ["&degree=mba&grad=pg&etype=null&result=grade17&type=intgrade&htno=", "&degree=mba&grad=pg&etype=r16&result=gradercrv&type=rcrvintgrade&htno="]
        };
    }

    async fetchResult(examCode, payload) {
        const payloadData = `?&examCode=${examCode}${payload}${this.rollNumber}`;
        const response = await axios.get(this.url + payloadData);

        return response.data;
    }

    scrapeResults(semesterCode, response) {
        const $ = cheerio.load(response);

        const details = $('table').eq(0).find('tr');
        const htno = details.eq(0).find('td').eq(1).text();
        const name = details.eq(0).find('td').eq(3).text();
        const fatherName = details.eq(1).find('td').eq(1).text();
        const collegeCode = details.eq(1).find('td').eq(3).text();

        this.data.Details.NAME = name;
        this.data.Details.Roll_No = htno;
        this.data.Details.COLLEGE_CODE = collegeCode;
        this.data.Details.FATHER_NAME = fatherName;

        var results = $('table').eq(1).find('tr');

        const resultsColumnNames = results.eq(0).find('b').map((_, element) => $(element).text()).get();
        const gradeIndex = resultsColumnNames.indexOf('GRADE');
        const subjectNameIndex = resultsColumnNames.indexOf('SUBJECT NAME');
        const subjectCodeIndex = resultsColumnNames.indexOf('SUBJECT CODE');
        const subjectCreditsIndex = resultsColumnNames.indexOf('CREDITS(C)');
        const subjectInternalMarksIndex = resultsColumnNames.indexOf('INTERNAL');
        const subjectExternalMarksIndex = resultsColumnNames.indexOf('EXTERNAL');
        const subjectTotalMarksIndex = resultsColumnNames.indexOf('TOTAL');

        results = results.slice(1);
        results.each((_, resultSubject) => {
            const subjectName = $(resultSubject).find('td').eq(subjectNameIndex).text();
            const subjectCode = $(resultSubject).find('td').eq(subjectCodeIndex).text();
            const subjectGrade = $(resultSubject).find('td').eq(gradeIndex).text();
            const subjectCredits = $(resultSubject).find('td').eq(subjectCreditsIndex).text();
            const subjectInternalMarks = $(resultSubject).find('td').eq(subjectInternalMarksIndex).text();
            const subjectExternalMarks = $(resultSubject).find('td').eq(subjectExternalMarksIndex).text();
            const subjectTotalMarks = $(resultSubject).find('td').eq(subjectTotalMarksIndex).text();

            if (subjectCode in this.data.Results[semesterCode] &&
                this.data.Results[semesterCode][subjectCode].subject_grade !== 'F' &&
                this.data.Results[semesterCode][subjectCode].subject_grade !== 'Ab' &&
                this.data.Results[semesterCode][subjectCode].subject_grade !== '-' &&
                this.gradesToGPA[this.data.Results[semesterCode][subjectCode].subject_grade] > this.gradesToGPA[subjectGrade]) {
                return;
            }

            this.data.Results[semesterCode][subjectCode] = {
                subject_code: subjectCode,
                subject_name: subjectName,
                subject_internal: subjectInternalMarks,
                subject_external: subjectExternalMarks,
                subject_total: subjectTotalMarks,
                subject_grade: subjectGrade,
                subject_credits: subjectCredits
            };
        });
    }

    totalGradeCalculator(code, value) {
        let total = 0;
        let credits = 0;

        for (const data in value) {
            if (data === 'DETAILS') continue;

            if (value[data].subject_grade === 'F' || value[data].subject_grade === 'Ab' || value[data].subject_grade === '-') {
                return '';
            }

            total += parseInt(this.gradesToGPA[value[data].subject_grade]) * parseFloat(value[data].subject_credits);
            credits += parseFloat(value[data].subject_credits);
        }

        this.data.Results[code].total = total;
        this.data.Results[code].credits = credits;
        this.data.Results[code].CGPA = (total / credits).toFixed(2);
    }

    async scrapeAllResults(examCode = 'all') {

        const tasks = {};
        var payloads = []
        var examCodes = {}
        const graduationStart = parseInt(this.rollNumber.substring(0, 2), 10);
        console.log(graduationStart)
        if (this.rollNumber[5] === 'A') {
            payloads = this.payloads.btech;
            examCodes = this.examCodes.btech[graduationStart >= 22 ? 'R22' : 'R18'];
        } else if (this.rollNumber[5] === 'R') {
            payloads = this.payloads.bpharmacy;
            examCodes = this.examCodes.bpharmacy[graduationStart >= 22 ? 'R22' : 'R17'];
        } else if (this.rollNumber[5] == 'E') {
            payloads = this.payloads.mba;
            examCodes = this.examCodes.mba[graduationStart >= 22 ? 'R22' : 'R19'];
        } else if (this.rollNumber[5] == 'D') {
            payloads = this.payloads.mtech;
            examCodes = this.examCodes.mtech[graduationStart >= 22 ? 'R22' : 'R19'];
        } else if (this.rollNumber[5] == 'S') {
            payloads = this.payloads.mpharmacy;
            examCodes = this.examCodes.mpharmacy[graduationStart >= 22 ? 'R22' : 'R19'];
        }

        if (this.rollNumber[4] === '5') {
            delete examCodes['1-1'];
            delete examCodes['1-2'];
        }

        if (examCode !== 'all') {
            examCodes = { [examCode]: examCodes[examCode] };
        }

        for (const examCode in examCodes) {
            tasks[examCode] = [];

            for (const code of examCodes[examCode]) {
                for (const payload of payloads) {
                    try {
                        const task = this.fetchResult(code, payload);
                        tasks[examCode].push(task);
                    } catch (error) {
                        console.error(this.rollNumber, error);
                    }
                }
            }
        }

        for (const examCode in tasks) {
            this.data.Results[examCode] = {};

            try {
                const responses = await Promise.all(tasks[examCode]);

                for (const response of responses) {
                    if (!response.includes('Enter HallTicket Number')) {
                        this.scrapeResults(examCode, response);
                    }
                }

                if (Object.keys(this.data.Results[examCode]).length > 0) {
                    this.totalGradeCalculator(examCode, this.data.Results[examCode]);
                } else {
                    delete this.data.Results[examCode];
                }
            } catch (error) {
                console.error(this.rollNumber, error);
            }
        }
        try {
            const results = this.data.Results;
            var total = 0, credits = 0;
            for (let val in results) {
                total = total + results[val].total
                credits = credits + results[val].credits

            }
            this.data.Results.Total = (total / credits).toFixed(2)
            if (this.data.Results.Total === "NaN") {
                this.data.Results.Total = ""
            }

        }
        catch (error) {
            console.log("okay")

        }

        return this.data;
    }

    async run() {
        return await this.scrapeAllResults();
    }
}


export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');



    // Usage

    const startTime = performance.now();
    const rollNumber = req.query['htno'];
    const jsonString = await redis.get(rollNumber);
    if (jsonString != null) {

        const results = JSON.parse(jsonString);
        res.status(200).json(results);
        console.log('Data has been got from the Redis cache.');
        res.end();
    }
    const scraper = new ResultScraper(rollNumber);
    scraper.run()
        .then(data => {
            const endTime = performance.now();

            // Calculate the time taken in milliseconds
            console.log(rollNumber, 'Time taken:', endTime - startTime, 'seconds');
            // Set the data in Redis with the specified key and expiration time


            const jsonString = JSON.stringify({ data });
            console.log(jsonString);
            redis.set(rollNumber, jsonString, 'EX', 4 * 3600)
                .then(() => {
                    console.log('Data has been set in the Redis cache.');
                })
                .catch((error) => {
                    console.error('Error setting data in the Redis cache:', error);
                });
            res.status(200).json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json("Internal Server Error");
            console.log(htno, "results failed to fetch")
            res.end();
        });
}
export const config = {
    api: {
        externalResolver: true,
    },
}
