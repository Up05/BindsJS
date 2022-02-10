
### addKeyBind
  - Bind addKeyBind(String key)
  - adds a single key keybind. One of the main commands. *You can also use this with Keys object/estringation/enum*.
```js
bind.addKeyBind(Keys.numpad(5))
    .addKeyBind(Keys.Ctrl)
    .addKeyBind("s");
```
<br>

### addKeyCombination
  - Bind addKeyCombination(...String key)
  - adds a multiple*(or single, but don't do that!)* key combination. One of the main commands. *You can also use this with Keys object/estringation/enum*.
```js
bind.addKeyCombination(Keys.Ctrl, Keys.numpad(5), "a")
    .addKeyCombination(Keys.Meta, "e") 
```
---
<br>

### addLogic
  - Bind addLogic(boolean boolExp)
  - Add a boolean expression that'll be checked right before your bind is executed.
```js
bind.addLogic(true == true);
```
---
<br>

### setName
  - Bind setName(String name)
  - Set the name of a bind. *Mostly aesthetic & purely optional.*
```js
bind.setName("My amazing magnificient bind");
```
<br>

### getName
  - String getName()
  - Get's the name of a bind.
```js
let myAmazingBindsName = bind.getName();
```
<br>

### setDescription
  - Bind setDescription(String description)
  - Set the description of a bind. *Aesthetic & purely optional.*
```js
bind.setDescription("My amazing magnificient bind's description");
```
<br>

### getDescription
  - String getDescription()
  - Get's the description of a bind.
```js
let myAmazingBindsDesc = bind.getDescription();
```
---
<br>

### forceCombinationOrder
  - Bind forceCombinationOrder(boolean bool)
  - Only useful if you have `addKeyCombination()`. forces the user to press the keys in the same order as you put them in with `addKeyCombination()`. Mainly for optimizing.
```js
bind.addKeyCombination("a", "c", "b")
    .forceCombinationOrder(true); // now the keys have to be pressed like: a -> c -> b,    a -> b -> c won't work!
```
<br>

### preventDefault
  - Bind preventDefault(boolean bool)
  - Prevents the default action for that keybind, so for example ctrl + f won't open the search bar ...
```js
bind.preventDefault(true)l
```
<br>

### ignoreInputs
  - Bind ignoreInputs(boolean bool)
  - Ignores if the active element is an <input> or <textarea>, might be annoying if a user is typing.
```js
bind.ignoreInputs(true);  
```
---
<br>

### setToFocus
  - BindElt setToFocus(boolean bool)
  - Cocusses the bind's element, once the bind has been activated.
```js
bind.setToFocus(true);
```
<br>
  
### setToClick
  - BindElt setToClick(boolean bool)
  - Clicks the bind's element, once the bind has been activated.
```js
bind.setToClick(false);
```  
<br>
  
### checkIfHidden
  - BindElt checkIfHidden(boolean bool)
  - Checks if the bind's element is hidden, `visibility: hidden;`
```js
bind.checkIfHidden(false);
```
