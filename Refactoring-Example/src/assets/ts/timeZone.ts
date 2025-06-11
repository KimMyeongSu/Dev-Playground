interface TimeOption {
  value: string;
  label: string;
}

const timeZone: TimeOption[] = [
  { value: "", label: "시간선택" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
];
// 수업 기간
const MONTH_1: number = 1;
const MONTH_3: number = 3;
const MONTH_6: number = 6;
const MONTH_12: number = 12;

//수업 횟수
const WEEK2: number = 2;
const WEEK3: number = 3;
const WEEK5: number = 5;

//수업 분수
const MINUTE_10: number = 10;
const MINUTE_15: number = 15;
const MINUTE_20: number = 20;
const MINUTE_30: number = 30;

//소그룹 스케쥴
const GROUP_SCHEDULE: object[] = [
  { programCode: "academy", name: "월수금 17:30 - 18:50" },
  { programCode: "academy", name: "월수금 19:30 - 20:50" },
  { programCode: "academy", name: "화목 17:00 - 19:15" },
  { programCode: "academy", name: "화목 19:30 - 21:45" },
];

export {
  timeZone,
  MONTH_1,
  MONTH_3,
  MONTH_6,
  MONTH_12,
  WEEK2,
  WEEK3,
  WEEK5,
  MINUTE_10,
  MINUTE_15,
  MINUTE_20,
  MINUTE_30,
  GROUP_SCHEDULE,
};
