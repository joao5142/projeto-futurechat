import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker.js";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyNjUzOCwiZXhwIjoxOTU4OTAyNTM4fQ.Somu03I_F7LFatsd9nKx5wjYTpf3uGjG5H0OdBFwsTc";
const SUPABASE_URL = "https://fchcyfmpfumtmyytievh.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

function escutaMensagemTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (resposta) => {
      adicionaMensagem(resposta.new);
      console.log(resposta.new);
    })
    .subscribe();
}
export default function ChatPage(props) {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = useState("");
  const [listaMensagem, setListaMensagem] = useState([]);
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;

  // ./Sua lógica vai aqui

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    console.log(roteamento.query);
  }, [roteamento]);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaMensagem(data, ...listaMensagem); //se setar a mesma variavel na dependencia vai entrar em loop
      });

    escutaMensagemTempoReal((msg) => {
      setListaMensagem((valorAtualLista) => {
        return [msg, ...valorAtualLista];
      });
      setMensagem("");
    });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagemObj = {
      user: usuarioLogado,
      texto: novaMensagem,
    };
    //tem que ser um objeto com os mesmos campos
    supabaseClient
      .from("mensagens")
      .insert([mensagemObj])
      .order("id", {
        ascending: false,
      })
      .then(({ data }) => {
        setMensagem("");
      });
    console.log("handle mensagem");
  }
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://cdna.artstation.com/p/assets/images/images/024/538/828/original/pixel-jeff-clipc-s.gif?1582740521)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaMensagem} />{" "}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />{" "}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker:${sticker}`);
              }}
            />
          </Box>{" "}
        </Box>{" "}
      </Box>{" "}
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5"> Chat </Text>{" "}
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>{" "}
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",

              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.user}.png`}
              />{" "}
              <Text
                styleSheet={{
                  display: "inline-block",
                }}
                tag="strong"
              >
                {" "}
                {mensagem.user}{" "}
              </Text>{" "}
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  display: "inline-block",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {mensagem.created_at}{" "}
              </Text>{" "}
            </Box>{" "}
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image src={mensagem.texto.replace(":sticker:", "")} />
            ) : (
              mensagem.texto
            )}{" "}
          </Text>
        );
      })}{" "}
    </Box>
  );
}
