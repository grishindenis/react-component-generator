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
  return `
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
          <div className="${componentName}-container">
          </div>
        );
      }
    }
  
    export default ${componentName}
    `;
}

export function createSCSS(componentName: string) {
  return `
        .${componentName}-container {

        }
    `;
}
