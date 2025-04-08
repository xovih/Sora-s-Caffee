const LIMIT_LIST = [
  { label: "8", value: "8" },
  { label: "12", value: "12" },
  { label: "16", value: "16" },
];

const STATUS_LIST = [
  { label: "All Status", value: "" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Processing", value: "PROCESSING" },
];

const LIMIT_DEFAULT = LIMIT_LIST[0].value;

const PAGE_DEFAULT = 1;

const SEACRH_DELAY = 500;

export { LIMIT_LIST, LIMIT_DEFAULT, PAGE_DEFAULT, SEACRH_DELAY, STATUS_LIST };
