// url da API para gerar avatares: https://xsgames.co/randomusers/

// Gera um índice numérico baseado em uma string (ex: nome e sobrenome)
export const AvatarStringIdToIndex = (str: string, max: number) => {
  if (max <= 0) throw new Error("Max must be greater than 0");

  const hash = Array.from(str).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  return hash % max;
};

// Monta a URL do avatar baseado em nome, sobrenome e sexo
export const getDoctorAvatarUrl = ({
  name,
  lastName,
  sex,
}: {
  name: string;
  lastName: string;
  sex: "male" | "female";
}) => {
  const fullNameKey = `${name.toLowerCase()}-${lastName.toLowerCase()}`;
  const index = AvatarStringIdToIndex(fullNameKey, 78);
  return `https://xsgames.co/randomusers/assets/avatars/${sex}/${index}.jpg`;
};
