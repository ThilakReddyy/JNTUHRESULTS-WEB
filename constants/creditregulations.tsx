interface CreditRegulation {
  Regular: {
    [key: string]: {
      Required: string;
      Total: string;
    };
  };
  Lateral: {
    [key: string]: {
      Required: string;
      Total: string;
    };
  };
}

interface creditregulationDetailsProps {
  [key: string]: string | creditregulationDetailsProps | CreditRegulation;
}

export const creditRegulationDetails: creditregulationDetailsProps = {
  btech: {
    R18: {
      Regular: {
        "1": {
          Required: "18",
          Total: "37",
        },
        "2": {
          Required: "47",
          Total: "79",
        },
        "3": {
          Required: "73",
          Total: "123",
        },
        "4": {
          Required: "160",
          Total: "160",
        },
      },
      Lateral: {
        "2": {
          Required: "25",
          Total: "42",
        },
        "3": {
          Required: "51",
          Total: "86",
        },
        "4": {
          Required: "123",
          Total: "123",
        },
      },
    },
    R22: {
      Regular: {
        "1": {
          Required: "20",
          Total: "40",
        },
        "2": {
          Required: "48",
          Total: "80",
        },
        "3": {
          Required: "72",
          Total: "120",
        },
        "4": {
          Required: "160",
          Total: "160",
        },
      },
      Lateral: {
        "2": {
          Required: "24",
          Total: "40",
        },
        "3": {
          Required: "48",
          Total: "80",
        },
        "4": {
          Required: "120",
          Total: "120",
        },
      },
    },
  },
};
