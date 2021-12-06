import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
html {
    --primary: #034377 ;
    --primary-rgb: 146, 66, 165;
    --primary-hover: #0570C7;
    --primary-dark: #010b14;
    --primary-light: #51a9f6;
    --secondary: #81e6dc;
    --secondary-hover: #57ccbd;
    --secondary-dark: #2c998e;
    --white: #ffffff;
    --light: #f6f6f6;
    --beige: #faf7f4;
    --grey: #ced4da;
    --dark: #9e9e9e;
    --off-black: #212529;
    --black: #000000;
    --red: #ff0000;
    --danger: #721c24;
    --danger-hover: #470c12;
    --input: #555c6b;
}
`

export const RootStyling = styled.div`
    .link-primary,
    .link-secondary {
        background: none !important;
        border: none !important;
        font-weight: 600;
        padding: 0;
        width: fit-content;
    }

    .link-primary {
        color: var(--parimary);
        text-decoration: underline;
        text-decoration-color: var(--primary);

        &:hover {
            color: var(--primary-hover);
            text-decoration-color: var(--primary-hover);
        }
    }

    .link-secondary {
        color: var(--secondary);
        text-decoration: underline;
        text-decoration-color: var(--secondary);

        &:hover {
            color: var(--secondary-hover);
            text-decoration-color: var(--secondary-hover);
        }
    }
`
