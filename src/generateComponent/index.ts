import * as vscode from "vscode";
const fs = require("fs");
import * as templates from "../templates";

export async function generateComponent(
  type: string,
  directory: string,
  componentName: string
) {
  let component, styles;

  const forReactNative = vscode.workspace
    .getConfiguration("")
    .get("reactNativeComponents");

  if (forReactNative) {
    component =
      type === "Pure"
        ? templates.createRNPureFunc(componentName)
        : templates.createRNClass(componentName);
    styles = templates.createRNStyles(componentName);
  } else {
    component =
      type === "Pure"
        ? templates.createPureFunc(componentName)
        : templates.createClass(componentName);

    styles = templates.createSCSS(componentName);
  }

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

  // Create index.js
  const defaultIndexComponent = templates.createDefaultIndex(componentName);
  fs.writeFile(`${newComponentDir}/index.js`, defaultIndexComponent, "utf-8", (err) => {
      if (err) {
          vscode.window.showInformationMessage("Error writing to file");
          console.log("Error writing to file", err);
      }
  });

  // Create  styles file.
  let ext;
  if (forReactNative) {
    ext = "js";
  } else {
    const scssEnabled = vscode.workspace.getConfiguration("").get("scss");
    ext = scssEnabled ? "scss" : "css";
  }

  fs.writeFile(
    `${newComponentDir}/${componentName}.${ext}`,
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
