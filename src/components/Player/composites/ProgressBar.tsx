import styled from 'styled-components';

const ProgressbarStyles = styled.div`
  width: 100%;
  border-radius: 4px;
  height: 4px;
  min-height: 4px;
  cursor: pointer;
  background: #827f7f;

  .active {
    width: 10%;
    height: 100%;
    background-color: white;
    border-radius: 4px;
  }
`;

const ProgressBar = () => {
  return (
    <ProgressbarStyles className="progress-bar">
      <div className="active"></div>
    </ProgressbarStyles>
  );
};

export default ProgressBar;
