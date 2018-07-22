const user = { name: 'test' }

import { createElement, Fragment } from "./react";

import { render } from "./react-dom";

const App = () => {
  return (
    <div>{user.name}</div>
  )
}

// render(<><span className="test" id="test" onClick={() => {alert(123)}}>{user.name}</span>1234</>, window.root);
render(<App />, window.root);

// const App = () => {
//   return (
//     <>
//       <div onClick={()=> {alert(1)}} class="profile">
//           <span>{user.name}</span>
//       </div>
//     </>
//   );
// }

