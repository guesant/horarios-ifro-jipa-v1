import { extractGradesFromDocument } from "./extractGradesFromDocument";
import { getURLWithProxy } from "../../utils/getURLWithProxy";
import { parseDocument } from "../../utils/DOM/parseDocument";

const gradesUrl = process.env.NEXT_PUBLIC_GRADES_URL!;

export const fetchGrades = () =>
  fetch(getURLWithProxy(gradesUrl))
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractGradesFromDocument);
