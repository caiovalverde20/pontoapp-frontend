import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100vw; 
  background-color: #151f2b;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #151f2b;
  border-radius: 8px; 
  padding: 2rem; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  font-weight: 400;
  color: #cfcfcf;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Highlight = styled.span`
  font-weight: 600;
  color: #ffffff;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #ffffff;
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 3.5rem;
  border-radius: 4px;
  border: none;
  padding: 0 1rem;
  font-size: 1.2rem;
  background-color: #1e2733;
  color: #ffffff;
  outline: none;

  &::placeholder {
    color: #cfcfcf;
  }
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  height: 3.5rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(124.18deg, #fe8a00 22.06%, #fe8a00 81.62%);
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e2733;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
