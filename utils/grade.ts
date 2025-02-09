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
