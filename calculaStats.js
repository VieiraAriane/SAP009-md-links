export function calculaStats(links) {
  const stats = {
    total: links.length,
    unique: new Set(links.map((link) => link.href)).size,
    broken: links.filter((link) => link.ok === "fail").length,
  };

  return stats;
}
