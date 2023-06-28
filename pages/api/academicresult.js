const axios = require('axios');
const cheerio = require('cheerio');

class ResultScraper {
    constructor(rollNumber) {
        this.url = 'http://results.jntuh.ac.in/resultAction';
        // this.url = "http://202.63.105.184/results/resultAction";
        this.rollNumber = rollNumber;
        this.results = { Details: {}, Results: {} };
        this.examCodes = {
            btech: {
                R18: {
                    '1-1': ['1323', '1358', '1404', '1430', '1467', '1504', '1572', '1615', '1658'],
                    '1-2': ['1356', '1363', '1381', '1435', '1448', '1481', '1503', '1570', '1620', '1622', '1656'],
                    '2-1': ['1391', '1425', '1449', '1496', '1560', '1610', '1628', '1667', '1671'],
                    '2-2': ['1437', '1447', '1476', '1501', '1565', '1605', '1627', '1663'],
                    '3-1': ['1454', '1491', '1550', '1590', '1626', '1639', '1645', '1655'],
                    '3-2': ['1502', '1555', '1595', '1625', '1638', '1649', '1654'],
                    '4-1': ['1545', '1585', '1624', '1640', '1644', '1653'],
                    '4-2': ['1580', '1600', '1623']
                },
                R22: {
                    '1-1': ['1662']
                }
            },
            bpharmacy: {
                R17: {
                    '1-1': ['519', '537', '577', '616', '643', '683', '722', '781', '824', '832', '855'],
                    '1-2': ['517', '549', '575', '591', '648', '662', '698', '727', '779', '829', '831', '853', '860'],
                    '2-1': ['532', '570', '638', '673', '717', '769', '819', '849'],
                    '2-2': ['558', '611', '650', '661', '693', '711', '774', '814', '845'],
                    '3-1': ['597', '633', '668', '712', '759', '799', '837'],
                    '3-2': ['655', '660', '688', '710', '764', '804', '841'],
                    '4-1': ['663', '705', '754', '794', '832', '836'],
                    '4-2': ['678', '700', '789', '809']
                },
                R22: {
                    '1-1': ['859']
                }
            },
            mpharmacy: {
                R19:
                {
                    '1-1': ['319', '332', '347', '356', '371', '382', '388'],
                    '1-2': ['328', '336', '344', '353', '368', '379', '387'],
                    '2-1': ['337', '350', '365', '376', '386'],
                    '2-2': ['340', '374', '385']
                },
                R22:
                {
                    '1-1': ['389']
                }
            },
            mTech: {
                R19:
                {
                    '1-1': ['161', '177', '185', '198', '209', '215'],
                    '1-2': ['157', '165', '174', '182', '195', '206', '214'],
                    '2-1': ['166', '180', '194', '204', '213'],
                    '2-2': ['169', '203', '212']
                },
                R22:
                {
                    '1-1': ['216']
                }
            },
            mba: {
                R19:
                {
                    '1-1': ['297', '316', '323', '350', '362', '368'],
                    '1-2': ['122', '293', '302', '313', '320', '347', '359', '367'],
                    '2-1': ['303', '310', '344', '356', '366'],
                    '2-2': ['120', '307', '341', '353', '365']
                },
                R22:
                {
                    '1-1': ['369']
                }
            }
        };
        this.gradesToGPA = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, F: 0, Ab: 0, '-': 0 };
        this.payloads = {
            btech: ['&degree=btech&etype=r17&result=null&grad=null&type=intgrade&htno=', '&degree=btech&etype=r17&result=gradercrv&grad=null&type=rcrvintgrade&htno='],
            bpharmacy: ['&degree=bpharmacy&etype=r17&grad=null&result=null&type=regular&htno=', '&degree=bpharmacy&etype=r17&grad=null&result=gradercrv&type=rcrvintgrade&htno='],
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

        this.results.Details.NAME = name;
        this.results.Details.Roll_No = htno;
        this.results.Details.COLLEGE_CODE = collegeCode;
        this.results.Details.FATHER_NAME = fatherName;

        var results = $('table').eq(1).find('tr');

        const resultsColumnNames = results.eq(0).find('b').map((_, element) => $(element).text()).get();
        const gradeIndex = resultsColumnNames.indexOf('GRADE');
        const subjectNameIndex = resultsColumnNames.indexOf('SUBJECT NAME');
        const subjectCodeIndex = resultsColumnNames.indexOf('SUBJECT CODE');
        const subjectCreditsIndex = resultsColumnNames.indexOf('CREDITS(C)');

        results = results.slice(1);
        results.each((_, resultSubject) => {
            const subjectName = $(resultSubject).find('td').eq(subjectNameIndex).text();
            const subjectCode = $(resultSubject).find('td').eq(subjectCodeIndex).text();
            const subjectGrade = $(resultSubject).find('td').eq(gradeIndex).text();
            const subjectCredits = $(resultSubject).find('td').eq(subjectCreditsIndex).text();

            if (subjectCode in this.results.Results[semesterCode] &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== 'F' &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== 'Ab' &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== '-' &&
                this.gradesToGPA[this.results.Results[semesterCode][subjectCode].subject_grade] > this.gradesToGPA[subjectGrade]) {
                return;
            }

            this.results.Results[semesterCode][subjectCode] = {
                subject_code: subjectCode,
                subject_name: subjectName,
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

        this.results.Results[code].total = total;
        this.results.Results[code].credits = credits;
        this.results.Results[code].CGPA = (total / credits).toFixed(2);
    }

    async scrapeAllResults(examCode = 'all') {
        const session = axios.create();
        const tasks = {};
        var payloads = []
        var examCodes = {}
        if (this.rollNumber[5] === 'A') {
            payloads = this.payloads.btech;
            examCodes = this.examCodes.btech[this.rollNumber.startsWith('22') ? 'R22' : 'R18'];
        } else if (this.rollNumber[5] === 'R') {
            payloads = this.payloads.bpharmacy;
            examCodes = this.examCodes.bpharmacy[this.rollNumber.startsWith('22') ? 'R22' : 'R17'];
        } else if (this.rollNumber[5] == 'E') {
            payloads = this.payloads.mba;
            examCodes = this.examCodes.mba[this.rollNumber.startsWith('22') ? 'R22' : 'R19'];

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
            this.results.Results[examCode] = {};

            try {
                const responses = await Promise.all(tasks[examCode]);

                for (const response of responses) {
                    if (!response.includes('Enter HallTicket Number')) {
                        this.scrapeResults(examCode, response);
                    }
                }

                if (Object.keys(this.results.Results[examCode]).length > 0) {
                    this.totalGradeCalculator(examCode, this.results.Results[examCode]);
                } else {
                    delete this.results.Results[examCode];
                }
            } catch (error) {
                console.error(this.rollNumber, error);
            }
        }
        try {
            const results = this.results.Results;
            var total = 0, credits = 0;
            for (let val in results) {
                total = total + results[val].total
                credits = credits + results[val].credits

            }
            this.results.Results.Total = (total / credits).toFixed(2)
            if (this.results.Results.Total === "NaN") {
                this.results.Results.Total = ""
            }

        }
        catch (error) {
            console.log("okay")

        }

        return this.results;
    }

    async run() {
        return await this.scrapeAllResults();
    }
}


export default async function handler(req, res) {
    // Usage
    console.log()
    const startTime = performance.now();
    const rollNumber = req.query['htno'];
    const scraper = new ResultScraper(rollNumber);
    scraper.run()
        .then(results => {
            const endTime = performance.now();

            // Calculate the time taken in milliseconds

            console.log(rollNumber, 'Time taken:', endTime - startTime, 'seconds');
            res.status(200).json(results);
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
