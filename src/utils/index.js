import { h, unref } from 'vue';
import { isObject } from './is';

/**
 * font 图标(Font class)
 * */
export function renderFontClassIcon(icon, iconName = 'iconfont') {
  return () => h('span', { class: [iconName, icon] });
}
/**
 * font 图标(Unicode)
 * */
export function renderUnicodeIcon(icon, iconName = 'iconfont') {
  return () => h('span', { class: [iconName], innerHTML: icon });
}

export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
};

/**
 *  找到对应的节点
 * */
let result = null;
export function getTreeItem(data, key) {
  data.map((item) => {
    if (item.key === key) {
      result = item;
    } else {
      if (item.children && item.children.length) {
        getTreeItem(item.children, key);
      }
    }
  });
  return result;
}

/**
 *  找到所有节点
 * */
const treeAll = [];
export function getTreeAll(data) {
  data.map((item) => {
    treeAll.push(item.key);
    if (item.children && item.children.length) {
      getTreeAll(item.children);
    }
  });
  return treeAll;
}

// dynamic use hook props
export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key]);
  });

  return ret;
}

export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color, amount) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color, amount) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}

/**
 * 判断是否 url
 * */
export function isUrl(url) {
  return /^(http|https):\/\//g.test(url);
}

/**
 * @description: 数组转树状结构
 * @param { Array } array 数据
 * @param { Null | String | Number } parentId 根节点id，默认 0
 * @returns 树状结构数据
 */
export function arrayToTree(array, parentId = 0) {
  const result = [];
  for (const item of array) {
    if (item.pid === parentId) {
      const children = arrayToTree(array, item.id);
      if (children.length) {
        item.children = children;
      }
      result.push(item);
    }
  }
  return result;
}

export function arrayAddMap(array, objMap) {
  for (const child of array) {
    objMap[child.id] = child;
    if (child.children && child.children.length > 0) {
      arrayAddMap(child.children, objMap);
    }
  }
}
