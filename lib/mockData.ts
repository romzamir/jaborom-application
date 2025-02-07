export const mockMembers = [
  {
    id: 1,
    firstName: "אבי",
    lastName: "כהן",
    city: "תל אביב",
    birthDate: "1990-05-15",
    joinDate: "2020-01-01",
    grade: 10,
    address: {
      street: "הרצל",
      houseNumber: "10",
    },
    phones: [
      { title: "נייד", number: "0501234567" },
      { title: "בית", number: "031234567" },
    ],
    hobbies: ["כדורגל", "קריאה"],
  },
  {
    id: 2,
    firstName: "שרה",
    lastName: "לוי",
    city: "ירושלים",
    birthDate: "1988-11-20",
    joinDate: "2019-03-15",
    grade: 11,
    address: {
      street: "יפו",
      houseNumber: "25",
    },
    phones: [{ title: "נייד", number: "0527654321" }],
    hobbies: ["ציור", "מוזיקה"],
  },
  {
    id: 3,
    firstName: "יוסי",
    lastName: "גולדברג",
    city: "חיפה",
    birthDate: "1995-03-10",
    joinDate: "2022-05-20",
    grade: 12,
    address: {
      street: "המלך",
      houseNumber: "30",
    },
    phones: [{ title: "נייד", number: "0541112222" }],
    hobbies: ["טניס", "קולנוע"],
  },
  {
    id: 4,
    firstName: "רחל",
    lastName: "מזרחי",
    city: "באר שבע",
    birthDate: "1985-07-25",
    joinDate: "2018-11-10",
    grade: 8,
    address: {
      street: "הנגב",
      houseNumber: "15",
    },
    phones: [{ title: "בית", number: "086789012" }],
    hobbies: ["ריקוד", "בישול"],
  },
  {
    id: 5,
    firstName: "דוד",
    lastName: "פרץ",
    city: "אשדוד",
    birthDate: "1992-01-18",
    joinDate: "2021-09-05",
    grade: 9,
    address: {
      street: "הים",
      houseNumber: "5",
    },
    phones: [
      { title: "נייד", number: "0539876543" },
      { title: "בית", number: "087654321" },
    ],
    hobbies: ["שחייה", "טיפוס הרים"],
  },
  {
    id: 6,
    firstName: "מיכל",
    lastName: "אברהמי",
    city: "נתניה",
    birthDate: "1989-09-02",
    joinDate: "2020-06-22",
    grade: 7,
    address: {
      street: "הים",
      houseNumber: "12",
    },
    phones: [{ title: "נייד", number: "0585554444" }],
    hobbies: ["קריאה", "יוגה"],
  },
  {
    id: 7,
    firstName: "יעקב",
    lastName: "פרידמן",
    city: "פתח תקווה",
    birthDate: "1997-04-12",
    joinDate: "2023-02-18",
    grade: 11,
    address: {
      street: "הירקון",
      houseNumber: "20",
    },
    phones: [{ title: "בית", number: "035556666" }],
    hobbies: ["אופניים", "צילום"],
  },
  {
    id: 8,
    firstName: "חנה",
    lastName: "רוזנברג",
    city: "רמת גן",
    birthDate: "1986-12-08",
    joinDate: "2017-08-01",
    grade: 6,
    address: {
      street: "הבימה",
      houseNumber: "7",
    },
    phones: [
      { title: "נייד", number: "0523332222" },
      { title: "בית", number: "037778888" },
    ],
    hobbies: ["ריקוד", "שירה"],
  },
  {
    id: 9,
    firstName: "משה",
    lastName: "שטרן",
    city: "הרצליה",
    birthDate: "1991-06-28",
    joinDate: "2021-03-10",
    grade: 10,
    address: {
      street: "הים",
      houseNumber: "8",
    },
    phones: [{ title: "נייד", number: "0508887777" }],
    hobbies: ["טניס", "גלישה"],
  },
  {
    id: 10,
    firstName: "אסתר",
    lastName: "ויס",
    city: "רחובות",
    birthDate: "1987-08-16",
    joinDate: "2019-07-28",
    grade: 5,
    address: {
      street: "הרצל",
      houseNumber: "18",
    },
    phones: [{ title: "בית", number: "089990000" }],
    hobbies: ["קריאה", "ציור"],
  },
];

export const israeliGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const gradeToHebrewName = (grade: number): string => {
  const hebrewGrades = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "יא",
    "יב",
  ];
  return hebrewGrades[grade - 1] || "";
};

export const hebrewNameToGrade = (hebrewName: string): number => {
  const hebrewGrades = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "יא",
    "יב",
  ];
  return hebrewGrades.indexOf(hebrewName) + 1;
};
