export const getTrimmedPublicKey = (
  public_key: string,
  trim_length = 4,
  dot_length = 4
) => {
  const TrimmedPublicKey = public_key.substring(0, trim_length)
    .concat('.'.repeat(dot_length))
    .concat(public_key.substring(public_key.length - trim_length));
  return TrimmedPublicKey;
};
