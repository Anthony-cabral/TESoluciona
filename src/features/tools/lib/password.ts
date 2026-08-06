export type PasswordStrength = {
  score: number;
  label: "Débil" | "Media" | "Fuerte" | "Muy fuerte";
  feedback: string[];
};

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{};:,.?/|~";

function pickRandom(charset: string) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return charset[values[0] % charset.length];
}

export function generatePassword(options: {
  length: number;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}) {
  if (
    !Number.isInteger(options.length) ||
    options.length < 8 ||
    options.length > 128
  ) {
    throw new Error("La longitud debe estar entre 8 y 128 caracteres.");
  }

  const selectedSets = [
    lowercase,
    options.includeUppercase ? uppercase : "",
    options.includeNumbers ? numbers : "",
    options.includeSymbols ? symbols : ""
  ].filter(Boolean);

  const charset = selectedSets.join("");
  const required = selectedSets.map((set) => pickRandom(set));
  const remaining = Array.from(
    { length: options.length - required.length },
    () => pickRandom(charset)
  );

  return [...required, ...remaining]
    .sort(() => {
      const values = new Uint32Array(1);
      crypto.getRandomValues(values);
      return values[0] / 0xffffffff - 0.5;
    })
    .join("");
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 12) score += 2;
  else feedback.push("Usa al menos 12 caracteres.");

  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Agrega letras minúsculas.");
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Agrega letras mayúsculas.");
  if (/\d/.test(password)) score += 1;
  else feedback.push("Agrega números.");
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Agrega símbolos si el servicio los permite.");
  if (!/(.)\1{2,}/.test(password)) score += 1;
  else feedback.push("Evita repetir el mismo carácter muchas veces.");
  if (!/(password|contraseña|qwerty|123456|admin)/i.test(password)) score += 1;
  else feedback.push("Evita palabras o patrones comunes.");

  if (score >= 8) return { score, label: "Muy fuerte", feedback };
  if (score >= 6) return { score, label: "Fuerte", feedback };
  if (score >= 4) return { score, label: "Media", feedback };

  return { score, label: "Débil", feedback };
}
