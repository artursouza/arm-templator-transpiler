import { ProgramAst } from "./ast";
import { inspect } from "util";

export function printProgram(program: ProgramAst) {
  console.log(inspect(program, false, 30));
}