import fs from "fs";
import path from "path";


const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\.s?#].[^\s]*)\)/gm;
const enconding = "utf-8";
export function extrairLinks(caminhoDosLinks) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminhoDosLinks, enconding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const itensExtraidos = [...data.matchAll(regex)];
        const conteudo = itensExtraidos.map((itemExtraido) => ({
          text: itemExtraido[1],
          href: itemExtraido[2],
          file: caminhoDosLinks,
        }));
        resolve(conteudo);
      }
    });
  });
}

export function mdLinks(pathFile, options = { validate: false, stats: false }) {
  const tamanhoArquivo = fs.statSync(pathFile).size;
  const extensao = path.extname(pathFile);
  if (tamanhoArquivo === 0) {
    throw new Error(`O arquivo ${pathFile} está vazio`);
  }
  if (extensao !== ".md") {
    throw new Error("Extensão inválida");
  }
  return new Promise((resolve, reject) => {
    extrairLinks(pathFile)
      .then((links) => {
        if (options.validate) {
          const promises = links.map((link) => {
            return fetch(link.href)
              .then((response) => {
                link.status = response.status;
                link.ok = response.ok;
                return link;
              })
              .catch((error) => {
                link.status = error.status || 'Link não encontrado';
                link.ok = error.ok;
                return link;
              });
          });
          Promise.all(promises)
          .then((results) => {
            resolve(results);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(links);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

}
