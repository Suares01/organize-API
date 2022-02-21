import { compare, hash } from "bcrypt";

export async function hashData(data: string, salt = 10): Promise<string> {
  const hashedData = await hash(data, salt);

  return hashedData;
}

export async function compareData(
  data: string,
  hashedData: string
): Promise<boolean> {
  const compareData = await compare(data, hashedData);

  return compareData;
}
