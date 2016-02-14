# domFN

A very simple functional DOM builder kinda inspired by cycle.js DOM Driver and virtual-dom way.

## Usage

```javascript
// Using ES2015
import { el } from 'dom-fn';
// Or with CommonJS
var el = require('dom-fn').el;

// Give it a tag name,
// attributes (you can also use a CSS selector for ids and classes
// And an array of childrens (or a simple child string)
var element = el('div', '.someClass', [
	'Some ',
	el('a', { href: '/link' }, 'link'),
	' test',
]);
```

After that just run the `compile` method and you'll get a DOM node.

```javascript
var domNode = element.compile();
```

You can also give, as a children, a function that will receive as parameter the argument to `compile`.

```javascript
var element = el('div', '.someClass', function(arg) {
	if (arg.test > 10) {
		return 'The number is: ' + arg.test;
	}
	
	return 'The number is lower than 10';
});
```
