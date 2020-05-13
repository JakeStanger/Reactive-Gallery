const css = (...styles: any[]) => styles.filter(s => s).join(" ");
export default css;