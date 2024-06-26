import { MediaQueries } from "../../../styles/Utilities";
import { css } from "styled-components";
import { keyframes } from "styled-components";
import { variables } from "../../../styles/Variables";

const monsterrat = `Montserrat, sans-serif`;
const openSans = "Open Sans, sans-serif";

export const h1styles = css`
  /* font-family: inherit; */

  font-size: 8rem;
  line-height: 9rem;
  color: ${variables.white};

  @media ${MediaQueries.tablet} {
    font-size: 4rem;
    line-height: 4.8rem;
  }

  @media ${MediaQueries.mobile} {
    font-size: 3rem;
    line-height: 3.2rem;
  }
`;

export const h2styles = css`
  /* font-family: ${monsterrat}; */
  font-size: 5.4rem;
  line-height: 5.5rem;
  color: ${variables.black};

  @media ${MediaQueries.tablet} {
    font-size: 3.5rem;
    line-height: 3.7rem;
  }

  @media ${MediaQueries.mobile} {
    font-size: 2.9rem;
    line-height: 3rem;
  }
`;

export const h3styles = css`
  /* font-family: ${monsterrat}; */
  font-size: 5.2rem;
  line-height: 6.3rem;
  font-weight: 300;
  color: ${variables.black};

  @media ${MediaQueries.tablet} {
    font-size: 3.7rem;
    line-height: 3.8rem;
  }

  @media ${MediaQueries.mobile} {
    font-size: 3.2rem;
    line-height: 3.3rem;
  }
`;

export const h4styles = css`
  /* font-family: ${monsterrat}; */
  font-size: 2rem;
  line-height: 3.4rem;
  font-weight: 300;
  color: ${variables.black};

  @media ${MediaQueries.tablet} {
    font-size: 1.8rem;
    line-height: 3rem;
  }

  @media ${MediaQueries.mobile} {
    font-size: 1.6rem;
    line-height: 2.8rem;
  }
`;

export const pLarge = css`
  /* font-family: ${monsterrat}; */
  font-size: 2.4rem;
  line-height: 3.2rem;
  font-weight: 300;
  color: ${variables.white};

  @media ${MediaQueries.tablet} {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export const pBase = css`
  /* font-family: ${monsterrat}; */
  font-size: 1.5rem;
  line-height: 1.7rem;
  font-weight: 300;
  text-align: center;
  /* color: ${variables.black}; */

  @media ${MediaQueries.tablet} {
    font-size: 1.3rem;
    line-height: 1.4rem;
  }
`;

export const pSmall = css`
  /* font-family: ${monsterrat}; */
  font-size: 1.1rem;
  line-height: 1.3rem;
  font-weight: 300;
  color: ${variables.black};
  text-align: center;
`;

export const pXSmall = css`
  /* font-family: ${monsterrat}; */
  text-align: center;
  font-size: 0.9rem;
  line-height: 1rem;
  font-weight: 300;
  color: ${variables.black};
`;

export const buttonType = css`
  /* font-family: ${monsterrat}; */

  /* font-size: 2rem; */
  padding: 0 12px;
  line-height: 2.4rem;
  font-weight: 300;
  border: none;
  border-radius: 8px;
  /* text-transform: uppercase; */
  color: ${variables.white};
  background-color: ${variables.lightLightBlue};
  width: 100%;
  transition: color ease-in 0.3s, background-color ease-in 0.3s;
  border: 2px solid ${variables.lightLightBlue};
  &:hover {
    background-color: ${variables.white};
    color: ${variables.lightLightBlue};
    border-color: 2px solid ${variables.lightLightBlue};
    transition: color ease-in 0.3s, background-color ease-in 0.3s,
      border-color ease-in 0.3s;
  }
`;

export const inputType = css`
  /* font-family: ${monsterrat}; */
  padding: 10px 12px;
  border: 1px solid ${variables.darkBlue};
  border-radius: 8px;
  color: ${variables.black};
  background-color: ${variables.white};
  width: 100%;
  margin-top: 4px;
  ${pXSmall}
  &::placeholder {
    color: ${variables.black};
    opacity: 0.7;
    ${pXSmall}
  }
`;

export const formStyles = css`
  width: 100%;
  padding: 48px 48px 0 48px;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
