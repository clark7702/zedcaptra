export function maskAccountNumber(accountNumber: string): string {
    const visibleDigits = 4;
    const maskedSection = accountNumber.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visibleSection = accountNumber.slice(-visibleDigits);
    return maskedSection + visibleSection;
  }