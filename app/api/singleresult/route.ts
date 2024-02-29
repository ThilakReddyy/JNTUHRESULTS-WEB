import axios from "axios";
import cheerio from "cheerio";

function scrapeResults(response: any) {
  const ret_response: any = {};

  const $ = cheerio.load(response);
  const details = $("table").eq(0).find("tr");
  const htno = details.eq(0).find("td").eq(1).text();
  const name = details.eq(0).find("td").eq(3).text();
  const fatherName = details.eq(1).find("td").eq(1).text();
  const collegeCode = details.eq(1).find("td").eq(3).text();
  ret_response["Details"] = {};
  ret_response["Details"]["Name"] = name;
  ret_response["Details"]["Roll_No"] = htno;
  ret_response["Details"]["COLLEGE_CODE"] = collegeCode;
  ret_response["Details"]["FATHER_NAME"] = fatherName;

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
  ret_response["Results"] = {};
  results.each((_, resultSubject) => {
    const subjectName = $(resultSubject).find("td").eq(subjectNameIndex).text();
    const subjectCode = $(resultSubject).find("td").eq(subjectCodeIndex).text();
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
    ret_response["Results"][subjectCode] = {
      subject_code: subjectCode,
      subject_name: subjectName,
      subject_internal: subjectInternalMarks,
      subject_external: subjectExternalMarks,
      subject_total: subjectTotalMarks,
      subject_grade: subjectGrade,
      subject_credits: subjectCredits,
    };
  });
  return ret_response;
}
async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    return await scrapeResults(response.data);
  } catch (error: any) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const htno = searchParams.get("htno");
  if (htno === null || query === null) {
    return Response.json(
      {
        message: "Please check the hallticket and query and try again",
      },
      { status: 500 },
    );
  }

  const payloadData = `?${query}&grad=null&result=null&htno=${htno.toUpperCase()}`;
  const urls: string[] = [
    "http://202.63.105.184/resultAction",
    "http://results.jntuh.ac.in/resultAction",
  ];
  for (const url of urls) {
    try {
      const response = await fetchData(url + payloadData);
      if (response["Results"]) {
        if (Object.keys(response["Results"]).length == 0) {
          return Response.json("Internal Server Error", { status: 500 });
        }
      }
      return Response.json(response, { status: 200 });
    } catch (error: any) {
      console.error(error.message);
    }
  }
  return Response.json("Internal Server Error", { status: 500 });
}
