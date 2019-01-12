import * as vscode from "vscode";
const fs = require("fs");
import * as templates from "../templates";

export async function generateComponent(
  type: string,
  directory: string,
  componentName: string
) {
  let component, styles;

  component =
    type === "Pure"
      ? templates.createPureFunc(componentName)
      : templates.createClass(componentName);

  styles = templates.createSCSS(componentName);

  const newComponentDir = `${directory}/${componentName}`;

  // If directory doesn't exist make it.
  if (fs.existsSync(newComponentDir)) {
  }

  // Create directory
  await fs.mkdirSync(newComponentDir);

  // Create component index file.
  fs.writeFile(
    `${newComponentDir}/index.js`,
    component,
    "utf-8",
    (err: Error) => {
      if (err) {
        vscode.window.showInformationMessage("Error writing to file");
        console.log("Error writing to file", err);
      }
    }
  );

  // Create SCSS styles file.
  fs.writeFile(
    `${newComponentDir}/styles.scss`,
    styles,
    "utf-8",
    (err: Error) => {
      if (err) {
        vscode.window.showInformationMessage("Error writing to file");
        console.log("Error writing to file", err);
      }
    }
  );
}
