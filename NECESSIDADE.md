1. react-share

A mais popular para botões de compartilhamento.

Suporte a várias redes sociais: Facebook, WhatsApp, Twitter (X), LinkedIn, Telegram, Pinterest etc.

Vem com ícones já prontos (SVG).

Super fácil de usar.

Instalação:

npm install react-share


Exemplo JSX:

import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

export default function ShareExample() {
  const shareUrl = "https://meusite.com";
  const title = "Olha só esse conteúdo incrível!";

  return (
    <div>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
    </div>
  );
}

🔹 2. react-web-share

Usa a Web Share API nativa do navegador (quando disponível).

Funciona bem em mobile (Android/iOS).

Permite abrir o menu de compartilhamento padrão do sistema.

Instalação:

npm install react-web-share


Exemplo JSX:

import React from "react";
import { RWebShare } from "react-web-share";

export default function ShareNative() {
  return (
    <RWebShare
      data={{
        text: "Olha só esse conteúdo!",
        url: "https://meusite.com",
        title: "Compartilhamento nativo"
      }}
      onClick={() => console.log("Compartilhado!")}
    >
      <button>Compartilhar 🔗</button>
    </RWebShare>
  );
}