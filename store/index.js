export const state = () => ({
  isSoundEnabled: null
})

export const mutations = {
  toggleSound(state) {
    state.isSoundEnabled = !state.isSoundEnabled;
    localStorage.setItem('isSoundEnabled', state.isSoundEnabled);
  },
  initializeSound(state) {
    const isSoundEnabled = localStorage.getItem('isSoundEnabled')
    if(isSoundEnabled === "false") {
      state.isSoundEnabled = false;
      localStorage.setItem("isSoundEnabled", "false");
    } else if(isSoundEnabled === "true") {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", "true");
    } else {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", "true");
    }
  }
}