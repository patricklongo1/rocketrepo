import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    width: 150px;
    height: 150px;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: #7159c1;
    font-weight: bold;
    padding: 8px;
    border: 2px solid #7159c1;
    border-radius: 14px;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Issues = styled.div`
  margin-top: 10px;
  border: 0;
  border-radius: 4px;

  p {
    color: #7159c1;
    font-size: 24px;
    font-weight: bold;
    margin-left: 145px;
  }
`;

export const IssuesControl = styled.div`
  max-width: 700px;
  border-top: 1px solid #666;
  padding: 20px 0 0 15px;
  margin: 30px 45px auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    font-size: 24px;
    color: #7159c1;
  }
`;

export const Filter = styled.select.attrs(props => ({
  disabled: props.loadingF,
}))`
  margin-left: 15px;
  width: 200px;
  background: #7159c1;
  border: 0;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const IssueList = styled.ul`
  padding-top: 10px;
  margin-top: 0px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      padding-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
        span {
          background: #90ee90;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-left: 5px;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PagesContainer = styled.div`
  max-width: 700px;
  margin-top: 15px;
  padding: 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageNumber = styled.span.attrs(props => ({
  disabled: props.loadingS,
}))`
  font-weight: bold;
  color: #7159c1;

  &[disabled] {
    color: #ccc;
  }
`;

export const PButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.firstPage,
}))`
  border: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7159c1;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #fff;
    width: 25px;
    height: 25px;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loadingP &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const NButton = styled.button`
  border: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7159c1;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #fff;
    width: 25px;
    height: 25px;
  }

  ${props =>
    props.loadingN &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
