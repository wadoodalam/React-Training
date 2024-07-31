# React Questions

## What are package.json and package-lock.json?

 In a React project, package.json manages project metadata and dependencies. It specifies
the React version and other necessary libraries or tools, such as react-dom, react-router,
and testing libraries like jest. Apart from the standard fields, a React project's package.json
often includes scripts to start the development server, build the project for production, and run
tests.

Package-lock.json ensures consistent dependency versions for all team members working on
the React project. It locks down the exact versions of React and its dependencies, preventing
issues that might arise from updates. It contains a detailed tree of all installed packages,
including nested dependencies, with their exact versions.

## What’s the difference between npm and npx?

Npm is commonly used to install React and its dependencies. For example, npm install
react react-dom installs the core React library and React DOM for working with the browser.
Npx is often used to create new React projects without installing Create React App globally. For
example, npx create-react-app my-app sets up a new React project with a standard
structure and configuration.

## What is babel?

Babel is essential in React projects for transpiling modern JavaScript (ES6+), JSX syntax, and
TypeScript into compatible JavaScript that can run in older browsers. React code frequently
uses JSX, making the code more readable and easier to write. Babel transforms this JSX into
standard JavaScript, ensuring compatibility across different browsers. Typically configured with
presets like @babel/preset-react, Babel's setup is often managed automatically by Create
React App, allowing developers to start writing modern JavaScript and JSX without worrying
about the underlying configuration.

## What is webpack?

Webpack is crucial in React projects for bundling React components, JavaScript, CSS, images,
and other assets into optimized files, ensuring efficient loading in the browser. It manages the
complex dependency graph of a React application, allowing direct imports of modules and
assets into components. Using loaders, Webpack transforms various file types into modules the
browser can understand, while plugins optimize the output, manage assets, and inject scripts
into HTML files. Create React App provides a pre-configured Webpack setup with sensible
defaults, simplifying the initial setup process for developers and allowing customization for
advanced use cases.

## What is useState?

useState is a react hook that allows to add and manage state within functional components i.e allowing to set and update values that change over time like user inputs. There is a state variable initialized with a value and also a state functions to to set/update it. This setup allows to the components to keep and update its data whenever needed along with triggering re-rendering to show the changes.

## What is props drilling and state lifting?

`Props Drilling` is when props need to passed down through the tree/nested layer(top-to-bottom) from the root to the target nested child in tree via all the intermediaries. For example, in a component tree, if the the grand child(leaf node), needs a prop, the prop would need to passed through the parent node and the grandparent node(which is the root).

`state lifting` is when the state of a lower level component is is moved to a higher level component in the tree when there is a need for the child component to update the state of its parent or another sibling component, for example from left sub-tree to right subtree.

## What is the ‘key’ attribute?

`Key` attribute is used by react to uniquely identify elements in a list which allows react to update only the elements that need to be changed/updated without re-rendering the entire list.

## What is synthetic event?

A `synthetic event` is a cross-browser wrapper around the browser's native event which combines all the functionalities of various browsers into 1 API which ensures uniform event handling across various browsers. 

## What is virtual dom?

It is a representation of a real DOM(in sync with the real DOM) which is saved in the memory. When an update happens, react will generate a new version of the virtual DOM, and then compare it with the previous virtual DOM(using diffing algorithm). After the comparison, the final version is decided, react will update the real DOM wherever changes are required. 