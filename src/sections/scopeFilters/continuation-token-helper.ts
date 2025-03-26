

export const formatContinuationToken = (continuationToken: string) => {
  return continuationToken === null ? continuationToken : continuationToken.replace(/#/g,"-_-"); // Note: '#' is a reserved keyword in url params when passing the token as query string. Therefore replaced the '#' with custom expression.
}
export const setTokenState = (payload: any) => {
  return {
    continuationToken : formatContinuationToken(payload.continuationToken)
  };
}
export const hasMoreRecords = (continuationToken: string) => {
  return continuationToken === null || continuationToken === "" ? false: true
}

