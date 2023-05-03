export interface Validator {
  validate(dom: any, element: Element): boolean;
}
export { default as ContrastValidator } from "./contrast";

/*
WCAG Guideline Variables: https://github.com/discoverfinancial/a11y-theme-builder/wiki/WCAG-Guideline-Variables
CONTRAST - 
  Requirments:
  -> text-to-background=4.5:1, 
  -> hotlinks-colors: 4.5:1 against the background and 3.1 against the surrounding text (unless underlined)
  -> everything else: 3.1:1

TYPOGRAPHY
ANIMATION
*/