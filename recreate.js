const React = (function () {
  let hooks = [];
  let idx = 0;
  function useState(init_Val) {
    const state = hooks[idx] || init_Val;
    let _id = idx;
    let setState = (new_Val) => {
      hooks[_id] = new_Val;
    };
    idx++;
    return [state, setState];
  }

  function useEffect(cb, depArray) {
    let oldDepArray = hooks[idx];
    let hasChanged = true;
    if (oldDepArray) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDepArray[i]));
    }
    if (hasChanged) cb();
    hooks[idx] = depArray;
    idx++;
  }

  function render(Component) {
    idx = 0;
    let C = Component();
    C.render();
    console.log(hooks);
    return C;
  }
  return { useState, render, useEffect };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("jsFoo");
  }, [count]);
  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word)
  };
}
var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("pear");
var App = React.render(Component);
