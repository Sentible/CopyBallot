import { Colors } from './colors'

export const Shadows = {
  light: `rgb(0 0 0 / 17%) 0px 10px 20px 0px;`,
  lowest: ``,
  low: ``,
  mid: `${Colors.black} 0px 6px 12px -2px, ${Colors.darkGrey} 0px 3px 7px -3px`,
  high: `rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;`,
  bold: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
  boldest:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;'
}
