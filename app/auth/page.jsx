/*"use client";

import axios from "axios";

export default function InfojobsSignInButton() {
  const clientID = "23456f49ebdd416db1a906c5abfb438e";
  const infoJobsSecret = "G0JUtI6Hr5DFTtC1c8BbibxkaU19sc6k";
  const infojobsToken = process.env.INFOJOBS_TOKEN;

  //const encodedClientSecret = encodeURIComponent(clientSecret);
  console.log(clientID);
  console.log(infojobsToken);

  // Función para obtener el Verification Code
  const getVerificationCode = async () => {
    const url = "https://www.infojobs.net/api/oauth/user-authorize/index.xhtml";
    const params = {
      scope:
        "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV",
      client_id: clientID,
      redirect_uri: "http://www.infojobs.net/core/oauth2vc/index.xhtml",
      response_type: "code",
    };

    try {
      const response = await axios.get(url, { params });
      const verificationCode = response.data.code;
      console.log(response);
      return verificationCode;
    } catch (error) {
      console.error("Error obteniendo el Verification Code:", error);
      throw error;
    }
  };

  // Función para obtener el Access Token
  const getAccessToken = async (verificationCode) => {
    const url =
      "https://www.infojobs.net/oauth/authorize?grant_type=authorization_code";
    const data = new URLSearchParams({
      client_id: clientID,
      client_secret: encodeURIComponent(infoJobsSecret),
      code: verificationCode,
      redirect_uri: "http://localhost:3000",
    });

    try {
      const response = await axios.post(url, data);
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error("Error obteniendo el Access Token:", error);
      throw error;
    }
  };

  // Función para iniciar sesión con Infojobs
  const signInWithInfojobs = async () => {
    try {
      // Obtener Verification Code
      const verificationCode = await getVerificationCode();

      // Obtener Access Token
      const accessToken = await getAccessToken(verificationCode);

      // Realizar acciones adicionales según necesidad (por ejemplo, guardar el Access Token en el estado de la sesión)

      // Redirigir al usuario a la página principal o a la siguiente página después de la autenticación exitosa
      window.location.href = "/"; // Cambia "/home" por la ruta que desees
    } catch (error) {
      console.error("Error al iniciar sesión con Infojobs:", error);
      // Manejo de errores, muestra un mensaje al usuario o realiza otra acción según sea necesario
    }
  };

  // Evento para el clic en el botón de inicio de sesión con Infojobs
  const handleSignInWithInfojobs = () => {
    signInWithInfojobs();
  };

  return (
    <div style={{ paddingTop: "5em" }}>
      <h1>INICIO DE SESION</h1>
      <button type="button" onClick={handleSignInWithInfojobs}>
        Iniciar sesión con Infojobs
      </button>
    </div>
  );
}
*/
import Link from "next/link"

const AuthorizationPage = () => {
  const scope =
    "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_EXPERIENCE"
  const clientId = "23456f49ebdd416db1a906c5abfb438e"
  const redirectUri =
    "https://hackathon-infojobs-midudev.vercel.app/request-token"
  //const redirectUri = "http://www.infojobs.net/core/oauth2vc/index.xhtml";

  /*
    process.env.NODE_ENV === "development"
      ? "http://hackatoninfojobs.com/api/infojobs-callback" // URL local de devolución de llamada en entorno de desarrollo
      : "https://tu-domino.com/api/infojobs-callback"; // URL real de devolución de llamada en entorno de producción
  //const state = "OPTIONAL_CLIENT_LOCAL_STATE";
*/
  const authorizationUrl = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  return (
    <div style={{ paddingTop: "5em" }}>
      <h1>Tu aplicación</h1>
      <p>
        Para acceder a ciertas funcionalidades, necesitas autorizar tu
        aplicación en InfoJobs.
      </p>
      <Link href={authorizationUrl}>
        <span>Autorizar</span>
      </Link>
    </div>
  )
}

export default AuthorizationPage
