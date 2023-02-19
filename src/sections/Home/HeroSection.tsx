import React from "react";
import styled from "styled-components";
import { Planet } from "../../assets/PlanetSVG";
import { PrimaryText } from "../../shared/ui";

export const HeroSection = () => {
  return (
    <Section>
      <HeroTextContent>
        <MainTextBg>
          <MainText>
            Explore your own planet <br /> in <span>our new</span> metaverse
            <Absolute>
              <Planet />
            </Absolute>
          </MainText>
        </MainTextBg>
        <SecondaryText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </SecondaryText>
      </HeroTextContent>
      <HeroRoadmap>
        <RoadmapTitle>Roadmap stats</RoadmapTitle>
        <RoadmapList>
          <RoadmapItem>
            <PrimaryText>12, 500</PrimaryText>
            <StyledP>Lorem ipsum dolor.</StyledP>
          </RoadmapItem>
          <RoadmapItem>
            <PrimaryText>12, 500</PrimaryText>
            <StyledP>Lorem ipsum dolor.</StyledP>
          </RoadmapItem>
          <RoadmapItem>
            <PrimaryText>12, 500</PrimaryText>
            <StyledP>Lorem ipsum dolor.</StyledP>
          </RoadmapItem>
        </RoadmapList>
      </HeroRoadmap>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8rem 0;
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: relative;
`;

const HeroRoadmap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
  width: 15%;
`;

const RoadmapTitle = styled.p`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
`;

const RoadmapList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoadmapItem = styled.div`
  text-align: center;
  border-bottom: 0.5px solid #d2c4c4;
  padding: 1rem 0;
  &:last-child {
    border-bottom: none;
  }
`;

const MainTextBg = styled.div`
  /* 
  -webkit-text-fill-color: transparent;

  background-clip: text;
  -webkit-background-clip: text;
  background-repeat: no-repeat; */
`;

const MainText = styled.p`
  font-size: 9rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 6px;
  line-height: 144px;
  position: relative;

  & span {
    color: #171719;
    text-shadow: 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white;
  }
`;

const Absolute = styled.div`
  position: absolute;
  top: -50%;
  right: -2%;
  z-index: -1;
`;

const StyledP = styled.p`
  text-transform: uppercase;
  font-size: 1.5rem;
`;

const SecondaryText = styled.p`
  max-width: 25rem;
  margin-top: 2rem;
  font-family: Nunito;
`;
