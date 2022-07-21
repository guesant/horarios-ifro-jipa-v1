import { extractGradesFromDocument } from "./extractGradesFromDocument";
import { getURLWithProxy } from "../../utils/getURLWithProxy";
import { parseDocument } from "../../utils/parseDocument";

const NEXT_PUBLIC_GRADES_URL = process.env.NEXT_PUBLIC_GRADES_URL!;

export const fetchGrades = () =>
  fetch(getURLWithProxy(NEXT_PUBLIC_GRADES_URL))
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractGradesFromDocument);

export const fetchGrades2 = () => Promise.resolve([]);
