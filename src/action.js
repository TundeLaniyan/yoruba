export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
export const setProgress = (payload) => ({ type: "SETPROGRESS", payload });
export const set = (value) => ({ type: "SET", value });