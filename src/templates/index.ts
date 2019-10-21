export function upperCaseFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatCamelCase(str: string) {
    for (let index = 0; index < str.length; index++) {
        if (str[index] === "-") {
            str = str.slice(0, index) + str.slice(index + 1);
            --index;

            const nextIndex = index + 1;
            if (str[nextIndex] !== "-" && str[nextIndex] !== undefined) {
                str = str.substr(0, nextIndex) + str[nextIndex].toUpperCase() + str.substr(nextIndex + 1);
            }
        }
    }
    return upperCaseFirstLetter(str);
}

export function createPureFunc(componentName: string) {
  return `
  import React from 'react'
  import './styles.scss'


  const ${componentName} = ({}) => (
    <div></div>
  );

  export default ${componentName}
  `;
}

export function createClass(componentName: string) {
    return `import React, { Component } from 'react';

import './${componentName}.css';

export default class ${formatCamelCase(componentName)}
    extends Component
{
    state = {

    };

    render() {
        return (
            <div className="${componentName}">
            </div>
        );
    }
}
`;
}

export function createSCSS(componentName: string) {
    return `.${componentName} {

}
`;
}

export function createRNPureFunc(componentName: string) {
  return `
  import React from 'react'
  import { View } from 'react-native'
  import styles from './styles'


  const ${componentName} = ({}) => (
    <View style={styles.container}>

    </View>
  );

  export default ${componentName}
  `;
}

export function createRNClass(componentName: string) {
  return `
  import React from 'react'
  import { View } from 'react-native'
  import styles from './styles'

    class ${componentName} extends React.Component {
      constructor(props) {
        super(props);
        this.state = {

        };
      }

      render() {
        return (
          <View style={styles.container}>
          </View>
        );
      }
    }

    export default ${componentName}
    `;
}

export function createRNStyles(componentName: string) {
  return `
  import { StyleSheet } from 'react-native'

  export default StyleSheet.create({
    container: {

    }
  })
    `;
}

export function createDefaultIndex(componentName: string) {
    return `import ${formatCamelCase(componentName)} from './${componentName}.js';

export default ${formatCamelCase(componentName)};
`;
}
