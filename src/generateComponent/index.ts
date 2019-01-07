const fs = require("fs");
import * as templates from "../templates";

export async function generateComponent(
  type: string,
  directory: string,
  componentName: string
) {
  const component =
    type === "Pure"
      ? templates.createPureFunc(componentName)
      : templates.createClass(componentName);

  const scss = templates.createSCSS(componentName);

  const newComponentDir = `${directory}/${componentName}`;

  // If directory doesn't exist make it.
  if (!fs.existsSync(newComponentDir)) {
    await fs.mkdirSync(newComponentDir);
  }

  // Create component index file.
  fs.writeFile(
    `${newComponentDir}/index.js`,
    component,
    "utf-8",
    (err: Error) => {
      if (err) {
        console.log("Error clearing and added header to file", err);
      }
    }
  );

  // Create SCSS styles file.
  fs.writeFile(
    `${newComponentDir}/styles.scss`,
    scss,
    "utf-8",
    (err: Error) => {
      if (err) {
        console.log("Error clearing and added header to file", err);
      }
    }
  );
}
