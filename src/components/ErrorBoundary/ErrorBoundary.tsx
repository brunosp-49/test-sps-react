import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Container, ErrorHeading, ErrorText, BackButton } from "./ErrorBoundary.styled";
import { containerStyles, headingStyles, textStyles } from "./ErrorBoundary.styled";

function ErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.statusText || (error.data as { message?: string })?.message || "Erro inesperado"
    : error instanceof Error
      ? error.message
      : "Erro inesperado";

  return (
    <Container {...containerStyles}>
      <ErrorHeading {...headingStyles}>Algo deu errado</ErrorHeading>
      <ErrorText {...textStyles}>{message}</ErrorText>
      <BackButton asChild colorPalette="blue">
        <Link to="/">Voltar ao início</Link>
      </BackButton>
    </Container>
  );
}

export default ErrorBoundary;
