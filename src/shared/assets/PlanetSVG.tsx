import styled, { keyframes } from "styled-components";

const strokeAnimation = keyframes`
  from {
    stroke-dashoffset: -1000;
  }
  to {
    stroke-dashoffset: 1000;
  }
`;

const StyledPath = styled.path`
  stroke: #e75626;
  stroke-dashoffset: 3070;
  stroke-dasharray: 3070;
  animation: ${strokeAnimation} 5s linear forwards;
`;

const dotAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Dot = styled.circle<{ sec: number }>`
  opacity: 0;
  animation: ${dotAnimation} 0.5s linear forwards;
  animation-delay: ${(props) => `${props.sec}s`};
`;

const PlanetSVG = () => {
  return (
    <svg
      width="570"
      height="570"
      viewBox="0 0 570 570"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="285" cy="285" r="266" fill="#212124" />
      <g filter="url(#filter0_f_9_17)">
        <circle cx="285" cy="285" r="263" fill="#171719" />
      </g>
      <circle cx="285" cy="285" r="223" fill="#1E1E20" />
      <circle cx="285" cy="285" r="191.5" stroke="#323232" />
      <circle cx="285" cy="285" r="184.5" stroke="#323232" />
      <StyledPath
        d="M288 523C422.205 523 531 414.205 531 280C531 145.795 422.205 37 288 37"
        strokeWidth="0.5"
      />
      <circle cx="288" cy="37" r="3" fill="#E75626" />
      <Dot cx="531" cy="280" r="3" fill="#E75626" sec={1.5} />
      <Dot cx="288" cy="523" r="3" fill="#E75626" sec={2.5} />
      <rect x="125" y="124" width="320" height="322" fill="url(#pattern0)" />
      <defs>
        <filter
          id="filter0_f_9_17"
          x="0"
          y="0"
          width="570"
          height="570"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="11"
            result="effect1_foregroundBlur_9_17"
          />
        </filter>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_9_17"
            transform="matrix(0.000587889 0 0 0.000584238 0 -0.00273679)"
          />
        </pattern>
      </defs>
    </svg>
  );
};

export const Planet = () => {
  return (
    <PlanetWrapper>
      <PlanetSVG />
      <img src={require("./planet.png")} alt="png" />
    </PlanetWrapper>
  );
};

const PlanetWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
  }
`;
