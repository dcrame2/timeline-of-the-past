import {
  variables,
  desktopWidthInt,
  customSmallTabletInt,
  customXSTabletInt,
  mobileWidthInt,
  smallDesktop,
} from "./Variables";
import { css } from "styled-components";

export const MediaQueries = {
  desktop: `(min-width: ${desktopWidthInt}px)`,
  tablet: `(max-width: ${desktopWidthInt - 1}px)`,
  tabletOnly: `(max-width: ${desktopWidthInt - 1}px) and (min-width: ${
    mobileWidthInt + 1
  }px)`,
  customSmallTablet: `(max-width: ${customSmallTabletInt}px)`,
  customXSTablet: `(max-width: ${customXSTabletInt}px)`,
  mobile: `(max-width: ${mobileWidthInt}px)`,
  smallDesktop: `(max-width: ${smallDesktop}px)`,
};

export const BlurEffect = css`
  backdrop-filter: grayscale(0) blur(10px);
  box-shadow: inset 0 0 0 0px rgba(255, 255, 255, 0.08);
`;

export const Container = css`
  margin: 0 auto;
  max-width: ${variables.maxWidth};

  padding-right: 64px;
  padding-left: 64px;

  @media (max-width: ${variables.customSmallTablet}) {
    padding-right: 44px;
    paddig-left: 44px;
  }

  @media (max-width: ${variables.mobileWidth}) {
    padding-right: 24px;
    padding-left: 24px;
  }
`;
