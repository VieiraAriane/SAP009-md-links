import chalk from "chalk";

export function calculo(links) {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((link) => link.href)).size;
  const brokenLinks = links.filter((link) => link.ok === false).length;
  const stats = {
    totalLinks,
    uniqueLinks,
    brokenLinks,
  };
  if (brokenLinks > 0) {
    stats.brokenLinks = brokenLinks;
  }
  return stats;
}

export function printListaValidada(resultado) {
  const lista = resultado
    .map((item) => {
      const linha = `${
        item.ok ? chalk.yellow("\u{1F3C6}") : chalk.red("\u2718")
      } ${chalk.black.magentaBright(item.file)} | ${chalk.blueBright(
        item.href
      )} | ${chalk.bgYellow(item.text)} | ${
        item.ok ? chalk.green("ok") : chalk.red("fail")
      } | ${item.status}`;
      return linha;
    })
    .join("\n\n\n");
  console.log("\n");
  console.log(lista);
}

export function printEstatistica(links) {
  const stats = calculo(links);
  let retorno = "";

  retorno += chalk.bold.rgb(255, 255, 0).underline(` Estatísticas dos Links \u2764`);
  retorno += `\n\n${chalk.bold.hex("#B19CD9")("Total de links:")} ${chalk.bold.yellow(
    stats.totalLinks
  )}`;
  retorno += `\n${chalk.bold.hex("#B19CD9")("Links únicos:")} ${chalk.bold.yellow(
    stats.uniqueLinks
  )}`;

  console.log(retorno);
}

export function printBroken(links) {
  const stats = calculo(links);
  let retorno = "";
  retorno += chalk.bold.rgb(255, 255, 0).underline(`Estatísticas dos Links \u2764`);
  retorno += `\n\n${chalk.bold.hex("#B19CD9")("Total de links:")} ${chalk.bold.yellow(
    stats.totalLinks
  )}`;
  retorno += `\n${chalk.bold.hex("#B19CD9")("Links únicos:")} ${chalk.bold.yellow(
    stats.uniqueLinks
  )}`;
  retorno += `\n${chalk.bold.hex("#B19CD9")("Links quebrados:")} ${chalk.bold.red(
    stats.brokenLinks
  )}`;

  console.log(retorno);
}
export function printLista(resultado) {
  const titulo = chalk.bold.rgb(255, 255, 0).underline(" Lista de Links ");
  const lista = resultado
    .map((item) => {
      const linha = ` ${chalk.black.magentaBright(
        item.file
      )} | ${chalk.blueBright(item.href)} | ${chalk.bgYellowBright.black(item.text)}  `;
      return linha;
    })
    .join("\n\n\n");
  console.log("\n");
  console.log(titulo)
  console.log("\n");
  console.log(lista);
}


