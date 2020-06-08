import { CommonState } from '../common/common.model';

export const LayoutSelector = {
  showNavbarSearch(state: CommonState): boolean {
    return state.layout.showNavbarSearch;
  }
};
