import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState("");
  const [listaMensagem, setListaMensagem] = React.useState([]);
  // ./Sua lógica vai aqui

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaMensagem.length,
      user: "vanessa",
      textoMensagem: novaMensagem,
    };
    setListaMensagem([mensagem, ...listaMensagem]);
    setMensagem("");
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
          <MessageList mensagens={listaMensagem} />
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
        <Text variant="heading5">Chat </Text>{" "}
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
  console.log("MessageList", props);

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
                src={`https://github.com/vanessametonini.png`}
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
                {new Date().toLocaleDateString()}{" "}
              </Text>{" "}
            </Box>{" "}
            {mensagem.textoMensagem}{" "}
          </Text>
        );
      })}
    </Box>
  );
}
