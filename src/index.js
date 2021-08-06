/**
 * Represents a list of DOM elements
 * with extra utility methods
 */
class RazorNodeList {
  constructor(nodeList) {
    this.nodeList = nodeList;
  }

  get length() {
    return this.nodeList.length;
  }

  /**
   * A private method to iterate over each node in the list
   * and execute a callback
   * @param {Function} callback Callback to be called on each node
   */
  #forEachNode(callback) {
    this.nodeList.forEach(callback);
  }

  /**
   *
   * @param {Object} style A style object with property names and its corresponding value
   * @returns The list of DOM elements with updated style
   */
  setStyle(style) {
    for (const [key, value] of Object.entries(style)) {
      this.#forEachNode((node) => {
        node.style[key] = value;
      });
    }
    return this;
  }

  /**
   * Function to add css class to the elements
   * @param {String} className Class name to be added to the elements
   */
  addClass(className) {
    this.#forEachNode((node) => {
      node.classList.add(className);
    });
  }

  /**
   * Function to remove css class from the elements
   * @param {String} className Class name to be removed from the elements
   */
  removeClass(className) {
    this.#forEachNode((node) => {
      node.classList.remove(className);
    });
  }
}

/**
 *
 * A utility function similar to Jquery
 * @param {String} selector The query to select the dom elements (Must be a valid CSS Selector)
 * @returns All elements matching the selector
 */
function $razor(selector) {
  const nodeList = document.querySelectorAll(selector);
  return new RazorNodeList(nodeList);
}

/**
 * Function to save a value in the local storage or session storage
 * @param {String} key Key which represents the value
 * @param {String} value Value to be stored
 * @param {Boolean} useSessionStorage Boolean representing wether to use session storage or not
 */
$razor.setState = function (key, value, useSessionStorage = false) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    throw new Error('Both key and value should be of type string');
  }

  if (useSessionStorage) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

/**
 * Function to retrieve a value from the local storage or session storage
 * @param {String} key Key which represents the value
 * @param {Boolean} useSessionStorage Boolean representing wether to use session storage or not
 */
$razor.getState = function (key, useSessionStorage = false) {
  if (typeof key !== 'string') {
    throw new Error('Key should be of type string');
  }

  if (useSessionStorage) {
    return sessionStorage.getItem(key);
  } else {
    return localStorage.getItem(key);
  }
};
