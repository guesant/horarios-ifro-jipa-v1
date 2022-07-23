import { extractGradesFromDocument } from "./extractGradesFromDocument";
import { getURLWithProxy } from "../../utils/getURLWithProxy";
import { parseDocument } from "../../utils/DOM/parseDocument";

const gradesUrl = process.env.NEXT_PUBLIC_GRADES_URL!;

export const fetchGrades = (useProxy = true) =>
  fetch(useProxy ? getURLWithProxy(gradesUrl) : gradesUrl)
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractGradesFromDocument);
