// import fetch from "node-fetch";
// import chalk from "chalk";

// // function validarLinks(links) {
// //   return Promise.all(links.map((link) => {
// //     return new Promise((resolve) => {
// //       fetch(link.href)
// //         .then((resultado) => {
// //           link.status = resultado.status;
// //           link.ok = resultado.ok ? "ok" : "fail";
// //           resolve(link);
// //         })
// //         .catch((error) => {
// //           console.log(error);
// //           link.status = "error";
// //           link.ok = "fail";
// //           resolve(link);
// //         });
// //     });
// //   }));
// // }

// function imprimirLinks(links) {
//   links.map((link) => {
//     console.log(`- Text: ${link.text}`);
//     console.log(`  Href: ${link.href}`);
//     console.log(`  File: ${link.file}`);
//     console.log("------------------------");
//   });
// }

// // function calculaStats(links) {
// //   const stats = {
// //     total: links.length,
// //     unique: new Set(links.map((link) => link.href)).size,
// //     broken: links.filter((link) => link.ok === "fail").length,
// //   };

// //   return stats;
// // }
// function calculaStats(links) {
//   if (!Array.isArray(links)) {
//     throw new TypeError('O parâmetro "links" deve ser um array');
//   }

//   const stats = {
//     total: links.length,
//     unique: new Set(links.map((link) => link.href)).size,
//     broken: links.filter((link) => link.ok === "fail").length,
//   };

//   return stats;
// }
//   function imprimirStats(links) {
//     const stats = calculaStats(links);
//     let retorno = "";
//     retorno += chalk.hex("#F77666")("\nEstatísticas dos Links");
//     retorno += `\n\n${chalk.hex("#FA086F")("Total de links:")} ${chalk.yellow(
//       stats.total
//     )}`;
//     retorno += `\n${chalk.hex("#FA086F")("Links únicos:")} ${chalk.yellow(
//       stats.unique
//     )}`;
//     if (stats.broken) {
//       retorno += `\n${chalk.hex("#FA956F")("Links quebrados:")} ${chalk.red(
//         stats.broken
//       )}`;
//     }
//     console.log(retorno);
//   }
  



// export { calculaStats, imprimirLinks, imprimirStats };
// import fs from 'fs';
// import path from 'path';
// import fetch from 'node-fetch';
// const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\.s?#].[^\s]*)\)/gm;
// const encoding = 'utf-8';

// function extrairLinks(caminhoDosLinks) {
//   return new Promise ((resolve, reject) => {
//     fs.readFile(caminhoDosLinks, encoding, (err, data) => {
//       if(err) {
//         reject(err);
//       }else {
//         const itensExtraidos = [...data.matchAll(regex)];
//         const conteudo = itensExtraidos.map((itemExtraido) => ({
//           text: itemExtraido[1],
//           href: itemExtraido[2],
//           file: caminhoDosLinks,
//         }));
//         resolve(conteudo);
//       }
//     });
//   });
// }
// extrairLinks('src/texto.md')
//   .then((conteudo) => console.log(conteudo))
//   .catch((err) => console.error(err));

//  export function mdLinks (pathFile, options = {validate: false, stats: false}) {
//     const tamanhoArquivo = fs.statSync(pathFile).size;
//      const extensao = path.extname(pathFile);
//     if(tamanhoArquivo === 0){
//     throw new Error(`O arquivo ${pathFile} está vazio`);
//     }
//     if(extensao !== '.md'){
//       throw new Error('Extensão inválida');
//     }
//    return new Promise((resolve, reject) => {
//   extrairLinks(pathFile).then((links) => {
//     if (options.validate) {
//       const promises = links.map((link) => {
//         return fetch(link.href)
//           .then((response) => {
//             link.status = response.status;
//             link.ok = response.ok ? "ok" : "fail";
//             return link;
//           })
//           .catch((error) => {
//             console.log(error)
//             link.status = "error";
//             link.ok = "fail";
//             return link;
//           });
//       });
//       Promise.all(promises)
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } else {
//       resolve(links);
//     }
//   })
//   .catch((err) => {
//     reject(err);
//   });
// });

//   }
//   // mdLinks('src/texto.md', {validate: true})
//   // .then((links) => {
//   //   console.log(links);
//   // }).catch((err) => {
//   //   console.error(err);
//   // });