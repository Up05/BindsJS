# BindsJS
A **keyboard** shortcut library for javascript.


---

# Guide 

## Using the library

You can download the library from releases (middle right).  
Put it in your your projects folder and link it in your index.html file.  
```html
<script src="path/to/binds.js"></script>
```

## Creating binds

```js
myBind1 = new BindElt(myButtonElement); 
myBind2 = new BindFxn(myFunctionPointer);
```

## Giving your binds keys & key combinations

```js
myBind1.addKeyBind("a");
myBind2.addKeyCombination(Keys.Ctrl, "b");
```

## Customizing your binds

```js
myBind1.ignoreInputs(false);
myBind1.setName("name");
myBind2.preventDefault(true);
```

## Chaining bind functions

```js
new BindFxn(function(){ console.log("Yea!") })
  .setKeyBind("d")
  .setName("Yeah!")
  .setDescription("d for Yea!")
  .preventDefault(true)
  .logic(myFavoriteElement == document.activeElement);
```

<!-- ## Using the library
*Put this in your .html file's \<head\> or \<body\> tags (either should work, not sure).*

```html
<script src="https://raw.githubusercontent.com/Up05/BindsJS/main/binds.js"></script>
``` -->

#### TODO

- Make a website for this thingy. **Nevermind, i forgot a website needed css**, I can make a cli for this i guess, but github is GOOD ENOUGH!


