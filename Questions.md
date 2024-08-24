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

useState is a react hook that allows to add and manage state within functional components i.e allowing to set and update values that change over time like user inputs. There is a state variable initialized with a value and also a state functions to to set/update it. This setup allows to the components to keep and update its data whenever needed along with triggering re-rendering to show the changes. It returns a variable with the current state value(may or maynot be initial value) and a function to update to the state value.

## What is props drilling and state lifting?

`Props Drilling` is when props need to passed down through the tree/nested layer(top-to-bottom) from the root to the target nested child in tree via all the intermediaries. For example, in a component tree, if the the grand child(leaf node), needs a prop, the prop would need to passed through the parent node and the grandparent node(which is the root).

`state lifting` is when the state of a lower level component is is moved to a higher level component in the tree when there is a need for the child component to update the state(or share state) of its parent or another sibling component, for example from left sub-tree to right subtree.

## What is the ‘key’ attribute?

`Key` attribute is used by react to uniquely identify elements in a list which allows react to update only the elements that need to be changed/updated without re-rendering the entire list.

## What is synthetic event?

A `synthetic event` is a cross-browser wrapper around the browser's native event which combines all the functionalities of various browsers into 1 API which ensures uniform event handling across various browsers. 

## What is virtual dom?

It is a representation of a real DOM(in sync with the real DOM) which is saved in the memory. When an update happens, react will generate a new version of the virtual DOM, and then compare it with the previous virtual DOM(using diffing algorithm). After the comparison, the final version is decided, react will update the real DOM wherever changes are required. 

## What is useEffect? What are the different behaviors of useEffect? What is a dependency array?
`useEffect` is a react hook which allows you to perform 'side effects' such as fetching data form API. The behaviors of `useEffect` include:
* It runs after every render
* It can run only once, after the initial render, if the dependency array is empty. 
* It can run after the dependency has changed, assuming a dependency is specified.
* It can have a clean-up function that runs during `unmounting`

A dependency array is a second argument that is passed in `useEffect` that triggers a re-run after if there is any change in it. It specifies which values the `useEffect` depends on after the initial re-render.  

## What is useRef and when do you want to use it?
`useRef` is a react hook which allows the the corresponding value to persist across renders, without causing any additional re-renders. It is used when you have to access and interact with the DOM directly like integrating a third-party library that require direct DOM manipulation. It is also used to store mutable values such as timers or previous state values without triggering a re-render.

## How to reuse hook logic in React?

Hook logic can be reused in react by creating custom hooks which you can create allowing for state management or encapsulation. Instead of writing the logic again and again, it allows for reusability wherever it is required in your app.

## What are some differences between class and functional components?

## Explain what lifecycle is in a simple way. How do you manage it in class and functional components?

## Explain immutability in one sentence.

## How do you decide when to split a component into sub-components?

As a general rule of thumb, I decide to break up the code into sub-components if the code is being re-used more than 3 times
(Rule of 3). Additionally, if the code is becoming more complex, or is handling multiple number of logics, i prefer to split it into sub-components so that each component is dealing with a singular logic, which helps with code readability and maintenance.

## What is the difference between state and props?

`Props` are short form of properties which mean

| State  | Props |
| ------------- | ------------- |
|Used to store the data needed by the current page/component |Used to pass data and event handlers down to child components|
|Represents the current condition/value of a component| Provides data to the component/child that need to be displayed/rendered|
|It is mutable and can be updated using `useState` hook| They are immutable(snapshots) so that they are not editable by the child component(s). It also helps react to do fast reference checks|

## How to trigger rerender in a component?

Re-renders can be triggered when:
* When `state` changes or updates, it triggers re-render
* When `props` are updated by the parent component causing all the children to re-render as well
* Whenever `context` values are changed (via useContext for example), it triggers a re-render
* `ForceUpdate` method can forcefully cause a re-render(not recommend).
* When dependencies are changed is hooks like `useEffect`, a re-render is triggered.

## Why do you like react over other front-end libraries and frameworks?
* The main reason why I prefer react is because of the speed and efficency it offers due to the concept of virtual DOM which allows for better performance.
* Since react reliant on components(functional), it means that scaling, readability, and encapsulation of logic easier plus encouraging modular and reuseable code.
* The way rendering/re-rendering happens automatically when state(s) are changed.
* It also allows the freedom to create custom components which can be very handy in some projects.
* It also has some great documentation available.

## What’s the difference between controlled components and uncontrolled components?

A controlled component is when React itself manages the state of the elements making react the single source of truth. An `onChange` handler is used to update the state via react code. They are form elements(like input, select) managed by the react state. They provide ease of working with data and gives greater control over data handling.

An uncontrolled component is when the input element manages its own state by the DOM itself. We can use the `ref` attribute to create a reference to the DOM itself for state management(more like traditional HTML).

## How to prevent components from unnecessary rerendering?
* `React.memo`(HOC) can be used to restrict re-rendering to props being changed(new or update by the parent). You can wrap a component in React.memo which will memoize the result and only trigger re-render when it is changed.
* `useMemo` can be used to store the result of a calculation and only re-render when the dependency changes.
* `useCallback` can be used to memoize the function references and only re-render when it changes.
* `PureComponent` and `ShouldComponentUpdate` can be used in class-components to prevent re-render.
* We can split components into smaller sub-components which helps react to re-render only the components that need update.

## Why are props needed to be immutable?

Props are needed to be immutable to ensure one-way data flow from the parents to children, restricting the children to change the change props which can result in change to the change to the parent component. 

## Explain the Virtual DOM and how React uses it to improve performance.

Virtual DOM is a representation of a real DOM(in sync with the real DOM) which is saved in the memory. When an update happens, react will generate a new version of the virtual DOM, and then compare it with the previous virtual DOM(using diffing algorithm). After the comparison, the final version is decided, react will update the real DOM wherever changes are required. This minimization of interaction with the actual DOM improves the performance.

## Can you explain the useMemo and useCallback hooks and provide examples of when you might use them?

`useMemo` is used to memoize/store the result of calculation which prevents expensive calculations being done every time there is a re-render(unless the dependency changes). An example would be if you want to find the items with even-number id so that there is no re-calculation of this at every re-render unless the "items change".

`useCallback` is similar to a `useMemo` but for caching a function instead of value. For example, when creating a deleteHandler, without Callback, it will be re-created every time on re-render. But with memoization, it will only be re-created when "items change"

## Explain the concept of Higher-Order Components (HOCs) and provide an example use case?

HOCs are functions react to which allows re-using of a components logic with different props by wrapping around a component and returning the outer component. An example use case could be creating an HOC that handlers user-authentication logic for allowing only authenticated users to access certain components. 

```javascript
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      const isAuthenticated = /* logic to check if user is authenticated */;
      
      if (!isAuthenticated) {
        return <Redirect to="/login" />;
      }
      
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;

import React from 'react';
import withAuth from './withAuth';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to your Dashboard!</h1>
        {/* Dashboard content */}
      </div>
    );
  }
}

export default withAuth(Dashboard);
```

## Discuss the differences between React's class components and functional components. Which one do you prefer and why?

* Syntax wise, both are different. Example(setState vs this.state)
* functional components are do not require any extensions and are similar to normal JS functions. Class components require `Component` to be extended.
* Functional components do not require a render method that returns JSX unlike class components.
* Class components allows you to use lifecycle methods like `ComponentDidMount` within the class, unlike functional components.

I personally prefer functional components as they allow for better modularity and readability of code for me. Also, I find the functional components more intuitive to write as compared to class components. Lastly, this is the modern way of React, hence, there is incentive to do it due to react support(via updated documentation for example).

## How do you ensure your code is maintainable and scalable?

* Code is modular and each component handles with one specific logic.
* If the code is being re-used more than 3 times, I seperate it for better useability
* Ensuring proper naming conventions
* Clear commenting to highlight the logic
* Create various files for different logics/components to ensure that the code is not messy, hence readable and scalable.


## What are middleware functions in Express.js, and how do they work?

## What is JWT, and how does it work?

## How do you securely store JWT on the client-side?

## How does token expiration work in JWT?