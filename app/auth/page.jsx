import Link from "next/link"

const AuthorizationPage = () => {
  const scope =
    "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_EXPERIENCE"
  const clientId = "23456f49ebdd416db1a906c5abfb438e"
  const redirectUri =
    "https://hackathon-infojobs-midudev.vercel.app/request-token"
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
