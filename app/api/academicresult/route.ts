import Redis from "ioredis";
import axios from "axios";
import cheerio from "cheerio";

let redisUrl: string = String(process.env.REDIS_URL);
let redis = new Redis(redisUrl);

class ResultScraper {
  private url: string;
  private rollNumber: string;
  private results: any;
  private examCodes: any;
  private gradesToGPA: {
    [key: string]: number;
  };
  private payloads: {
    [key: string]: string[];
  };

  constructor(rollNumber: string, url_index: number = 1) {
    const urls: string[] = [
      "http://results.jntuh.ac.in/resultAction",
      "http://202.63.105.184/resultAction",
    ];
    this.url = urls[url_index];
    this.rollNumber = rollNumber;
    this.results = { Details: {}, Results: {} };
    this.examCodes = {
      btech: {
        R18: {
          "1-1": [
            "1358",
            "1323",
            "1404",
            "1430",
            "1467",
            "1504",
            "1572",
            "1615",
            "1658",
            "1700",
            "1732",
            "1764",
          ],
          "1-2": [
            "1356",
            "1363",
            "1381",
            "1435",
            "1448",
            "1481",
            "1503",
            "1570",
            "1620",
            "1622",
            "1656",
            "1705",
            "1730",
            "1769",
          ],
          "2-1": [
            "1391",
            "1425",
            "1449",
            "1496",
            "1560",
            "1610",
            "1628",
            "1667",
            "1671",
            "1707",
            "1728",
          ],
          "2-2": [
            "1437",
            "1447",
            "1476",
            "1501",
            "1565",
            "1605",
            "1627",
            "1663",
            "1711",
            "1715",
            "1725",
          ],
          "3-1": [
            "1454",
            "1491",
            "1550",
            "1590",
            "1626",
            "1639",
            "1645",
            "1655",
            "1686",
            "1697",
            "1722",
          ],
          "3-2": [
            "1502",
            "1555",
            "1595",
            "1625",
            "1638",
            "1649",
            "1654",
            "1682",
            "1690",
            "1696",
            "1719",
          ],
          "4-1": [
            "1545",
            "1585",
            "1624",
            "1640",
            "1644",
            "1653",
            "1678",
            "1695",
            "1717",
            "1758",
            "1762",
          ],
          "4-2": [
            "1580",
            "1600",
            "1623",
            "1672",
            "1673",
            "1677",
            "1691",
            "1698",
            "1716",
          ],
        },
        R22: { "1-1": ["1662", "1699", "1763"], "1-2": ["1704", "1768"] },
      },
      bpharmacy: {
        R17: {
          "1-1": [
            "519",
            "537",
            "577",
            "616",
            "643",
            "683",
            "722",
            "781",
            "824",
            "832",
            "855",
            "893",
          ],
          "1-2": [
            "517",
            "549",
            "575",
            "591",
            "648",
            "662",
            "698",
            "727",
            "779",
            "829",
            "831",
            "853",
            "890",
          ],
          "2-1": [
            "532",
            "570",
            "638",
            "673",
            "717",
            "769",
            "819",
            "849",
            "860",
            "886",
          ],
          "2-2": [
            "558",
            "611",
            "650",
            "661",
            "693",
            "711",
            "774",
            "814",
            "845",
            "882",
            "897",
          ],
          "3-1": ["597", "633", "668", "712", "759", "799", "837", "873"],
          "3-2": [
            "655",
            "660",
            "688",
            "710",
            "764",
            "804",
            "841",
            "869",
            "877",
          ],
          "4-1": ["663", "705", "754", "794", "832", "836", "865", "920"],
          "4-2": ["678", "700", "789", "809", "861", "878"],
        },
        R22: { "1-1": ["859", "892"], "1-2": ["898"] },
      },
      mtech: {
        R19: {
          "1-1": ["319", "332", "347", "356", "371", "382", "388", "395"],
          "1-2": ["328", "336", "344", "353", "368", "379", "387", "393"],
          "2-1": ["337", "350", "365", "376", "386", "391", "410"],
          "2-2": ["340", "374", "385", "390"],
        },
        R22: { "1-1": ["389", "394"], "1-2": ["392"], "2-1": ["409"] },
      },
      mpharmacy: {
        R19: {
          "1-1": ["161", "177", "185", "198", "209", "215", "222"],
          "1-2": ["157", "165", "174", "182", "195", "206", "214", "220"],
          "2-1": ["166", "180", "194", "204", "213", "218"],
          "2-2": ["169", "203", "212", "217"],
        },
        R22: { "1-1": ["216", "221"], "1-2": ["219"] },
      },
      mba: {
        R19: {
          "1-1": ["297", "316", "323", "350", "362", "368", "374"],
          "1-2": [
            "122",
            "293",
            "302",
            "313",
            "320",
            "347",
            "359",
            "367",
            "372",
          ],
          "2-1": ["303", "310", "344", "356", "366", "376"],
          "2-2": ["120", "307", "341", "353", "365", "375"],
        },
        R22: { "1-1": ["369", "373"], "1-2": ["371"] },
      },
    };
    this.gradesToGPA = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      F: 0,
      Ab: 0,
      "-": 0,
    };
    this.payloads = {
      btech: [
        "&degree=btech&etype=r17&result=null&grad=null&type=intgrade&htno=",
        "&degree=btech&etype=r17&result=gradercrv&grad=null&type=rcrvintgrade&htno=",
      ],
      bpharmacy: [
        "&degree=bpharmacy&etype=r17&grad=null&result=null&type=intgrade&htno=",
        "&degree=bpharmacy&etype=r17&grad=null&result=gradercrv&type=rcrvintgrade&htno=",
      ],
      mba: [
        "&degree=mba&grad=pg&etype=null&result=grade17&type=intgrade&htno=",
        "&degree=mba&grad=pg&etype=r16&result=gradercrv&type=rcrvintgrade&htno=",
      ],
      mpharmacy: [
        "&degree=mpharmacy&etype=r17&grad=pg&result=null&type=intgrade&htno=",
        "&degree=mpharmacy&etype=r17&grad=pg&result=gradercrv&type=rcrvintgrade&htno=",
      ],
      mtech: [
        "&degree=mtech&grad=pg&etype=null&result=grade17&type=intgrade&htno=",
        "&degree=mtech&grad=pg&etype=r16&result=gradercrv&type=rcrvintgrade&htno=",
      ],
    };
  }
  async fetchResult(examCode: string, payload: string) {
    const payloadData = `?&examCode=${examCode}${payload}${this.rollNumber}`;
    const response = await axios.get(this.url + payloadData);

    return response.data;
  }

  scrapeResults(semesterCode: string, response: any) {
    const $ = cheerio.load(response);
    const details = $("table").eq(0).find("tr");
    const htno = details.eq(0).find("td").eq(1).text();
    const name = details.eq(0).find("td").eq(3).text();
    const fatherName = details.eq(1).find("td").eq(1).text();
    const collegeCode = details.eq(1).find("td").eq(3).text();

    this.results.Details.NAME = name;
    this.results.Details.Roll_No = htno;
    this.results.Details.COLLEGE_CODE = collegeCode;
    this.results.Details.FATHER_NAME = fatherName;

    var results = $("table").eq(1).find("tr");

    const resultsColumnNames = results
      .eq(0)
      .find("b")
      .map((_, element) => $(element).text())
      .get();
    const gradeIndex = resultsColumnNames.indexOf("GRADE");
    const subjectNameIndex = resultsColumnNames.indexOf("SUBJECT NAME");
    const subjectCodeIndex = resultsColumnNames.indexOf("SUBJECT CODE");
    const subjectCreditsIndex = resultsColumnNames.indexOf("CREDITS(C)");
    const subjectInternalMarksIndex = resultsColumnNames.indexOf("INTERNAL");
    const subjectExternalMarksIndex = resultsColumnNames.indexOf("EXTERNAL");
    const subjectTotalMarksIndex = resultsColumnNames.indexOf("TOTAL");

    results = results.slice(1);
    results.each((_, resultSubject) => {
      const subjectName = $(resultSubject)
        .find("td")
        .eq(subjectNameIndex)
        .text();
      const subjectCode = $(resultSubject)
        .find("td")
        .eq(subjectCodeIndex)
        .text();
      const subjectGrade = $(resultSubject).find("td").eq(gradeIndex).text();
      const subjectCredits = $(resultSubject)
        .find("td")
        .eq(subjectCreditsIndex)
        .text();
      const subjectInternalMarks = $(resultSubject)
        .find("td")
        .eq(subjectInternalMarksIndex)
        .text();
      const subjectExternalMarks = $(resultSubject)
        .find("td")
        .eq(subjectExternalMarksIndex)
        .text();
      const subjectTotalMarks = $(resultSubject)
        .find("td")
        .eq(subjectTotalMarksIndex)
        .text();

      if (
        subjectCode in this.results.Results[semesterCode] &&
        this.results.Results[semesterCode][subjectCode].subject_grade !== "F" &&
        this.results.Results[semesterCode][subjectCode].subject_grade !==
          "Ab" &&
        this.results.Results[semesterCode][subjectCode].subject_grade !== "-" &&
        this.gradesToGPA[
          this.results.Results[semesterCode][subjectCode].subject_grade
        ] > this.gradesToGPA[subjectGrade]
      ) {
        return;
      }

      this.results.Results[semesterCode][subjectCode] = {
        subject_code: subjectCode,
        subject_name: subjectName,
        subject_internal: subjectInternalMarks,
        subject_external: subjectExternalMarks,
        subject_total: subjectTotalMarks,
        subject_grade: subjectGrade,
        subject_credits: subjectCredits,
      };
    });
  }
  totalGradeCalculator(code: string, value: any) {
    let total = 0;
    let credits = 0;
    let fail = false;
    for (const data in value) {
      if (data === "DETAILS") continue;

      if (
        value[data].subject_grade === "F" ||
        value[data].subject_grade === "Ab" ||
        value[data].subject_grade === "-"
      ) {
        fail = true;
      }

      total +=
        parseInt(this.gradesToGPA[value[data].subject_grade].toString()) *
        parseFloat(value[data].subject_credits);
      credits += parseFloat(value[data].subject_credits);
    }

    this.results.Results[code].total = total;
    this.results.Results[code].credits = credits;
    if (fail) {
      return;
    }
    this.results.Results[code].CGPA = (total / credits).toFixed(2);
  }
  async scrapeAllResults(examCode: string = "all") {
    const tasks: any = {};
    var payloads: string[] = [];
    var examCodes: { [key: string]: any } = {};
    const graduationStart = parseInt(this.rollNumber.slice(0, 2));
    if (this.rollNumber[5] === "A") {
      payloads = this.payloads.btech;
      examCodes = this.examCodes.btech[graduationStart >= 22 ? "R22" : "R18"];
    } else if (this.rollNumber[5] === "R") {
      payloads = this.payloads.bpharmacy;
      examCodes =
        this.examCodes.bpharmacy[graduationStart >= 22 ? "R22" : "R17"];
    } else if (this.rollNumber[5] == "E") {
      payloads = this.payloads.mba;
      examCodes = this.examCodes.mba[graduationStart >= 22 ? "R22" : "R19"];
    } else if (this.rollNumber[5] == "D") {
      payloads = this.payloads.mtech;
      examCodes = this.examCodes.mtech[graduationStart >= 22 ? "R22" : "R19"];
    } else if (this.rollNumber[5] == "S") {
      payloads = this.payloads.mpharmacy;
      examCodes =
        this.examCodes.mpharmacy[graduationStart >= 22 ? "R22" : "R19"];
    }

    //Deleting the first two semesters if the student is lateral entry
    if (this.rollNumber[4] === "5") {
      delete examCodes["1-1"];
      delete examCodes["1-2"];
    }

    // Check if exam_codes should include all codes
    if (examCode !== "all") {
      examCodes = { [examCode]: examCodes[examCode] };
    }

    for (const examCode in examCodes) {
      // Create a task for each exam code
      tasks[examCode] = [];

      for (const code of examCodes[examCode]) {
        for (const payload of payloads) {
          try {
            const task = this.fetchResult(code, payload);
            tasks[examCode].push(task);
          } catch (e) {
            console.error(this.rollNumber, e);
          }
        }
      }
    }
    for (const examCode in tasks) {
      this.results.Results[examCode] = {};

      try {
        const responses = await Promise.all(tasks[examCode]);

        for (const response of responses) {
          if (!response.includes("Enter HallTicket Number")) {
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
    return this.results;
  }

  async run() {
    const response = await this.scrapeAllResults();

    //total Grade calculator
    var total_grades = 0,
      total_credits = 0;
    const results = Object.values(this.results.Results);
    for (let result in results) {
      const res: any = results[result];
      total_grades = total_grades + res["total"];
      total_credits = total_credits + res["credits"];
    }
    this.results.Results.Total = (total_grades / total_credits).toFixed(2);
    if (this.results.Results.Total === "NaN") {
      this.results.Results.Total = "";
    }

    return response;
  }
}

async function checkUrl(url: string) {
  try {
    const response = await axios.get(url, { timeout: 1000 });
    return response.status === 200;
  } catch (error: any) {
    console.error(`Error checking the ${url}`, error.message);
    return false;
  }
}

async function chooseUrl() {
  const urls: string[] = [
    "http://results.jntuh.ac.in/resultAction",
    "http://202.63.105.184/resultAction",
  ];
  for (let i = 0; i < urls.length; i++) {
    const isUrlvalid = await checkUrl(urls[i]);
    if (isUrlvalid) {
      return i;
    }
  }
  return -1;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const htno = searchParams.get("htno");
  if (htno === null || htno.length != 10) {
    return Response.json(
      {
        message: "Please check the hallticket and try again",
      },
      { status: 500 },
    );
  }

  //check if the data is present in cache
  const redisResponse = await redis.get(htno.toUpperCase());
  if (redisResponse !== null) {
    const result = JSON.parse(redisResponse);
    return Response.json(result["data"], { status: 200 });
  }

  //Extraction
  const urlIndex = await chooseUrl();
  if (urlIndex === -1) {
    return Response.json({ data: "Jntuh servers are down!!" }, { status: 422 });
  }
  const scraper = new ResultScraper(htno.toUpperCase(), urlIndex);
  const response = await scraper
    .run()
    .then((data) => {
      if (Object.keys(data["Details"]).length === 0) {
        return { data: "Internal Server Error", status: 500 };
      }
      //setting cache in redis
      const jsonString = JSON.stringify({ data });
      redis
        .set(htno.toUpperCase(), jsonString, "EX", 4 * 3600)
        .then(() => {
          console.log("Data has been set in the Redis cache");
        })
        .catch((error) => {
          console.error("error in setting up the cache", error);
        });

      return { data: data, status: 200 };
    })
    .catch((error) => {
      console.error("data fetching failed", error);
      return { data: "Internal Server Error", status: 500 };
    });

  //Returning
  return Response.json(response.data, { status: response.status });
}
