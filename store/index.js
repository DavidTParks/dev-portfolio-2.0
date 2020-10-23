export const state = () => ({
  isSoundEnabled: null,
  storedUserVoltage: 1
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
  },
  initializeVoltage(state, slug) {
    const storedVolts = localStorage.getItem(slug);

    if(storedVolts) {
      state.storedUserVoltage = Number(storedVolts);
    } else {
      localStorage.setItem(slug, 1);
      state.storedUserVoltage = 1;
    }
  },
  incrementVoltage(state, slug) {
    state.storedUserVoltage = state.storedUserVoltage + 1;
    localStorage.setItem(slug, state.storedUserVoltage);
  }
}