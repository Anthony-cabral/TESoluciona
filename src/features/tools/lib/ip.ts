export type IPv4Calculation = {
  input: string;
  ip: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsable: string;
  lastUsable: string;
  totalAddresses: number;
  usableHosts: number;
};

function parseOctet(value: string) {
  if (!/^\d+$/.test(value)) {
    throw new Error("Cada octeto debe ser un número entre 0 y 255.");
  }

  const octet = Number(value);
  if (!Number.isInteger(octet) || octet < 0 || octet > 255) {
    throw new Error("Cada octeto debe estar entre 0 y 255.");
  }

  return octet;
}

export function ipv4ToNumber(ip: string) {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) {
    throw new Error("Escribe una IPv4 válida, por ejemplo 192.168.1.10.");
  }

  return (
    parts.reduce((total, part) => (total << 8) + parseOctet(part), 0) >>> 0
  );
}

export function numberToIPv4(value: number) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join(".");
}

export function calculateIPv4(input: string): IPv4Calculation {
  const [ipPart, cidrPart] = input.trim().split("/");
  const cidr = Number(cidrPart);

  if (!ipPart || !Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    throw new Error("Usa formato IPv4/CIDR, por ejemplo 192.168.1.10/24.");
  }

  const ipNumber = ipv4ToNumber(ipPart);
  const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const wildcard = ~mask >>> 0;
  const network = (ipNumber & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalAddresses = 2 ** (32 - cidr);
  const usableHosts =
    cidr >= 31 ? totalAddresses : Math.max(totalAddresses - 2, 0);
  const firstUsable = cidr >= 31 ? network : network + 1;
  const lastUsable = cidr >= 31 ? broadcast : broadcast - 1;

  return {
    input,
    ip: numberToIPv4(ipNumber),
    cidr,
    subnetMask: numberToIPv4(mask),
    wildcardMask: numberToIPv4(wildcard),
    networkAddress: numberToIPv4(network),
    broadcastAddress: numberToIPv4(broadcast),
    firstUsable: numberToIPv4(firstUsable),
    lastUsable: numberToIPv4(lastUsable),
    totalAddresses,
    usableHosts
  };
}

export function calculateSubnetForHosts(hosts: number) {
  if (!Number.isInteger(hosts) || hosts < 1) {
    throw new Error("Indica una cantidad de hosts mayor que cero.");
  }

  const hostBits = Math.ceil(Math.log2(hosts + 2));
  const cidr = 32 - hostBits;

  if (cidr < 0) {
    throw new Error("La cantidad de hosts excede el espacio IPv4.");
  }

  const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;

  return {
    hostsRequested: hosts,
    cidr,
    subnetMask: numberToIPv4(mask),
    totalAddresses: 2 ** hostBits,
    usableHosts: Math.max(2 ** hostBits - 2, 0)
  };
}
