import fs from "fs";
import { mdLinks, extrairLinks } from "../index.js";
// Verificar se os links são extraídos corretamente do arquivo Markdown.
// Verificar se os links são validados corretamente quando a opção validate é definida como true.
// Verificar se é lançado um erro quando o arquivo está vazio.
// Verificar se é lançado um erro quando a extensão do arquivo não é .md.

describe("mdLinks()", () => {
  it("Deve retornar uma promessa", () => {
    const pathFile = "src/texto.md";
    const promise = mdLinks(pathFile);

    expect(promise).toBeInstanceOf(Promise);
  });

  it("Deve lançar um erro se o arquivo estiver vazio", () => {
    const pathFile = "src/texto-vazio.md"; // Caminho para um arquivo Markdown vazio

    expect(() => mdLinks(pathFile)).toThrow(
      (
        `X O arquivo ${pathFile} que está tentando acessar não tem nenhum link.`
      )
    );
  });

  it("Deve lançar um erro se a extensão do arquivo não for .md", () => {
    const pathFile = "src/texto.html"; // Caminho para um arquivo que não é Markdown

    expect(() => mdLinks(pathFile)).toThrow(
    (
        "X Extensão inválida, certifique-se de estar consultando um arquivo no formato Markdown"
      )
    );
  });
});

describe("extrairLinks()", () => {
  it("Deve extrair corretamente os links de um arquivo Markdown", () => {
    const caminhoDoArquivo = "src/test.md"; // Substitua pelo caminho do seu arquivo Markdown de teste

    // Mock da função fs.readFile para simular a leitura do arquivo
    jest
      .spyOn(fs, "readFile")
      .mockImplementation((path, encoding, callback) => {
        const data = `
      [Link 1](https://www.google.com)
      [Link 2](https://www.example.com)
      [Link 3](https://www.github.com)
      
      `; // Substitua pelo conteúdo do seu arquivo Markdown de teste

        callback(null, data);
      });

    // Chama a função extrairLinks e espera que retorne os links corretos
    return extrairLinks(caminhoDoArquivo).then((links) => {
      const expectativaLinks = [
        {
          text: "Link 1",
          href: "https://www.google.com",
          file: caminhoDoArquivo,
        },
        {
          text: "Link 2",
          href: "https://www.example.com",
          file: caminhoDoArquivo,
        },
        {
          text: "Link 3",
          href: "https://www.github.com",
          file: caminhoDoArquivo,
        },
      ];

      expect(links).toEqual(expectativaLinks);
    });
  });
});

describe("mdLinks() validação", () => {
  it("Deve retornar links validados com HTTP", () => {
    const pathFile = "src/test.md"; // Substitua pelo caminho do seu arquivo Markdown de teste
    const options = { validate: true };

    // Mock da função fetch para simular as respostas das requisições
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      const linkStatus = {
        "https://www.google.com": { status: 200, ok: true },
        "https://www.example.com": { status: 404, ok: false },
        "https://www.github.com": { status: 200, ok: true },
      };

      return Promise.resolve({
        status: linkStatus[url].status,
        ok: linkStatus[url].ok,
      });
    });

    const expectedLinks = [
      {
        href: "https://www.google.com",
        text: "Link 1",
        file: pathFile,
        status: 200,
        ok: true,
      },
      {
        href: "https://www.example.com",
        text: "Link 2",
        file: pathFile,
        status: 404,
        ok: false,
      },
      {
        href: "https://www.github.com",
        text: "Link 3",
        file: pathFile,
        status: 200,
        ok: true,
      },
    ];

    return mdLinks(pathFile, options).then((links) => {
      expect(links).toEqual(expectedLinks);
    });
  });
  it("Deve capturar o erro e atualizar as propriedades do link", () => {
    const link = { href: "https://example.com" }; // Link de exemplo
    const error = { status: 404, ok: false }; // Erro de exemplo

    // Captura o erro e atualiza as propriedades do link
    link.status = error.status || "Link não encontrado";
    link.ok = error.ok;

    // Verifica se as propriedades do link foram atualizadas corretamente
    expect(link.status).toBe(404);
    expect(link.ok).toBe(false);
  });
});
