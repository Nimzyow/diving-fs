type ErrorsObject<Inputs> = Partial<Record<keyof Inputs | "nonFieldError", string | JSX.Element>>
