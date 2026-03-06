type AxiosErrorShape = {
  response?: {
    data?: {
      error?: string;
      details?: Record<string, string[]>;
    };
  };
};

/** Código de erro retornado pela API (ex.: error.invalidCredentials). */
export function getApiErrorCode(err: unknown): string | null {
  const axiosErr = err as AxiosErrorShape;
  const code = axiosErr?.response?.data?.error;
  return typeof code === "string" ? code : null;
}

export function getApiErrorDetails(err: unknown): Record<string, string[]> | undefined {
  const axiosErr = err as AxiosErrorShape;
  return axiosErr?.response?.data?.details;
}

export function getFirstDetailMessage(err: unknown): string | null {
  const details = getApiErrorDetails(err);
  if (!details) return null;
  const first = Object.values(details).flat()[0];
  return first ?? null;
}

/**
 * Retorna mensagem pronta para exibir em toast.
 * Usa i18n para códigos da API (error.xxx); senão usa o primeiro detail ou fallback.
 */
export function getDisplayErrorForToast(
  err: unknown,
  t: (key: string) => string
): string {
  const code = getApiErrorCode(err);
  const detail = getFirstDetailMessage(err);
  if (code) return t(code);
  if (detail) return detail;
  return t("error.generic");
}
