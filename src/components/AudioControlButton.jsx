import styled from "@emotion/styled/macro";
import { useAudio } from "../hooks/useAudio";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioControlButton = ({ musicPath }) => {
  const [togglePlayback, isPlaying] = useAudio(musicPath);

  return (
    <Button
      onClick={togglePlayback}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <StyledIcon aria-hidden="true">
          <FaPause />
        </StyledIcon>
      ) : (
        <StyledIcon aria-hidden="true">
          <FaPlay />
        </StyledIcon>
      )}
    </Button>
  );
};

const Button = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;
  padding: 0;
`;

const StyledIcon = styled.div`
  color: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AudioControlButton;
