const uniq = (array) => array.filter((v, i, self) => self.indexOf(v) === i);
const uniq2 = (array) => [...new Set(array)];
