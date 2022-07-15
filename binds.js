
/**
 * Most of the keys in: [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values).  
 * A lot of these also match their string form: {Alt: "Alt", ScollLock: "ScrollLock" ... }.  
 * This object is also frozen, so be sure to unfreeze it if you'd like to add more!  
 */
 const Keys = {
    Alt: "Alt",
    AltGr: "AltGraph",
    CapsLock: "CapsLock",
    Ctrl: "Control",
    Fn: "Fn",
    FnLock: "FnLock",
    Hyper: "Hyper",
    /** 
     * Windows key (windows), or command key ⌘ (macos). 
     * @Alt WindowsKey, MacOSCommand
     */
    Meta: "Meta",
    WindowsKey: "Meta",
    MacOSCommand: "Meta",
    NumLock: "NumLock",
    ScrollLock: "ScrollLock",
    Shift: "Shift",

    Super: "Super",
    Symbol: "Symbol",
    SymbolLock: "SymbolLock",

    Enter: "Enter",
    Tab: "Tab",
    Space: " ",

    /** @Alt ArrowDown */    Down: "ArrowDown",
    /** @Alt Down */         ArrowDown: "ArrowDown",
    /** @Alt ArrowUp */      Up: "ArrowUp",
    /** @Alt Up */           ArrowUp: "ArrowUp",
    /** @Alt ArrowLeft */    Left: "ArrowLeft",
    /** @Alt Left */         ArrowLeft: "ArrowLeft",
    /** @Alt ArrowRight */   Right: "ArrowRight",
    /** @Alt Right */        ArrowRight: "ArrowRight",
    End: "End",
    Home: "Home",
    PageDown: "PageDown",
    PageUp: "PageUp",

    BackSpace: "BackSpace",
    Clear: "Clear",
    Copy: "Copy",
    /** Cursor Select Key. */
    CrSel: "Crsel",
    Cut: "Cut",
    Delete: "Delete",
    /** Erase to the End Of Field. */
    EraseEof: "eraseEof",
    /** Probably launches MS excel, but with typos */
    ExSel: "ExSel",
    Insert: "Insert",
    Paste: "Paste",
    Redo: "Redo",
    Undo: "Undo",

    UI_Accept: "Accept",
    UI_Again: "Again",
    /** Attention */
    UI_Attn: "Attn",
    UI_Cancel: "Cancel",
    UI_ContextMenu: "ContextMenu",
    UI_Escape: "Escape",
    UI_Execute: "Execute",
    UI_Find: "Find",
    UI_Finish: "Finish",
    UI_Help: "Help",
    UI_Pause: "Pause",
    UI_Play: "Play",
    UI_Props: "Props",
    UI_Select: "Select",
    UI_ZoomIn: "ZoomIn",
    UI_ZoomOut: "ZoomOut",

    functionKey: number => "F" + number,
    Soft1: "Soft1",
    Soft2: "Soft2",
    Soft3: "Soft3",
    Soft4: "Soft4",

    BrowserBack: "BrowserBack",
    BrowserFavorites: "BrowserFavorites",
    BrowserForward: "BrowserForward",
    BrowserHome: "BrowserHome",
    BrowserRefresh: "BrowserRefresh",
    BrowserSearch: "BrowserSearch",
    BrowserStop: "BrowserStop",

    Decimal: "Deciman",
    Key11: "Key11",
    Key12: "Key12",
    Multiply: "Multiply",
    Add: "Add",
    Clear: "Clear",
    Divide: "Divide",
    Subtract: "Subtract",
    Separator: "Seperator",
    numpad: number => "" + number
} // more keys & what I used: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

if(navigator.userAgent.indexOf("Firefox" !== -1)) Keys.Meta = "OS"
Object.freeze(Keys)

/**
 * Manages binds, currently held keys & can output all key combinations & binds.
 */ 
class BindManager {
    /** @var {Array} binds - all currently created binds. */
    static binds = []
    /** @var {Array} keys - all currently pressed keys. */
    static keys = []

    /**
     * Outputs an array of objects with name, description, combinations & keys properties. useful with `console.table()`
     * @return {Array}
     * ```
     * [
     *   {
     *     name: "name",
     *     description: "description",
     *     combinations: [["Control", "a"]],
     *     keys: ["b", "f", "OS"]
     *   }
     * ]
     * ```
     */
    static getAllKeyCombinations(){
        let o = []
        for(const bind of BindManager.binds){
            o.push({
                name: bind.name, 
                description: bind.description, 
                combinations: bind.keyCombos, 
                keys: bind.keyBinds
            })
        }
        return o;
    }
}

{
/**
 * no no!
 * @param {BindParent} bind - you won't need this!
 * @param {KeyboardEvent} e - no! stop looking at this!
 */
function __Binds_execute(bind, e){
            
    if(bind instanceof BindElt){
        
        if(bind.elt.visibility == "hidden" && bind.checkHidden)
            return ;
        if(bind.select)
            bind.elt.focus();
        if(bind.use)
            bind.elt.click();

    } else if(bind instanceof BindFxn){
        bind.fxn()
    }

    if(bind._preventDefault) e.preventDefault(true)

}

document.addEventListener('keyup', function (e){
    if(BindManager.keys.indexOf(e.key) == -1) return;
    BindManager.keys[BindManager.keys.indexOf(e.key)] = BindManager.keys[BindManager.keys.length - 1]
    BindManager.keys.pop()

}) // I still don't really like this... Seems like a performance sap.

document.addEventListener('keydown', function(e){ //                   onkeydown
    if(!BindManager.keys.includes(e.key)) BindManager.keys.push(e.key)

    for(const bind of BindManager.binds){
        const ae = document.activeElement.tagName.toLowerCase();
        if((ae == "textarea" || ae == "input" || document.activeElement.getAttribute("contenteditable")) && !bind._ignoreInputs) continue
        // sometimes... you just wish you were coding in byte code... because, some hells, are indeed worse, than others...
        // if(bind.logic && !bind.logic.every((val) => val)) continue;

        if(bind.keyCombos.length != 0)
        for(let keyCombo of bind.keyCombos){
            if(bind._forceCombinationOrder){
                if(BindManager.keys.toString() == keyCombo.toString())    __Binds_execute(bind, e); // i don't like this at all!
            } else if(keyCombo.every((val) => BindManager.keys.toString().includes(val)))     __Binds_execute(bind, e);
        }

        for(let keyBind of bind.keyBinds)
            if(keyBind == e.key || keyBind.toUpperCase() == e.key.toUpperCase())    __Binds_execute(bind, e);
    }
}) // onkeydown
}

/**
 * Parent class for binds, unless you'd like to create binds of your own,
 * you won't need this.
 * 
*/
class BindParent {

    constructor(){
        /** Array for key binds in a certain bind. @Type {String}*/
        this.keyBinds  = [];
        /** Array for key bind combinations in a certain bind. @Type {Array @Type {String}}*/
        this.keyCombos = [];
        /** Array for bool expressions in a certain bind. @Type {Boolean} @deprecated*/
        this.logic = []

        this.name = "unnamed"
        this.description = ""

        /** @private */
        this._forceCombinationOrder = false;
        /** @private */
        this._preventDefault = false;
        /** @private */
        this._ignoreInputs = false;

        BindManager.binds.push(this)
    }
    /** 
     * Add a boolean expression that is checked before the bind is executed.
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.addLogic(activeElement !== 'button')
     * @private
     * @deprecated
    */
    addLogic(boolean){
        this.logic.push(boolean)
        return this;
    }
    /** 
     * Give your bind a name, this is optional & aesthetic.
     * @param {String} name
     * @return {this}
     * @example myBind.setName("My amazing bind or smth")
    */
    setName(name){
        this.name = name;
        return this;
    }
    getName(){ return this.name; }
    /** 
     * Give your bind a description, this is optional & purely aesthetic.
     * @param {String} description
     * @return {this}
     * @example myBind.setDescription("For toggling the background color")
    */
    setDescription(description){
        this.description = description;
        return this;
    }
    getDescription(){ return this.description; }
    /** 
     * For adding single key binds. ***Letters here are case-sensitive***
     * @param {String} name - you can also use Keys.\<key\> here
     * @return {this}
     * @example myBind.addKeyBind("a");
    */
    addKeyBind(key){
        this.keyBinds.push(key);
        return this;
    }
    /** 
     * For adding multiple key keybinds. ***Letters here are case-sensitive***
     * @param {...String} key
     * @return {this}
     * @example myBind.addKeyCombination(Keys.Ctrl, "a", "d");
     */
    addKeyCombination(key){
        this.keyCombos.push(Object.values(arguments));
        return this;
    }
    /** 
     * Forces letters to be used in the order you gave them to this function, this is mainly an optimization.
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.addKeyCombination("a", "c", "b").forceCombinationOrder(true); // false by default
     * // won't work if the user presses a -> b -> c, or b -> c -> a.
    */
    forceCombinationOrder(boolean){
        this._forceCombinationOrder = boolean;
        return this;
    }
    /** 
     * Prevents the default function the key bind would do, and overwrites it with yours, for example ctrl + f won't open the search bar.
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.preventDefault(true) // false by default
    */
    preventDefault(boolean){
        this._preventDefault = boolean
        return this;
    }
    /** 
     * Ignores any of your binds, if the `document.activeElement` is: an `<input>`, or a `<textarea>`.
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.ignoreInputs(true) // false by default
    */
    ignoreInputs(boolean){
        this._ignoreInputs = boolean
        return this;
    }
}


/**
 * BindElement is a class for binding HTMLElements to a key bind or combination.
 * @Example
 * ```
 * let bind1 = new(myButton)
 *     .addKeyBind("a")
 *     .addKeyCombination(Keys.Ctrl, "b")
 *     .preventDefault(true)
 *     .setName("My amazing key bind")
 *     .setDescription("It's cool!");
 * ```
 */
class BindElt extends BindParent { // TODO class BindFxn { ... }     ..?

    /** @param {HTMLElement} HTMLElement - your html element */
    constructor(HTMLElement){
        super();
        this.elt = HTMLElement;

        this.focus = false;
        this.use   = true;
        /** @private */
        this._checkHidden = false;

    }

    /** 
     * Set to focus the element of this Bind, once the bind is activated.
     * @param {Boolean} boolean
     * @return {this}
     * @example myEltBind.setToFocus(true) // false by default
    */
    setToFocus(boolean){
        this.focus = boolean;
        return this;
    }
    /** 
     * Set to click the element of this Bind, once the bind is activated.
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.setToClick(false) // true by default
    */
    setToClick(boolean){
        this.use = boolean;
        return this;
    }
    /** 
     * Set to check, if the element of this Bind is hidden (css `visibility: hidden;`)
     * @param {Boolean} boolean
     * @return {this}
     * @example myBind.checkIfHidden(true) // false by default!
    */
    checkIfHidden(boolean){
        this.checkHidden = boolean;
        return this;
    }
}

/**
 * BindFuction is a class for binding FunctionPointer to a key bind or combination.
 * @Example
 * ```
 * function myAmazingFunction(){
 *  return 1 + 2;
 * }
 * 
 * let bind1 = new(myAmazingFunction)
 *     .addKeyBind("c")
 *     .addKeyCombination("a", "d", "y")
 *     .forceCombinationOrder(true);
 * ```
 */
class BindFxn extends BindParent {
    /** @param {FunctionPtr} function - your function ***without perentheses***. */
     constructor(_function){
        super();
        this.fxn = _function;
    }
}



// ! TESTING STUFF:

// let bind = new BindElt(document.querySelector("button"))
//     .addKeyBind("a")
//     .addKeyBind("s");

// let bind2 = new BindElt(document.querySelector("button"))
//     .addKeyBind("d")
//     .addKeyCombination("f", "g", "b")
//     .forceCombinationOrder(true)
//     .setName("very nice bind!")
//     .setDescription("changed color when f, g & b are pressed");

// let bind3 = new BindFxn(ItsAFxn)
//     .addKeyBind("k")
//     .addKeyCombination(Keys.Ctrl, "f")
//     .preventDefault(true);

// function ItsAFxn(){
//     console.log("It's a function...")
// }


