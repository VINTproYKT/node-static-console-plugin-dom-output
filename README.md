# static-console-plugin-dom-output
Plugin for printing your [`static-console`](https://www.npmjs.com/package/static-console) messages to DOM.

[![Gitter](https://badges.gitter.im/VINTproYKT/node-static-console.svg)](https://gitter.im/VINTproYKT/node-static-console?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Install
```
$ npm install --save static-console-plugin-dom-output
```

## API
### `DomOutput`
```javascript
const c = require('static-console');
const DomOutput = require('static-console-plugin-dom-output');

document.addEventListener('readystatechange', () => {
    if (document.readyState == 'complete') {
        c.outputs.myLog = new DomOutput({
            rootNode: document.querySelector('main')
        });
        c.routers.std.tasks.set(c.outputs.myLog, c.models.raw);// We add task for StdRouter bundled with StaticConsole to convert messages with RawModel

        c.logt('info', `Starting log`);
    }
});
```
Test in any browser environment bundled with Node.js.

This code creates instance of DomOutput right after DOM is complete. `c.outputs.myLog` is now printing log to single element with tag name `main`.

Element `main` must contain something like `<p class="message info">Starting log</p>` as seen in inspector.

On line 9 we have added task to `c.routers.std` to convert messages with `c.models.raw`, and all of it is already bundled with `StaticConsole`.

By default `static-console` also has task to print with `c.outputs.std`. So you will have `Starting log` in your standard output too.

### `print(model)`
`model` is the object that should have descriptive properties:
 - `type` - message type name. If it is falsy, then `DomOutput.regularType` will be used to mark message as regular.
 - `data` - string with message. It could be converted with RawModel.

### *`rootNode`*
This option is required to print something. It should be that element, that is described as a "log".

### *`messageTagName`*
Tag name that is used to create message node in DOM. Default: `'p'`;

### *`messageAttributes`*
Object of attributes' names as keys and their values. String values will be parsed in such way:

 - contents in square brackets gonna be removed if message type is falsy, brackets themselves are removed,
 - `$T` will be replaced with message type name.

Default: `{ class: 'message[ $T]' }`.

### *`regularType`*
Type name that is used as fallback for falsy type (i.e. `null` value). Default: `'regular'`.