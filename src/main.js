import Vue from 'vue'
import Paginetta from './components/Pagination';

const Components = {
  Paginetta,
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
