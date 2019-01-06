const fs = require("fs");

export async function generateComponent(
  type: string,
  directory: string,
  componentName: string
) {
  const component =
    type === "Pure"
      ? `
  import React from 'react'
  import './styles.scss'


  const ${componentName} = ({}) => (
    <div></div>
  );

  export default ${componentName};
  `
      : `
  import React from 'react'
  import './styles.scss'

  class ${componentName} extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      return (
        <div>
        </div>
      );
    }
  }

  export default ${componentName}
  `;

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
  fs.writeFile(`${newComponentDir}/styles.scss`, "", "utf-8", (err: Error) => {
    if (err) {
      console.log("Error clearing and added header to file", err);
    }
  });
}
